import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="container">
        {/* Our Story */}
        <div className="story-section">
          <div className="story-content">
            <h2>ABOUT US</h2>
            <p>
              Hi, my name is David Chae, and I'm the 20-year-old founder of by Chae.
            </p>
            <p>
              What started from my love for food and sharing that love with others has now become something real.
            </p>
            <p>
              Despite still being in college, I took a bet on myself this summer — and I'm beyond grateful for each and every comment, DM, and all the overwhelming support.
            </p>
            <p>
              This is just the beginning — we're building the biggest matcha brand in the world, together.
            </p>
            <p>
              With love 🫶,<br />
              by Chae
            </p>
          </div>
          <div className="story-image">
            <img src="/images/aboutus.png" alt="About Us" className="story-image-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 