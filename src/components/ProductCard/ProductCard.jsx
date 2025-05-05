import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts.css';
import './ProductCard.css';
import favoriteIcon from '../../assets/Icons/favorites.svg';
import favoriteHoverIcon from '../../assets/Icons/favorites_Hover.svg';
import arrowIcon from '../../assets/Icons/arrow.svg';

const ProductCard = ({
  image,
  description,
  recipeTitle,
  author = 'Ivetta',
  authorImage = 'https://randomuser.me/api/portraits/women/44.jpg',
  onAddToCart,
  onToggleFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(!isFavorite);
    }
  };

  const handleArrowClick = () => {
    if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <div className="card-container">
      <img src={image} alt={description} className="card-image" />

      {recipeTitle && <h2 className="recipe-title">{recipeTitle}</h2>}

      <h3 className="card-description">{description}</h3>

      <div className="author-container">
        <img src={authorImage} alt={author} className="author-image" />
        <p className="author-name">{author}</p>
      </div>

      <button
        className="favorite-button"
        onClick={handleFavoriteClick}
        onFocus={e => (e.target.style.outline = 'none')}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <img
          src={isFavorite ? favoriteHoverIcon : favoriteIcon}
          alt="Favorite"
        />
      </button>

      <button
        className="arrow-button"
        onClick={handleArrowClick}
        onFocus={e => (e.target.style.outline = 'none')}
        aria-label="Add to cart"
      >
        <img src={arrowIcon} alt="Arrow" />
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  recipeTitle: PropTypes.string,
  author: PropTypes.string,
  authorImage: PropTypes.string,
  onAddToCart: PropTypes.func,
  onToggleFavorite: PropTypes.func,
};

export default ProductCard;
