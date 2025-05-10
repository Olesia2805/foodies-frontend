import { Link } from 'react-router-dom';
import styles from './ListRecipeCard.module.css';

const ListRecipeCard = (recipe) => {
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
      <Link to={`/recipes/${recipe.id}`} className={styles.recipeButton}>
        <span className={styles.recipeButtonIcon}>/</span>
      </Link>
    </div>
  );
};

export default ListRecipeCard;
