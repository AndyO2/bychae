import React from 'react';
import { currentConfig } from '../config/foodCartConfig';
import './Hours.css';

interface DayHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

const Hours: React.FC = () => {
  const headerImageUrl = "https://cdn.midjourney.com/video/31f89f36-f795-486f-9b4c-f30c340b1c99/3.mp4";
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  // Convert config hours to the format expected by the component
  const parseConfigHours = (): DayHours[] => {
    const hours: DayHours[] = [];
    
    // Parse the config hours
    Object.entries(currentConfig.hours).forEach(([days, timeRange]) => {
      if (timeRange.toLowerCase() === 'closed') {
        // Handle closed days
        if (days.includes('-')) {
          const [startDay, endDay] = days.split('-');
          const dayRange = getDayRange(startDay, endDay);
          dayRange.forEach(day => {
            hours.push({ day, open: '', close: '', isOpen: false });
          });
        } else {
          hours.push({ day: days, open: '', close: '', isOpen: false });
        }
      } else {
        // Handle open days
        const [open, close] = timeRange.split('-');
        if (days.includes('-')) {
          const [startDay, endDay] = days.split('-');
          const dayRange = getDayRange(startDay, endDay);
          dayRange.forEach(day => {
            hours.push({ 
              day, 
              open: formatTime(open), 
              close: formatTime(close), 
              isOpen: true 
            });
          });
        } else {
          hours.push({ 
            day: days, 
            open: formatTime(open), 
            close: formatTime(close), 
            isOpen: true 
          });
        }
      }
    });
    
    // Sort by day order
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return hours.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
  };

  const getDayRange = (startDay: string, endDay: string): string[] => {
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const startIndex = dayOrder.findIndex(day => day.toLowerCase().includes(startDay.toLowerCase()));
    const endIndex = dayOrder.findIndex(day => day.toLowerCase().includes(endDay.toLowerCase()));
    
    if (startIndex === -1 || endIndex === -1) return [];
    
    const days = [];
    let currentIndex = startIndex;
    do {
      days.push(dayOrder[currentIndex]);
      currentIndex = (currentIndex + 1) % 7;
    } while (currentIndex !== (endIndex + 1) % 7);
    
    return days;
  };

  const formatTime = (time: string): string => {
    // Convert "3pm" to "3:00 PM", "11pm" to "11:00 PM", etc.
    const cleanTime = time.trim().toLowerCase();
    const hour = parseInt(cleanTime.replace(/[^0-9]/g, ''));
    const isPM = cleanTime.includes('pm');
    
    // Keep 12-hour format for display
    let displayHour = hour;
    if (hour === 0) displayHour = 12; // Convert 0 to 12 for 12 AM
    
    return `${displayHour}:00 ${isPM ? 'PM' : 'AM'}`;
  };

  const hours = parseConfigHours();

  const isCurrentlyOpen = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Find today's hours
    const today = hours.find(day => day.day === currentDay);
    
    if (!today || !today.isOpen) return false;
    
    // Parse opening time
    const openMatch = today.open.match(/(\d+):(\d+)\s*(AM|PM)/);
    if (!openMatch) return false;
    
    let openHour = parseInt(openMatch[1]);
    const openMinute = parseInt(openMatch[2]);
    const openPeriod = openMatch[3];
    
    if (openPeriod === 'PM' && openHour !== 12) openHour += 12;
    if (openPeriod === 'AM' && openHour === 12) openHour = 0;
    
    // Parse closing time
    const closeMatch = today.close.match(/(\d+):(\d+)\s*(AM|PM)/);
    if (!closeMatch) return false;
    
    let closeHour = parseInt(closeMatch[1]);
    const closeMinute = parseInt(closeMatch[2]);
    const closePeriod = closeMatch[3];
    
    if (closePeriod === 'PM' && closeHour !== 12) closeHour += 12;
    if (closePeriod === 'AM' && closeHour === 12) closeHour = 0;
    
    const currentTimeMinutes = currentHour * 60 + currentMinute;
    const openTimeMinutes = openHour * 60 + openMinute;
    const closeTimeMinutes = closeHour * 60 + closeMinute;
    
    return currentTimeMinutes >= openTimeMinutes && currentTimeMinutes <= closeTimeMinutes;
  };

  return (
    <div className="hours">
      <div className="hours-header">
        <video 
          className="header-video"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src={headerImageUrl} type="video/mp4" />
        </video>
        <div className="header-overlay" />
        <div className="container">
          <h1>Hours & Location</h1>
          <p>Find us and know when we're serving delicious food</p>
        </div>
      </div>

      <div className="container">
        {/* Current Status */}
        <div className={`status-card ${isCurrentlyOpen() ? 'open' : 'closed'}`}>
          <div className="status-icon">
            {isCurrentlyOpen() ? '🟢' : '🔴'}
          </div>
          <div className="status-content">
            <h2>We are currently {isCurrentlyOpen() ? 'OPEN' : 'CLOSED'}</h2>
            <p>Today is {currentDay} • Current time: {currentTime}</p>
          </div>
        </div>

        {/* Hours and Location Side by Side */}
        <div className="hours-location-grid">
          {/* Hours Table */}
          <div className="hours-section">
            <h2>OPERATING HOURS</h2>
            <div className="hours-table">
              {hours.map((day, index) => (
                <div 
                  key={index} 
                  className={`hours-row ${day.day === currentDay ? 'current-day' : ''}`}
                >
                  <div className="day">{day.day}</div>
                  <div className="time">
                    {day.isOpen ? `${day.open} - ${day.close}` : 'Closed'}
                  </div>
                  <div className="status">
                    {day.day === currentDay && isCurrentlyOpen() ? '🟢 Open Now' : 
                     day.day === currentDay ? '🔴 Closed' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="location-section">
            <h2>WHERE TO FIND US</h2>
            <div className="location-card">
              <div className="location-info">
                <p>📍 {currentConfig.address}</p>
                <p>📞 {currentConfig.phone}</p>
                <p>✉️ {currentConfig.email}</p>
              </div>
              <div className="location-map">
                {process.env.REACT_APP_GOOGLE_MAPS_API_KEY ? (
                  <iframe 
                    title="Location Map"
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJW7cYtJAKlVQRKzF3ux7Fomo&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                  />
                ) : (
                  <div className="map-placeholder">
                    <div className="map-icon">🗺️</div>
                    <h3>Location</h3>
                    <p>{currentConfig.address}</p>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentConfig.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="directions-btn"
                    >
                      📍 Get Directions on Google Maps
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hours; 