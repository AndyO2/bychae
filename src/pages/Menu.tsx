import React, { useState } from 'react';
import { menuItems, categories, Category } from '../data/menuData';
import { currentConfig } from '../config/foodCartConfig';
import MenuItemCard from '../components/MenuItemCard';
import './Menu.css';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.all);
  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: number]: number }>({});

  const filteredItems = activeCategory === Category.all
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="menu">
      <div className="menu-header">
        <div className="container">
          <h1>{currentConfig.name} Menu</h1>
          <p>{currentConfig.description}</p>
        </div>
      </div>

      <div className="container">
        {/* Category Filter */}
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
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
        <div className="menu-notice">
          <h3>🥟 Gua Bao Specials</h3>
          <p>All Gua Bao items come in quantities of 2, 3, or 4. Choose your preferred quantity when ordering!</p>
        </div>
      </div>
    </div>
  );
};

export default Menu; 