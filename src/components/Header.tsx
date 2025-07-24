import React from 'react';
import { Link } from 'react-router';
import { currentConfig } from '../config/foodCartConfig';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-emoji">{currentConfig.logo}</span>
          <span>{currentConfig.name}</span>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/menu" className="nav-link">MENU</Link>
          <Link to="/hours" className="nav-link">HOURS</Link>
          <Link to="/about" className="nav-link">ABOUT</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 