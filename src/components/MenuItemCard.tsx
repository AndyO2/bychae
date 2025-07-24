import React from 'react';
import { MenuItem, Category } from '../data/menuData';
import { useCart } from '../context/CartContext';
import './MenuItemCard.css';

interface MenuItemCardProps {
  item: MenuItem;
  selectedQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, selectedQuantity, onQuantityChange }) => {
  const { addItem } = useCart();

  // Determine price based on quantity for bao
  const quantity = item.category === Category.bao && item.options ? (selectedQuantity || 2) : 1;
  const price = item.category === Category.bao && item.options
    ? item.options.find(opt => opt.quantity === quantity)?.price || item.price
    : item.price;

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
          <span className="item-price">${price.toFixed(2)}</span>
          <button
            className="add-to-cart-btn"
            onClick={() => {
              addItem({
                id: item.id,
                name: `${item.name}${quantity > 1 ? ` (${quantity} bao)` : ''}`,
                price: price,
                emoji: ""
              });
            }}
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard; 