import React from 'react';
import { Link } from 'react-router';
import { currentConfig } from '../config/foodCartConfig';
import ImageCarousel from '../components/ImageCarousel';
import HeroImage from '../components/HeroVideo';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <HeroImage 
        fallbackImage="/images/matcha-background.png"
        mobileFallbackImage="/images/matcha-mobile.png"
      >
        <div className="hero-content">
          <h1>{currentConfig.tagline}</h1>
          <p>{currentConfig.description}</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-primary">VIEW MENU</Link>
            <Link to="/hours" className="btn btn-outline-green">CHECK HOURS</Link>
          </div>
        </div>
        {!currentConfig.assets.heroImage && (
          <div className="hero-image">
            <div className="food-cart-illustration">{currentConfig.logo}</div>
          </div>
        )}
      </HeroImage>

      {/* Catchphrase Section */}
      <section className="catchphrase">
        <div className="container">
          <div className="catchphrase-content">
            <h2>WHERE TRADITION MEETS INNOVATION</h2>
            <p>Experience the perfect blend of authentic Asian flavors and modern culinary creativity.</p>
            <Link to="/about" className="btn btn-outline-green">LEARN MORE</Link>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="image-gallery">
        {/* Desktop Grid */}
        <div className="gallery-desktop">
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/images/gallery1.png" alt="Gallery 1" />
            </div>
            <div className="gallery-item">
              <img src="/images/gallery2.png" alt="Gallery 2" /> 
            </div>
            <div className="gallery-item">
              <img src="/images/gallery3.png" alt="Gallery 3" />
            </div>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="gallery-mobile">
          <ImageCarousel 
            images={[
              {
                src: "/images/gallery1.png",
                alt: "Gallery Image 1"
              },
              {
                src: "/images/gallery2.png",
                alt: "Gallery Image 2"
              },
              {
                src: "/images/gallery3.png",
                alt: "Gallery Image 3"
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
            <Link to="/menu" className="btn btn-primary">VIEW MENU</Link>
            <Link to="/hours" className="btn btn-outline-green">CHECK HOURS</Link>
          </div>
        </div>
      </section>

      {/* Delivery Services Section */}
      <section className="delivery-section">
        <div className="delivery-content">
          <div className="delivery-image">
            <img src="/images/truck.png" alt="Truck" />
          </div>
          <div className="delivery-text">
            <h2>CAN'T MAKE IT TO OUR CART?</h2>
            <p>Order your favorite Breaking Buns dishes through our delivery partners and have them delivered right to your door. Same great taste, convenient delivery.</p>
            
            <div className="delivery-services">
              <div className="delivery-service">
                <div className="delivery-logo">
                  <img src="/images/truck.png" alt="Truck" />
                </div>
                <a href="https://www.grubhub.com/restaurant/breaking-buns-5523-se-28th-ave-portland/2760956" target="_blank" rel="noopener noreferrer" className="btn btn-grubhub">
                  ORDER ON GRUBHUB
                </a>
              </div>
              
              <div className="delivery-service">
                <div className="delivery-logo">
                  <img src="/images/breaking-buns/ubereats.png" alt="Uber Eats" />
                </div>
                <a href="https://www.ubereats.com/store/breaking-buns-pdx-southeast-portland/jWObStTAVfuDqkV1yQzSxQ?diningMode=PICKUP&surfaceName=" target="_blank" rel="noopener noreferrer" className="btn btn-ubereats">
                  ORDER ON UBER EATS
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