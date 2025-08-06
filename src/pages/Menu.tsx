import React, { useState, useEffect } from 'react';
import { menuItems, categories, Category } from '../data/menuData';
import MenuItemCard from '../components/MenuItemCard';
import './Menu.css';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.matcha);
  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: number]: number }>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredItems = menuItems.filter(item => item.category === activeCategory).sort((a, b) => {
    // Sort popular items first   
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return 0;
  });

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
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Menu Items */}
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

        {/* Special Notice */}
        {/* <div className="menu-notice">
          <h3>🥟 Gua Bao Specials</h3>
          <p>All Gua Bao items come in quantities of 2, 3, or 4. Choose your preferred quantity when ordering!</p>
        </div> */}
      </div>
    </div>
  );
};

export default Menu; 