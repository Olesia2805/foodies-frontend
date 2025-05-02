import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../assets/fonts.css';
import {
  cardContainerStyles,
  cardImageStyles,
  cardTitleStyles,
  recipeTitleStyles,
  favoriteButtonStyles,
  arrowButtonStyles,
  arrowIconStyles,
  authorContainerStyles,
  authorImageStyles,
  authorNameStyles,
} from './ProductCard.styles';
import favoriteIcon from '../../assets/Icons/favorites.svg';
import favoriteHoverIcon from '../../assets/Icons/favorites_Hover.svg';
import arrowIcon from '../../assets/Icons/arrow.svg';

const ProductCard = ({
  image,
  title,
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
    <div style={cardContainerStyles}>
      <img src={image} alt={title} style={cardImageStyles} />
      
      {recipeTitle && <h2 style={recipeTitleStyles}>{recipeTitle}</h2>}

      <h3 style={cardTitleStyles}>{title}</h3>

      <div style={authorContainerStyles}>
        <img src={authorImage} alt={author} style={authorImageStyles} />
        <p style={authorNameStyles}>{author}</p>
      </div>

      <button
        style={favoriteButtonStyles}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <img
          src={isFavorite ? favoriteHoverIcon : favoriteIcon}
          alt="Favorite"
          width="24"
          height="24"
        />
      </button>

      <button
        style={arrowButtonStyles}
        onClick={handleArrowClick}
        aria-label="Add to cart"
      >
        <img src={arrowIcon} alt="Arrow" style={arrowIconStyles} />
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  recipeTitle: PropTypes.string,
  author: PropTypes.string,
  authorImage: PropTypes.string,
  onAddToCart: PropTypes.func,
  onToggleFavorite: PropTypes.func,
};

export default ProductCard;
