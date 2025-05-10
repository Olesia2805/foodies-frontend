import styles from './ListRecipeCard.module.css';

const RecipeCard = ({ recipe }) => {
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
        className={styles.recipeButton}
        onClick={() => (window.location.href = `/recipes/${recipe._id}`)}
      >
        <span className={styles.recipeButtonIcon}>/</span>
      </button>
    </div>
  );
};

export default RecipeCard;
