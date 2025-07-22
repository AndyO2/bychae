import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';
import { currentConfig } from '../config/foodCartConfig';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { toggleCart, getTotalItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <h1>{currentConfig.logo} {currentConfig.name}</h1>
          </Link>
          {/* <img 
            src="/images/breaking-buns/breaking-buns-logo.jpg" 
            alt={currentConfig.name}
            className="logo-image"
          /> */}
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/menu" 
                className={`nav-link ${isActive('/menu') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/hours" 
                className={`nav-link ${isActive('/hours') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Hours
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/catering" 
                className={`nav-link ${isActive('/catering') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Catering
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                About Us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="cart-btn" onClick={toggleCart}>
            🛒
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </button>
          <button className="hamburger" onClick={toggleMenu}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 