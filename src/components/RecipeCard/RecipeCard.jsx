import React from 'react';
import Icon from '../Icon/Icon';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className={styles.recipeCard}>
      <img src={recipe.thumb} alt={recipe.title} className={styles.recipeImage} />
      <div>
        <h3 className={styles.recipeTitle}>{recipe.title}</h3>
        <p className={styles.recipeDescription}>{recipe.description}</p>
      </div>
      
        <button
          className={styles.arrowButton}
          onClick={() => window.location.href = `/recipes/${recipe._id}`}
        >
                          <Icon
                  name="arrow-up-right"
                  className={styles.arrowIcon}
                  size={18}
                />
        </button>
      
      
      
    </div>
  );
};

export default RecipeCard;