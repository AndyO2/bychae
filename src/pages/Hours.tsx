import React from 'react';
import { useTenant } from '../context/TenantContext';
import './Hours.css';

interface DayHours {
  day: string;
  open: string;
  close: string;
  isOpen: boolean;
}

interface BusinessHours {
  monday?: { openTime: string; closeTime: string; isOpen: boolean };
  tuesday?: { openTime: string; closeTime: string; isOpen: boolean };
  wednesday?: { openTime: string; closeTime: string; isOpen: boolean };
  thursday?: { openTime: string; closeTime: string; isOpen: boolean };
  friday?: { openTime: string; closeTime: string; isOpen: boolean };
  saturday?: { openTime: string; closeTime: string; isOpen: boolean };
  sunday?: { openTime: string; closeTime: string; isOpen: boolean };
}

const Hours: React.FC = () => {
  const { currentTenant, loading, error } = useTenant();
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Parse business hours from tenant data
  const parseBusinessHours = (): DayHours[] => {
    if (!currentTenant?.businessHours) {
      return [];
    }

    const businessHours = currentTenant.businessHours as BusinessHours;
    const hours: DayHours[] = [];

    // Define day order and mapping
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayMapping = {
      'Monday': 'monday',
      'Tuesday': 'tuesday',
      'Wednesday': 'wednesday',
      'Thursday': 'thursday',
      'Friday': 'friday',
      'Saturday': 'saturday',
      'Sunday': 'sunday'
    };

    dayOrder.forEach(day => {
      const dayKey = dayMapping[day as keyof typeof dayMapping];
      const dayHours = businessHours[dayKey as keyof BusinessHours];

      if (dayHours && dayHours.isOpen) {
        hours.push({
          day,
          open: formatTime(dayHours.openTime),
          close: formatTime(dayHours.closeTime),
          isOpen: true
        });
      } else {
        hours.push({
          day,
          open: '',
          close: '',
          isOpen: false
        });
      }
    });

    return hours;
  };

  const formatTime = (time: string): string => {
    // Handle 24-hour format like "09:00" or "21:00"
    if (time.includes(':')) {
      const [hours, minutes] = time.split(':').map(Number);
      const isPM = hours >= 12;
      let displayHour = hours;

      if (hours === 0) {
        displayHour = 12; // Convert 00:00 to 12:00 AM
      } else if (hours > 12) {
        displayHour = hours - 12; // Convert 13:00 to 1:00 PM
      }

      return `${displayHour}:${minutes.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
    }

    // Fallback for other formats (like "3pm")
    const cleanTime = time.trim().toLowerCase();
    const hour = parseInt(cleanTime.replace(/[^0-9]/g, ''));
    const isPM = cleanTime.includes('pm');

    // Keep 12-hour format for display
    let displayHour = hour;
    if (hour === 0) displayHour = 12; // Convert 0 to 12 for 12 AM

    return `${displayHour}:00 ${isPM ? 'PM' : 'AM'}`;
  };

  const hours = parseBusinessHours();

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

  // Show loading state
  if (loading) {
    return (
      <div className="hours">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading business hours...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="hours">
        <div className="container">
          <div className="error-container">
            <p>Error loading business hours: {error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if tenant has required location data
  if (!currentTenant) {
    return (
      <div className="hours">
        <div className="container">
          <div className="error-container">
            <p>No tenant data available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hours">
      <div className="container">
        {/* Hours and Location Side by Side */}
        <div className="hours-location-grid">
          {/* Hours Table */}
          <div className="hours-section">
            <h2>OPERATING HOURS</h2>
            {hours.length === 0 ? (
              <div className="no-hours-container">
                <p>No business hours available. Please check your Firebase data.</p>
              </div>
            ) : (
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
            )}
          </div>

          {/* Location */}
          <div className="location-section">
            <h2>WHERE TO FIND US</h2>
            <div className="location-card">
              <div className="location-info">
                {currentTenant.location?.address && (
                  <p>
                    📍 <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentTenant.location.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="address-link"
                    >
                      {currentTenant.location.address}
                    </a>
                  </p>
                )}
                {currentTenant.phone && (
                  <p>
                    📞 <a
                      href={`tel:${currentTenant.phone.replace(/\s+/g, '')}`}
                      className="phone-link"
                    >
                      {currentTenant.phone}
                    </a>
                  </p>
                )}
                {currentTenant.email && (
                  <p>
                    ✉️ <a
                      href={`mailto:${currentTenant.email}`}
                      className="email-link"
                    >
                      {currentTenant.email}
                    </a>
                  </p>
                )}
              </div>
              <div className="location-map">
                {process.env.REACT_APP_GOOGLE_MAPS_API_KEY && currentTenant.location?.address ? (
                  <iframe
                    title="Location Map"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(currentTenant.location.address)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                  />
                ) : (
                  <div className="map-placeholder">
                    <div className="map-icon">🗺️</div>
                    <h3>Location</h3>
                    {currentTenant.location?.address ? (
                      <>
                        <p>{currentTenant.location.address}</p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentTenant.location.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="directions-btn"
                        >
                          📍 Get Directions on Google Maps
                        </a>
                      </>
                    ) : (
                      <p>Address information not available</p>
                    )}
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