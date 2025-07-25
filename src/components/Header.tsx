import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { currentConfig } from '../config/foodCartConfig';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="header" ref={headerRef}>
      <div className="header-content">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <span className="logo-emoji">{currentConfig.logo}</span>
          <span>{currentConfig.name}</span>
        </Link>

        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMobileMenu}>HOME</Link>
          <Link to="/menu" className={`nav-link ${isActive('/menu') ? 'active' : ''}`} onClick={closeMobileMenu}>MENU</Link>
          <Link to="/hours" className={`nav-link ${isActive('/hours') ? 'active' : ''}`} onClick={closeMobileMenu}>HOURS</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={closeMobileMenu}>ABOUT</Link>
        </nav>

        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header; 