import React, { useState, useEffect } from 'react';
import './HeroVideo.css';

interface HeroImageProps {
  fallbackImage?: string;
  mobileFallbackImage?: string;
  children: React.ReactNode;
}

const HeroImage: React.FC<HeroImageProps> = ({ 
  fallbackImage = "/images/breaking-buns/guabao.jpg",
  mobileFallbackImage,
  children 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="hero">
      {/* Image Background */}
      <div 
        className="hero-fallback"
        style={{ backgroundImage: `url(${isMobile && mobileFallbackImage ? mobileFallbackImage : fallbackImage})` }}
      />

      {/* Overlay */}
      <div className="hero-overlay" />
      
      {/* Content */}
      {children}
    </section>
  );
};

export default HeroImage; 