import React from 'react';
import styles from './IngredientsList.module.css';
import clsx from 'clsx';
import Icon from '../Icon/Icon';

const IngredientsList = ({ ingredients, isPageAddRecipe, onDeleteClick }) => {
  const itemClassName = clsx(
    styles.ingredientListItem,
    isPageAddRecipe && styles.animation
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
            {onDeleteClick && (
              <button
                className={styles['icon-delete']}
                type="button"
                onClick={(event) => onDeleteClick(ingredient._id, event)}
              >
                <Icon name={'plus'} />
              </button>
            )}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default IngredientsList;
