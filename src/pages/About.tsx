import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="story-content">
        <div className="story-content-title">MORE THAN JUST MATCHA</div>
      </div>
      <div className="story-content">
        <div className="story-content-text">
          Hi, my name is David Chae, and I'm the 20-year-old founder of by Chae.
          What started from my love for food and sharing that love with others has now become something real.
          <br />
          <br />
          Despite still being in college, I took a bet on myself this summer — and I'm beyond grateful for each and every comment, DM, and all the overwhelming support.
          <br />
          <br />
          This is just the beginning — we're building the biggest matcha brand in the world, together.
          <br />
          <br />
          With love 🫶,<br />
          by Chae
          <br />
          <br />
        </div>
        <hr />
        <div className="story-content-links">
          <div style={{ width: '50%' }}>
            <a href="https://www.instagram.com/craftedbychae/" target="_blank" rel="noopener noreferrer" className="social-link">
              INSTAGRAM
            </a>
          </div>
          <div style={{ width: '50%' }}>
            <a href="https://www.tiktok.com/@_bychae?lang=en" target="_blank" rel="noopener noreferrer" className="social-link">
              TIKTOK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 