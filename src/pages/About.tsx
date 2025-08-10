import React from 'react';
import './About.css';
import { useTenant } from '../context/TenantContext';

const About: React.FC = () => {
  const { currentTenant, loading, error } = useTenant();

  if (loading) {
    return (
      <div className="about">
        <div className="story-content">
          <div className="story-content-title">Loading...</div>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="about">
        <div className="story-content">
          <div className="story-content-title">Error Loading Content</div>
          <div className="story-content-text">
            <p>Sorry, there was an error loading the content: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Get the about content from the current tenant
  const aboutContent = currentTenant?.about || 'No content available';

  return (
    <div className="about">
      <div className="story-content">
        <div className="story-content-title">MORE THAN JUST MATCHA</div>
        <div className="story-content-image">
          <img src="/images/aboutus.png" alt="Matcha" />
        </div>
      </div>
      <div className="story-content">
        <div
          className="story-content-text"
          dangerouslySetInnerHTML={{
            __html: aboutContent.replace(/\n/g, '<br>')
          }}
        />
        <hr />
        <div className="story-content-links">
          {currentTenant?.instagram && (
            <div style={{ width: '50%' }}>
              <a href={currentTenant.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                INSTAGRAM
              </a>
            </div>
          )}
          {currentTenant?.tiktok && (
            <div style={{ width: '50%' }}>
              <a href={currentTenant.tiktok} target="_blank" rel="noopener noreferrer" className="social-link">
                TIKTOK
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About; 