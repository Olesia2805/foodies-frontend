import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts.css';
import './FoodItem.css';
import deleteIcon from '../../assets/Icons/delete.svg';
import arrowIcon from '../../assets/Icons/arrow.svg';

const FoodItem = ({ image, title, description, onDelete, onAction }) => {
  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const handleActionClick = () => {
    if (onAction) {
      onAction();
    }
  };

  return (
    <div className="food-item-container">
      <div className="food-item-content">
        <img src={image} alt={title} className="food-item-image" />

        <div className="food-item-info">
          <h2 className="food-item-title">{title}</h2>
          <p className="food-item-description">{description}</p>
        </div>
      </div>

      <div className="food-item-actions">
        <button
          className="action-button"
          onClick={handleActionClick}
          aria-label="Action"
          onFocus={e => (e.target.style.outline = 'none')}
        >
          <img src={arrowIcon} alt="Action" />
        </button>

        <button
          className="delete-button"
          onClick={handleDeleteClick}
          aria-label="Delete item"
          onFocus={e => (e.target.style.outline = 'none')}
        >
          <img src={deleteIcon} alt="Delete" />
        </button>
      </div>
    </div>
  );
};

FoodItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onAction: PropTypes.func,
};

export default FoodItem;
