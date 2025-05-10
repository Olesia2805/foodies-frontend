import React from 'react';
import styles from './IngredientsList.module.css';

const IngredientsList = ({ ingredients }) => {
  return (
    <ul className={styles.ingredientList}>
      {ingredients.map((ingredient, index) => (
        <li key={index} className={styles.ingredientListItem}>
          <img src={ingredient.img} alt={ingredient.name} />
          <ul>
            <li className={styles.ingredientName}>{ingredient.name}</li>
            <li className={styles.ingredientMeasure}>
              {ingredient.recipe_ingredient.measure}
            </li>
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default IngredientsList;
