import React from 'react';
import { Link, useLocation } from 'react-router';
import { currentConfig } from '../config/foodCartConfig';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-emoji">{currentConfig.logo}</span>
          <span>{currentConfig.name}</span>
        </Link>

        <nav className="nav">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>HOME</Link>
          <Link to="/menu" className={`nav-link ${isActive('/menu') ? 'active' : ''}`}>MENU</Link>
          <Link to="/hours" className={`nav-link ${isActive('/hours') ? 'active' : ''}`}>HOURS</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>ABOUT</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 