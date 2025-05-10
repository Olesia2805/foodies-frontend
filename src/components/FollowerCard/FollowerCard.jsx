import { Link } from 'react-router-dom';
import styles from './FollowerCard.module.css';

const FollowerCard = ({ follower }) => {
  console.log('Follower data:', follower);

  if (!follower) {
    return <div className={styles.card}>Follower data is not available.</div>;
  }

  return (
    <div className={styles.card}>
      <img
        src={follower.avatar}
        alt={follower.name}
        className={styles.avatar}
      />
      <div className={styles.info}>
        <h3 className={styles.name}>{follower.name?.toUpperCase()}</h3>
        <p className={styles.recipesCount}>
          Recipes: {follower.recipes?.length || 0}
        </p>
        <button className={styles.followButton}>FOLLOW</button>
      </div>
      <div className={styles.recipesPreview}>
        {follower.recipes?.slice(0, 4).map((recipe, index) => {
          console.log('Recipe object:', recipe);
          return (
            <img
              key={recipe.id || index}
              src={recipe.thumb || 'default-image-url.jpg'}
              alt={recipe.title || 'No title'}
              className={styles.recipeImage}
            />
          );
        })}
      </div>
      <Link
        to={`http://localhost:3001/user/${follower.id}`}
        className={styles.profileButton}
      >
        /
      </Link>
    </div>
  );
};

export default FollowerCard;
