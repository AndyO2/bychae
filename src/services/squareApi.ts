import { squareConfig } from '../config/squareConfig';
import { CartItem } from '../context/CartContext';

// Mock Square client for development
// Replace with actual Square SDK once credentials are configured
const mockClient = {
  orders: {
    createOrder: async (params: any) => {
      console.log('Mock Square API - Creating order:', params);
      return {
        result: {
          order: {
            id: `mock-order-${Date.now()}`,
            orderNumber: `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            state: 'OPEN'
          }
        }
      };
    },
    retrieveOrder: async (orderId: string) => {
      console.log('Mock Square API - Retrieving order:', orderId);
      return { result: { order: { id: orderId, state: 'OPEN' } } };
    },
    updateOrder: async (orderId: string, params: any) => {
      console.log('Mock Square API - Updating order:', orderId, params);
      return { result: { order: { id: orderId, ...params.order } } };
    }
  },
  payments: {
    createPayment: async (params: any) => {
      console.log('Mock Square API - Creating payment:', params);
      return {
        result: {
          payment: {
            id: `mock-payment-${Date.now()}`,
            status: 'COMPLETED',
            receiptUrl: 'https://example.com/receipt'
          }
        }
      };
    }
  }
};

export interface OrderRequest {
  items: CartItem[];
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  pickupTime?: string;
  specialInstructions?: string;
  tipAmount?: number;
}

export interface OrderResponse {
  orderId: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  pickupTime?: string;
  estimatedPickupTime?: string;
}

export interface PaymentRequest {
  orderId: string;
  paymentMethod: 'CARD' | 'CASH' | 'DIGITAL_WALLET';
  cardToken?: string;
  tipAmount?: number;
  amount: number;
}

export interface PaymentResponse {
  paymentId: string;
  status: string;
  amount: number;
  receiptUrl?: string;
}

export class SquareApiService {
  private static instance: SquareApiService;
  private client: any;

  private constructor() {
    this.client = mockClient;
  }

  public static getInstance(): SquareApiService {
    if (!SquareApiService.instance) {
      SquareApiService.instance = new SquareApiService();
    }
    return SquareApiService.instance;
  }

  /**
   * Create a new order in Square
   */
  async createOrder(orderRequest: OrderRequest): Promise<OrderResponse> {
    try {
      // Convert cart items to Square line items
      const lineItems = orderRequest.items.map(item => ({
        name: item.name,
        quantity: item.quantity.toString(),
        basePriceMoney: {
          amount: Math.round(item.price * 100), // Convert to cents
          currency: squareConfig.order.currency,
        },
      }));

      // Calculate totals
      const subtotal = orderRequest.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const taxAmount = subtotal * (squareConfig.order.taxRate || 0);
      const serviceChargeAmount = subtotal * (squareConfig.order.serviceChargeRate || 0);
      const tipAmount = orderRequest.tipAmount || 0;
      const totalAmount = subtotal + taxAmount + serviceChargeAmount + tipAmount;

      // Create the order
      const response = await this.client.orders.createOrder({
        order: {
          locationId: squareConfig.square.locationId,
          lineItems,
          fulfillments: [{
            type: 'PICKUP',
            pickupDetails: {
              recipient: {
                displayName: orderRequest.customerInfo.name,
                emailAddress: orderRequest.customerInfo.email,
                phoneNumber: orderRequest.customerInfo.phone,
              },
              pickupAt: orderRequest.pickupTime,
              note: orderRequest.specialInstructions,
            },
          }],
          taxes: [{
            uid: 'tax-1',
            name: 'Sales Tax',
            percentage: `${(squareConfig.order.taxRate || 0) * 100}%`,
            appliedMoney: {
              amount: Math.round(taxAmount * 100),
              currency: squareConfig.order.currency,
            },
          }],
          serviceCharges: [{
            uid: 'service-charge-1',
            name: 'Service Charge',
            percentage: `${(squareConfig.order.serviceChargeRate || 0) * 100}%`,
            appliedMoney: {
              amount: Math.round(serviceChargeAmount * 100),
              currency: squareConfig.order.currency,
            },
          }],
          tipMoney: tipAmount > 0 ? {
            amount: Math.round(tipAmount * 100),
            currency: squareConfig.order.currency,
          } : undefined,
          totalMoney: {
            amount: Math.round(totalAmount * 100),
            currency: squareConfig.order.currency,
          },
        },
      });

      const order = response.result.order;
      if (!order) {
        throw new Error('Failed to create order');
      }

      return {
        orderId: order.id!,
        orderNumber: order.orderNumber || '',
        status: order.state || 'OPEN',
        totalAmount: totalAmount,
        pickupTime: orderRequest.pickupTime,
        estimatedPickupTime: this.calculateEstimatedPickupTime(),
      };
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  /**
   * Process payment for an order
   */
  async processPayment(paymentRequest: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await this.client.paymentsApi.createPayment({
        sourceId: paymentRequest.cardToken!,
        idempotencyKey: `${paymentRequest.orderId}-${Date.now()}`,
        amountMoney: {
          amount: Math.round(paymentRequest.amount * 100),
          currency: squareConfig.order.currency,
        },
        orderId: paymentRequest.orderId,
        tipMoney: paymentRequest.tipAmount ? {
          amount: Math.round(paymentRequest.tipAmount * 100),
          currency: squareConfig.order.currency,
        } : undefined,
      });

      const payment = response.result.payment;
      if (!payment) {
        throw new Error('Failed to process payment');
      }

      return {
        paymentId: payment.id!,
        status: payment.status || 'PENDING',
        amount: paymentRequest.amount,
        receiptUrl: payment.receiptUrl,
      };
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new Error('Failed to process payment');
    }
  }

  /**
   * Get order details
   */
  async getOrder(orderId: string): Promise<any> {
    try {
      const response = await this.client.ordersApi.retrieveOrder(orderId);
      return response.result.order;
    } catch (error) {
      console.error('Error retrieving order:', error);
      throw new Error('Failed to retrieve order');
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    try {
      await this.client.ordersApi.updateOrder(orderId, {
        order: {
          state: status,
        },
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  }

  /**
   * Calculate estimated pickup time (15-20 minutes from now)
   */
  private calculateEstimatedPickupTime(): string {
    const now = new Date();
    const estimatedTime = new Date(now.getTime() + (20 * 60 * 1000)); // 20 minutes
    return estimatedTime.toISOString();
  }

  /**
   * Validate Square configuration
   */
  validateConfig(): boolean {
    return !!(squareConfig.square.applicationId && 
              squareConfig.square.locationId && 
              squareConfig.square.accessToken);
  }
}

// Export singleton instance
export const squareApi = SquareApiService.getInstance(); 