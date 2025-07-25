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
              Breaking Buns was born from a passion for authentic Asian street food and a commitment to culinary excellence. Founded in March 2021, we set out to bring the vibrant flavors of traditional steamed buns, savory yakisoba noodles, and perfectly seasoned fried rice to the heart of Portland.
            </p>
            <p>
              We believe that exceptional food starts with exceptional ingredients. That's why we partner exclusively with premium local suppliers like St. Helen's Ranch for our meats and S&D Produce for the freshest vegetables. Every ingredient tells a story of quality, sustainability, and community.
            </p>
            <p>
              From our humble food cart beginnings, we've grown into a beloved local destination where tradition meets innovation. Each dish we serve is crafted with care, combining time-honored techniques with modern culinary creativity to deliver an unforgettable dining experience.
            </p>
          </div>
          <div className="story-image">
            <img src="/images/breaking-buns/cart.jpg" alt="Breaking Buns Food Cart" className="story-image-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 