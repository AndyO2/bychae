import React from 'react';
import { Link } from 'react-router';
import { currentConfig } from '../config/foodCartConfig';
import './Home.css';

const Home: React.FC = () => {
  const videoUrl = "https://cdn.midjourney.com/video/798305d9-b816-4df6-a706-98437cef9cee/1.mp4";

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <video 
          className="hero-video"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>{currentConfig.tagline}</h1>
          <p>{currentConfig.description}</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-primary">View Menu</Link>
            <div className="hero-button">
              <Link to="/hours" className="btn btn-outline">Hours</Link>
            </div>
          </div>
        </div>
        {!currentConfig.assets.heroImage && (
          <div className="hero-image">
            <div className="food-cart-illustration">{currentConfig.logo}</div>
          </div>
        )}
      </section>

      {/* Catchphrase Section */}
      <section className="catchphrase">
        <div className="container">
          <div className="catchphrase-content">
            <h2>WHERE TRADITION MEETS INNOVATION</h2>
            <p>Experience the perfect blend of authentic Asian flavors and modern culinary creativity. Every bao tells a story of passion, quality, and the art of breaking bread together.</p>
            <Link to="/about" className="btn btn-primary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="image-gallery">
        <div className="container">
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/images/breaking-buns/bao/bao-short-rib.jpg" alt="Short Rib Bao" />
            </div>
            <div className="gallery-item">
              <img src="/images/breaking-buns/guabao.jpg" alt="Guabao" />
            </div>
            <div className="gallery-item">
              <img src="/images/breaking-buns/fried-rice/pork-belly.jpg" alt="Pork Belly Fried Rice" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Taste {currentConfig.tagline}?</h2>
          <p>Visit us today and experience the best food in town!</p>
          <div className="cta-buttons">
            <Link to="/menu" className="btn btn-primary">View Menu</Link>
            <Link to="/hours" className="btn btn-outline">Check Hours</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 