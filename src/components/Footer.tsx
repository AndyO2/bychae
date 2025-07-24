import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📍 123 Food Street, City, State</p>
          <p>📞 (555) 123-4567</p>
          <p>✉️ info@foodcart.com</p>
        </div>
        
        <div className="footer-section">
          <h4>Hours</h4>
          <p>Monday - Friday: 11am - 9pm</p>
          <p>Saturday: 12pm - 10pm</p>
          <p>Sunday: 12pm - 8pm</p>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="social-link">📘 Facebook</a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="social-link">📷 Instagram</a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" className="social-link">🐦 Twitter</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Food Cart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 