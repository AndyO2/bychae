import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { squareApi, OrderRequest, OrderResponse, PaymentRequest, PaymentResponse } from '../services/squareApi';
import { CartItem } from './CartContext';

export interface OrderState {
  currentOrder: OrderResponse | null;
  orderHistory: OrderResponse[];
  isLoading: boolean;
  error: string | null;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
}

type OrderAction =
  | { type: 'CREATE_ORDER_START' }
  | { type: 'CREATE_ORDER_SUCCESS'; payload: OrderResponse }
  | { type: 'CREATE_ORDER_FAILURE'; payload: string }
  | { type: 'PROCESS_PAYMENT_START' }
  | { type: 'PROCESS_PAYMENT_SUCCESS'; payload: PaymentResponse }
  | { type: 'PROCESS_PAYMENT_FAILURE'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOAD_ORDER_HISTORY'; payload: OrderResponse[] };

const initialState: OrderState = {
  currentOrder: null,
  orderHistory: [],
  isLoading: false,
  error: null,
};

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'CREATE_ORDER_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'CREATE_ORDER_SUCCESS':
      return {
        ...state,
        currentOrder: action.payload,
        orderHistory: [...state.orderHistory, action.payload],
        isLoading: false,
        error: null,
      };
    case 'CREATE_ORDER_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'PROCESS_PAYMENT_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'PROCESS_PAYMENT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case 'PROCESS_PAYMENT_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'LOAD_ORDER_HISTORY':
      return {
        ...state,
        orderHistory: action.payload,
      };
    default:
      return state;
  }
};

interface OrderContextType {
  state: OrderState;
  createOrder: (items: CartItem[], customerInfo: CustomerInfo, pickupTime?: string, specialInstructions?: string, tipAmount?: number) => Promise<OrderResponse>;
  processPayment: (orderId: string, paymentMethod: 'CARD' | 'CASH' | 'DIGITAL_WALLET', cardToken?: string, tipAmount?: number) => Promise<PaymentResponse>;
  clearError: () => void;
  getOrderHistory: () => OrderResponse[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const createOrder = async (
    items: CartItem[],
    customerInfo: CustomerInfo,
    pickupTime?: string,
    specialInstructions?: string,
    tipAmount?: number
  ): Promise<OrderResponse> => {
    dispatch({ type: 'CREATE_ORDER_START' });

    try {
      // Validate Square configuration
      if (!squareApi.validateConfig()) {
        throw new Error('Square configuration is incomplete. Please check your environment variables.');
      }

      const orderRequest: OrderRequest = {
        items,
        customerInfo,
        pickupTime,
        specialInstructions,
        tipAmount,
      };

      const orderResponse = await squareApi.createOrder(orderRequest);
      dispatch({ type: 'CREATE_ORDER_SUCCESS', payload: orderResponse });
      return orderResponse;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
      dispatch({ type: 'CREATE_ORDER_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const processPayment = async (
    orderId: string,
    paymentMethod: 'CARD' | 'CASH' | 'DIGITAL_WALLET',
    cardToken?: string,
    tipAmount?: number
  ): Promise<PaymentResponse> => {
    dispatch({ type: 'PROCESS_PAYMENT_START' });

    try {
      // Get the current order to get the total amount
      const currentOrder = state.currentOrder;
      if (!currentOrder) {
        throw new Error('No current order found');
      }

      const paymentRequest: PaymentRequest = {
        orderId,
        paymentMethod,
        cardToken,
        tipAmount,
        amount: currentOrder.totalAmount,
      };

      const paymentResponse = await squareApi.processPayment(paymentRequest);
      dispatch({ type: 'PROCESS_PAYMENT_SUCCESS', payload: paymentResponse });
      return paymentResponse;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process payment';
      dispatch({ type: 'PROCESS_PAYMENT_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const getOrderHistory = (): OrderResponse[] => {
    return state.orderHistory;
  };

  const value: OrderContextType = {
    state,
    createOrder,
    processPayment,
    clearError,
    getOrderHistory,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}; 