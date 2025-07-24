import React from 'react';
import { Link, useLocation } from 'react-router';
import { currentConfig } from '../config/foodCartConfig';
import './OrderConfirmation.css';

interface LocationState {
  orderId?: string;
  orderNumber?: string;
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const { orderId, orderNumber } = (location.state as LocationState) || {};

  // Calculate estimated pickup time (20 minutes from now)
  const calculatePickupTime = () => {
    const now = new Date();
    const pickupTime = new Date(now.getTime() + (20 * 60 * 1000));
    return pickupTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="order-confirmation">
      <div className="confirmation-container">
        <div className="confirmation-card">
          <div className="success-icon">✅</div>
          <h1>Order Confirmed!</h1>
          <p className="confirmation-message">
            Thank you for your order! We're preparing your food with care.
          </p>
          
          <div className="order-details">
            <h2>Order Details</h2>
            <div className="detail-item">
              <span className="label">Order Number:</span>
              <span className="value">
                {orderNumber || `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`}
              </span>
            </div>
            {orderId && (
              <div className="detail-item">
                <span className="label">Order ID:</span>
                <span className="value">{orderId}</span>
              </div>
            )}
            <div className="detail-item">
              <span className="label">Estimated Pickup:</span>
              <span className="value">{calculatePickupTime()}</span>
            </div>
            <div className="detail-item">
              <span className="label">Location:</span>
              <span className="value">{currentConfig.address}</span>
            </div>
            <div className="detail-item">
              <span className="label">Phone:</span>
              <span className="value">{currentConfig.phone}</span>
            </div>
          </div>

          <div className="pickup-instructions">
            <h3>Pickup Instructions</h3>
            <ul>
              <li>Please bring a valid ID for pickup</li>
              <li>Have your order number ready</li>
              <li>We'll call you when your order is ready</li>
              <li>Orders are held for 30 minutes after completion</li>
              <li>Please arrive at the pickup time you selected</li>
            </ul>
          </div>

          <div className="contact-info">
            <h3>Need to make changes?</h3>
            <p>Call us at <strong>{currentConfig.phone}</strong></p>
            <p>Or email us at <strong>{currentConfig.email}</strong></p>
          </div>

          <div className="action-buttons">
            <Link to="/menu" className="order-again-btn">
              Order Again
            </Link>
            <Link to="/" className="home-btn">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 