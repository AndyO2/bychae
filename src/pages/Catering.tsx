import React, { useState } from 'react';
import './Catering.css';

interface CateringPackage {
  id: number;
  name: string;
  description: string;
  price: number;
  minGuests: number;
  maxGuests: number;
  includes: string[];
  emoji: string;
}

const Catering: React.FC = () => {
  const headerVideoUrl = "https://cdn.midjourney.com/video/31f89f36-f795-486f-9b4c-f30c340b1c99/3.mp4";
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '',
    package: '',
    message: ''
  });

  const cateringPackages: CateringPackage[] = [
    {
      id: 1,
      name: "Small Gathering",
      description: "Perfect for intimate events and small meetings",
      price: 15,
      minGuests: 10,
      maxGuests: 25,
      includes: ["Appetizers", "Main dishes", "Sides", "Beverages", "Setup & cleanup"],
      emoji: "👥"
    },
    {
      id: 2,
      name: "Medium Event",
      description: "Ideal for corporate lunches and family gatherings",
      price: 12,
      minGuests: 26,
      maxGuests: 50,
      includes: ["Appetizers", "Main dishes", "Sides", "Desserts", "Beverages", "Setup & cleanup", "Staff service"],
      emoji: "🎉"
    },
    {
      id: 3,
      name: "Large Celebration",
      description: "Perfect for weddings, parties, and big events",
      price: 10,
      minGuests: 51,
      maxGuests: 100,
      includes: ["Appetizers", "Main dishes", "Sides", "Desserts", "Beverages", "Setup & cleanup", "Staff service", "Custom menu"],
      emoji: "🎊"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    alert('Thank you for your catering inquiry! We will contact you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventDate: '',
      guestCount: '',
      package: '',
      message: ''
    });
  };

  return (
    <div className="catering">
      <div className="catering-header">
        <video 
          className="header-video"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src={headerVideoUrl} type="video/mp4" />
        </video>
        <div className="header-overlay" />
        <div className="container">
          <h1>Catering Services</h1>
          <p>Let us cater your next event with delicious food and professional service</p>
        </div>
      </div>

      <div className="container">
        {/* Catering Packages */}
        <div className="packages-section">
          <h2>🎯 Catering Packages</h2>
          <div className="packages-grid">
            {cateringPackages.map(pkg => (
              <div key={pkg.id} className="package-card">
                <div className="package-emoji">{pkg.emoji}</div>
                <h3>{pkg.name}</h3>
                <p className="package-description">{pkg.description}</p>
                <div className="package-price">
                  <span className="price">${pkg.price}</span>
                  <span className="per-person">per person</span>
                </div>
                <div className="package-guests">
                  {pkg.minGuests} - {pkg.maxGuests} guests
                </div>
                <div className="package-includes">
                  <h4>Includes:</h4>
                  <ul>
                    {pkg.includes.map((item, index) => (
                      <li key={index}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Our Catering */}
        <div className="why-catering">
          <h2>🌟 Why Choose Our Catering?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🍽️</div>
              <h3>Fresh & Local</h3>
              <p>We use only the freshest local ingredients for all our catering events.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👨‍🍳</div>
              <h3>Professional Staff</h3>
              <p>Our experienced team ensures your event runs smoothly from setup to cleanup.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎨</div>
              <h3>Custom Menus</h3>
              <p>We work with you to create the perfect menu for your special occasion.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📞</div>
              <h3>Personal Service</h3>
              <p>From initial consultation to event day, we provide personalized attention.</p>
            </div>
          </div>
        </div>

        {/* Catering Form */}
        <div className="catering-form-section">
          <h2>📝 Request a Quote</h2>
          <div className="form-container">
            <form onSubmit={handleSubmit} className="catering-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eventDate">Event Date *</label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="guestCount">Number of Guests *</label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    min="10"
                    max="100"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="package">Preferred Package</label>
                  <select
                    id="package"
                    name="package"
                    value={formData.package}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a package</option>
                    {cateringPackages.map(pkg => (
                      <option key={pkg.id} value={pkg.name}>
                        {pkg.name} (${pkg.price}/person)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your event, dietary restrictions, or special requests..."
                />
              </div>

              <button type="submit" className="submit-btn">
                Request Quote
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catering; 