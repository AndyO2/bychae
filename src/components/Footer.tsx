import React from 'react';
import { currentConfig } from '../config/foodCartConfig';

import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom-content">
        <div className="footer-bottom-text">
          c. 2025 BY:CHAE ALL RIGHTS RESERVED.
        </div>
        <div className="social-links">
          {currentConfig.socialMedia?.instagram && (
            <a
              href="https://www.instagram.com/craftedbychae/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              INSTAGRAM
            </a>
          )}
          {currentConfig.socialMedia?.tiktok && (
            <a
              href="https://www.tiktok.com/@_bychae"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              TIKTOK
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 