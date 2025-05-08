import React from 'react';
import styles from './IngredientsList.module.css';
import clsx from 'clsx';

const IngredientsList = ({ ingredients, animation }) => {
  const itemClassName = clsx(
    styles.ingredientListItem,
    animation && styles.animation
  );
  return (
    <ul className={styles.ingredientList}>
      {ingredients.map((ingredient) => (
        <li key={ingredient._id} className={itemClassName}>
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
