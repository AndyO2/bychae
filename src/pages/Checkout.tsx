import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { useOrder, CustomerInfo } from '../context/OrderContext';
import { squareConfig } from '../config/squareConfig';
import './Checkout.css';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state, getTotalPrice, clearCart } = useCart();
  const { createOrder, state: orderState, clearError } = useOrder();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupTime: '',
    specialInstructions: '',
    tipAmount: 0
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTipChange = (tipPercentage: number) => {
    const subtotal = getTotalPrice();
    const tipAmount = subtotal * tipPercentage;
    setFormData(prev => ({
      ...prev,
      tipAmount
    }));
  };

  const calculatePickupTime = (minutes: string): string => {
    const now = new Date();
    const pickupTime = new Date(now.getTime() + parseInt(minutes) * 60 * 1000);
    return pickupTime.toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      const customerInfo: CustomerInfo = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      const pickupTime = formData.pickupTime ? calculatePickupTime(formData.pickupTime) : undefined;

      // Create order in Square
      const orderResponse = await createOrder(
        state.items,
        customerInfo,
        pickupTime,
        formData.specialInstructions,
        formData.tipAmount
      );

      // Clear cart and redirect to order confirmation
      clearCart();
      navigate('/order-confirmation', { 
        state: { orderId: orderResponse.orderId, orderNumber: orderResponse.orderNumber }
      });
    } catch (error) {
      console.error('Error creating order:', error);
      // Error is handled by the OrderContext
    }
  };

  const subtotal = getTotalPrice();
  const taxAmount = subtotal * (squareConfig.order.taxRate || 0);
  const serviceChargeAmount = subtotal * (squareConfig.order.serviceChargeRate || 0);
  const totalAmount = subtotal + taxAmount + serviceChargeAmount + formData.tipAmount;

  if (state.items.length === 0) {
    return (
      <div className="checkout">
        <div className="container">
          <div className="empty-cart-message">
            <h2>Your cart is empty</h2>
            <p>Add some items to your cart before checking out.</p>
            <button onClick={() => navigate('/menu')} className="back-to-menu-btn">
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-header">
        <div className="container">
          <h1>Checkout</h1>
          <p>Complete your order for pickup</p>
        </div>
      </div>

      <div className="container">
        {orderState.error && (
          <div className="error-message">
            <p>{orderState.error}</p>
            <button onClick={clearError} className="error-close">×</button>
          </div>
        )}

        <div className="checkout-content">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {state.items.map(item => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <span className="item-emoji">{item.emoji}</span>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="order-breakdown">
              <div className="breakdown-item">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="breakdown-item">
                <span>Tax ({(squareConfig.order.taxRate || 0) * 100}%):</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="breakdown-item">
                <span>Service Charge ({(squareConfig.order.serviceChargeRate || 0) * 100}%):</span>
                <span>${serviceChargeAmount.toFixed(2)}</span>
              </div>
              {formData.tipAmount > 0 && (
                <div className="breakdown-item">
                  <span>Tip:</span>
                  <span>${formData.tipAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="breakdown-item total">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="checkout-form">
            <h2>Pickup Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="pickupTime">Pickup Time *</label>
                <select
                  id="pickupTime"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select pickup time</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tip</label>
                <div className="tip-options">
                  {squareConfig.order.tipOptions?.map((tipPercentage) => (
                    <button
                      key={tipPercentage}
                      type="button"
                      className={`tip-option ${formData.tipAmount === subtotal * tipPercentage ? 'selected' : ''}`}
                      onClick={() => handleTipChange(tipPercentage)}
                    >
                      {tipPercentage === 0 ? 'No Tip' : `${tipPercentage * 100}%`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="specialInstructions">Special Instructions</label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  placeholder="Any special requests or dietary restrictions..."
                  rows={3}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate('/menu')}
                  className="back-btn"
                >
                  Back to Menu
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={orderState.isLoading}
                >
                  {orderState.isLoading ? 'Creating Order...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 