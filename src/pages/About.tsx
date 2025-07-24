import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="about-header">
        <div className="container">
          <h1>About Us</h1>
          <p>Our story, our passion, and our commitment to serving delicious food</p>
        </div>
      </div>

      <div className="container">
        {/* Our Story */}
        <div className="story-section">
          <div className="story-content">
            <h2>🍔 Our Story</h2>
            <p>
              Founded in 2018, Food Cart began as a simple dream: to bring delicious, 
              fresh food to our community in an accessible and friendly way. What started 
              as a single cart on the corner of Main Street has grown into a beloved 
              local institution, serving thousands of happy customers every year.
            </p>
            <p>
              Our founder, Chef Maria Rodriguez, started with just a passion for cooking 
              and a desire to share her family's traditional recipes with the world. 
              Today, we continue her legacy by combining traditional flavors with modern 
              culinary techniques, always using the freshest local ingredients.
            </p>
            <p>
              We believe that great food has the power to bring people together, create 
              memories, and make any day special. That's why we put our heart into every 
              dish we serve.
            </p>
          </div>
          <div className="story-image">
            <div className="image-placeholder">📸</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 