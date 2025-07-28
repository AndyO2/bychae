import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Sun, Moon } from 'lucide-react';
import { currentConfig } from '../config/foodCartConfig';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Handle scroll to change header background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight; // 100vh
      setIsScrolled(scrollPosition > heroHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force white header on menu, hours, catering, and about pages
  const forceWhiteHeader = ['/menu', '/hours', '/catering', '/about'].some(path => location.pathname.startsWith(path));
  const headerClass = `header${isScrolled || forceWhiteHeader ? ' scrolled' : ''}`;

  return (
    <header className={headerClass} ref={headerRef}>
      <div className="header-content">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <img src="/images/breaking-buns/breaking-buns-logo.jpg" alt="Breaking Buns Logo" className="logo-image" />
          <span>{currentConfig.name}</span>
        </Link>

        {isMobileMenuOpen && (
          <button className="close-menu-button" onClick={closeMobileMenu}>
            ✕
          </button>
        )}
        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMobileMenu}>HOME</Link>
          <Link to="/menu" className={`nav-link ${isActive('/menu') ? 'active' : ''}`} onClick={closeMobileMenu}>MENU</Link>
          <Link to="/hours" className={`nav-link ${isActive('/hours') ? 'active' : ''}`} onClick={closeMobileMenu}>HOURS</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} onClick={closeMobileMenu}>ABOUT</Link>
        </nav>

        <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          {theme === 'light' ? <Moon /> : <Sun />}
        </button>

        <div className="mobile-controls">
          <button className="mobile-theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 