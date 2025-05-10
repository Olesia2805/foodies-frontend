import React from 'react';
import Icon from '../Icon/Icon';
import styles from './ListRecipeCard.module.css';

const RecipeCard = (recipe, isCurrentUser) => {
  return (
    <div className={styles.recipeCard}>
      <img
        src={recipe.thumb}
        alt={recipe.title}
        className={styles.recipeImage}
      />
      <div>
        <h3 className={styles.recipeTitle}>{recipe.title}</h3>
        <p className={styles.recipeDescription}>{recipe.description}</p>
      </div>
      <button
        className={styles.arrowButton}
        onClick={() => (window.location.href = `/recipe/${recipe._id}`)}
      >
        <Icon name="arrow-up-right" className={styles.arrowIcon} size={18} />
      </button>

      {isCurrentUser && (
        <button className={styles.deleteButton}>
          <Icon name="trash" className={styles.deleteIcon} size={18}></Icon>
        </button>
      )}
    </div>
  );
};

export default RecipeCard;
