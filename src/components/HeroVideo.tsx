import React, { useState, useEffect, useRef } from 'react';
import './HeroVideo.css';

interface HeroVideoProps {
  videoUrl: string;
  fallbackImage?: string;
  children: React.ReactNode;
}

const HeroVideo: React.FC<HeroVideoProps> = ({ 
  videoUrl, 
  fallbackImage = "/images/breaking-buns/guabao.jpg",
  children 
}) => {
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Handle video loading and autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoSupported(true);
    };

    const handleError = () => {
      setIsVideoSupported(false);
    };

    const handlePlay = () => {
      setIsVideoPlaying(true);
    };

    const handlePause = () => {
      setIsVideoPlaying(false);
    };

    const handleLoadStart = () => {
      // Try to play the video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true);
          })
          .catch((error) => {
            console.log('Autoplay prevented:', error);
            setIsVideoPlaying(false);
            // On mobile, we might want to show a play button
            if (isMobile) {
              setIsVideoSupported(false);
            }
          });
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadstart', handleLoadStart);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, [isMobile]);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      video.play().then(() => {
        setIsVideoPlaying(true);
        setIsVideoSupported(true);
      }).catch((error) => {
        console.log('Play failed:', error);
      });
    }
  };

  return (
    <section className="hero">
      {/* Video Background */}
      {isVideoSupported && (
        <video 
          ref={videoRef}
          className={`hero-video ${isVideoPlaying ? 'playing' : 'paused'}`}
          autoPlay 
          muted 
          loop 
          playsInline
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <img src={fallbackImage} alt="Hero background" />
        </video>
      )}

      {/* Fallback Image Background */}
      {!isVideoSupported && (
        <div 
          className="hero-fallback"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}

      {/* Play Button for Mobile */}
      {isMobile && !isVideoPlaying && isVideoSupported && (
        <button 
          className="hero-play-button"
          onClick={handlePlayClick}
          aria-label="Play video"
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      )}

      {/* Overlay */}
      <div className="hero-overlay" />
      
      {/* Content */}
      {children}
    </section>
  );
};

export default HeroVideo; 