import React from 'react';
import { MenuItem } from '../data/menuData';
import './MenuItemCard.css';

interface MenuItemCardProps {
  item: MenuItem;
  selectedQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, selectedQuantity, onQuantityChange }) => {
  return (
    <div className={`menu-item ${item.popular ? 'popular' : ''}`}>
      {item.popular && <span className="popular-badge">🔥 Popular</span>}
      {item.image && (
        <div className="menu-item-image">
          <img src={item.image} alt={item.name} />
        </div>
      )}
      <div className="item-content">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description}</p>
        <div className="item-footer">
          <span className="item-price">${item.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard; 