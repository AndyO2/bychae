import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import ImageCarousel from '../components/ImageCarousel';
import './Home.css';

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const heroBackgroundImage = isMobile
    ? '/images/matcha-mobile.png'
    : '/images/iced-matcha.png';

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background" style={{ backgroundImage: `url(${heroBackgroundImage})` }} />
        <div className="hero-bottom-overlay">
          <div className="hero-bottom-left">MORE THAN MATCHA</div>
          <div className="hero-bottom-right">
            <div className="hero-bottom-text">Scoop up our summer specials, inspired by iconic ice cream flavors. Our new Salted Pistachio Matcha, Cookies & Cream Matcha and Rocky Road Latte are ready to sip.</div>
            <Link to="/menu" className="btn">
              VIEW MENU
              <span className="arrow-right">→</span>
            </Link>
          </div>
        </div>
        <div className="hero-mobile-button">
          <Link to="/menu" className="btn">VIEW MENU</Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>ELEVATE YOUR MATCHA EXPERIENCE</h2>
          <p>Visit us today and experience the best matcha in the greater Boston area</p>
          <Link to="/menu" className="btn">LEARN MORE</Link>
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

      {/* Delivery Services Section */}
      <section className="delivery-section">
        <div className="delivery-content">
          <div className="delivery-image">
            <img src="/images/truck.png" alt="Truck" />
          </div>
          <div className="delivery-text">
            <h2>CAN'T MAKE IT TO OUR CART?</h2>
            <p>Order your favorite By:Chae drinks through our delivery partners and have them delivered right to your door. Same great taste, convenient delivery.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 