import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import styles from './FollowerCard.module.css';

const FollowerCard = ({ item, isOwnProfile }) => {
  console.log('Follower data:', item);

  return (
    <div className={styles.card}>
      <img src={item.avatar} alt={item.name} className={styles.avatar} />
      <div className={styles.info}>
        <h3 className={styles.name}>{item.name?.toUpperCase()}</h3>
        <p className={styles.recipesCount}>
          Recipes: {item.recipes?.length || 0}
        </p>
        <p className={styles.recipesCount}>
          Own recipes: {item.recipes?.length || 0}
        </p>
        <button className={styles.followButton}>FOLLOW</button>
      </div>
      <div className={styles.recipesPreview}>
        {item.recipes?.slice(0, 4).map((recipe, index) => {
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
        className={styles.profileButton}
        onClick={() =>
          (window.location.href = `http://localhost:3001/user/${follower.id}`)
        }
      >
        <Icon name="arrow-up-right" className={styles.arrowIcon} size={18} />
      </Link>
    </div>
  );
};

export default FollowerCard;
