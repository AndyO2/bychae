import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { currentConfig } from '../config/foodCartConfig';
import ImageCarousel from '../components/ImageCarousel';
import HeroVideo from '../components/HeroVideo';
import './Home.css';

const Home: React.FC = () => {
  const videoUrl = "https://cdn.midjourney.com/video/798305d9-b816-4df6-a706-98437cef9cee/1.mp4";

  return (
    <div className="home">
      {/* Hero Section */}
      <HeroVideo 
        videoUrl={videoUrl}
        fallbackImage="/images/breaking-buns/guabao.jpg"
      >
        <div className="hero-content">
          <h1>{currentConfig.tagline}</h1>
          <p>{currentConfig.description}</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-primary">Menu</Link>
            <div className="hero-button">
              <Link to="/hours" className="btn btn-primary">Hours</Link>
            </div>
          </div>
        </div>
        {!currentConfig.assets.heroImage && (
          <div className="hero-image">
            <div className="food-cart-illustration">{currentConfig.logo}</div>
          </div>
        )}
      </HeroVideo>

      {/* Catchphrase Section */}
      <section className="catchphrase">
        <div className="container">
          <div className="catchphrase-content">
            <h2>WHERE TRADITION MEETS INNOVATION</h2>
            <p>Experience the perfect blend of authentic Asian flavors and modern culinary creativity.</p>
            <Link to="/about" className="btn btn-outline-green">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="hours-section">
        <div className="container">
          <div className="hours-content">
            <h2>HOURS</h2>
            <div className="hours-grid">
              {Object.entries(currentConfig.hours).map(([day, time]) => (
                <div key={day} className="hours-item">
                  <span className="day">{day}</span>
                  <span className="time">{time}</span>
                </div>
              ))}
            </div>
            <div className="hours-cta">
              <Link to="/hours" className="btn btn-outline">View Full Hours</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="image-gallery">
        {/* Desktop Grid */}
        <div className="gallery-desktop">
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/images/breaking-buns/guabao.jpg" alt="Guabao" />
            </div>
            <div className="gallery-item">
              <img src="/images/breaking-buns/yakisoba/chicken-yakisoba.jpg" alt="Chicken Yakisoba" />
            </div>
            <div className="gallery-item">
              <img src="/images/breaking-buns/fried-rice/pork-belly.jpg" alt="Pork Belly Fried Rice" />
            </div>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="gallery-mobile">
          <ImageCarousel 
            images={[
              {
                src: "/images/breaking-buns/guabao.jpg",
                alt: "Guabao"
              },
              {
                src: "/images/breaking-buns/yakisoba/chicken-yakisoba.jpg",
                alt: "Chicken Yakisoba"
              },
              {
                src: "/images/breaking-buns/fried-rice/pork-belly.jpg",
                alt: "Pork Belly Fried Rice"
              }
            ]}
            autoPlay={true}
            autoPlayInterval={5000}
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>READY TO TASTE {currentConfig.tagline.toUpperCase()}?</h2>
          <p>Visit us today and experience the best baos in town!</p>
          <div className="cta-buttons">
            <Link to="/menu" className="btn btn-primary">View Menu</Link>
            <Link to="/hours" className="btn btn-outline-green">Check Hours</Link>
          </div>
        </div>
      </section>

      {/* Delivery Services Section */}
      <section className="delivery-section">
        <div className="delivery-content">
          <div className="delivery-image">
            <img src="/images/breaking-buns/cart.jpg" alt="Food Cart" />
          </div>
          <div className="delivery-text">
            <h2>Can't make it to our cart?</h2>
            <p>No problem! Order your favorite Breaking Buns dishes through our delivery partners and have them delivered right to your door. Same great taste, convenient delivery.</p>
            
            <div className="delivery-services">
              <div className="delivery-service">
                <div className="delivery-logo">
                  <img src="/images/breaking-buns/grubhub.png" alt="GrubHub" />
                </div>
                <a href="https://www.grubhub.com/restaurant/breaking-buns-5523-se-28th-ave-portland/2760956" target="_blank" rel="noopener noreferrer" className="btn btn-grubhub">
                  Order on GrubHub
                </a>
              </div>
              
              <div className="delivery-service">
                <div className="delivery-logo">
                  <img src="/images/breaking-buns/ubereats.png" alt="Uber Eats" />
                </div>
                <a href="https://www.ubereats.com/store/breaking-buns-pdx-southeast-portland/jWObStTAVfuDqkV1yQzSxQ?diningMode=PICKUP&surfaceName=" target="_blank" rel="noopener noreferrer" className="btn btn-ubereats">
                  Order on Uber Eats
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 