import React, { useState, useEffect } from 'react';
import { MenuItem } from '../data/menuData';
import { useTenant } from '../context/TenantContext';
import MenuItemCard from '../components/MenuItemCard';
import './Menu.css';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: number]: number }>({});
  const [isMobile, setIsMobile] = useState(false);
  const { currentTenant, loading, error } = useTenant();
  const menuItems = currentTenant?.menuItems || [];
  const categories = currentTenant?.menu_categories || [];

  // Debug logging
  console.log('Current tenant:', currentTenant);
  console.log('Menu items from tenant:', menuItems);
  console.log('Menu items length:', menuItems.length);
  console.log('Categories from tenant:', categories);
  console.log('Active category:', activeCategory);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set default active category when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id || categories[0]);
    }
  }, [categories, activeCategory]);

  // Filter menu items by selected category and sort by popularity
  const filteredItems = activeCategory
    ? menuItems.filter(item => item.category === activeCategory).sort((a, b) => {
      // Sort popular items first   
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return 0;
    })
    : [];

  // Debug logging for filtered items
  console.log('Filtered items:', filteredItems);
  console.log('Filtered items length:', filteredItems.length);

  const heroBackgroundImage = isMobile
    ? '/images/matcha-mobile.png'
    : '/images/iced-matcha.png';

  return (
    <div className="menu">
      {/* Hero Section */}
      <section className="hero-menu">
        <div className="hero-background" style={{ backgroundImage: `url(${heroBackgroundImage})` }} />
        <div className="hero-content">
          <h1>OUR MENU</h1>
        </div>
      </section>

      <div className="container">
        {/* Category Filter */}
        {categories.length > 0 ? (
          <div className="category-filter">
            {categories.map((category: any) => (
              <button
                key={category.id || category}
                className={`category-btn ${activeCategory === (category.id || category) ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id || category)}
              >
                {(category.name || category).toUpperCase()}
              </button>
            ))}
          </div>
        ) : (
          <div className="category-filter">
            <p>No categories available</p>
          </div>
        )}

        {/* Menu Items */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading menu...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>Error loading menu: {error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Retry
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="no-items-container">
            <p>No menu items found for {activeCategory} category.</p>
            {menuItems.length === 0 && (
              <p>No menu items available. Please check your Firebase data.</p>
            )}
          </div>
        ) : (
          <div className="menu-grid">
            {filteredItems.map(item => (
              <MenuItemCard
                key={item.id}
                item={item}
                selectedQuantity={selectedQuantities[item.id]}
                onQuantityChange={q => setSelectedQuantities({ ...selectedQuantities, [item.id]: q })}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu; 