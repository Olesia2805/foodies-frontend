import React from 'react';
import styles from './FollowerCard.module.css';

const FollowerCard = ({ follower }) => {
  console.log('Follower data:', follower); // Debug log

  if (!follower) {
    return <div className={styles.card}>Follower data is not available.</div>;
  }

  return (
    <div className={styles.card}>
      <img src={follower.avatar} alt={follower.name} className={styles.avatar} />
      <div className={styles.info}>
        <h3 className={styles.name}>{follower.name?.toUpperCase()}</h3>
        <p className={styles.recipesCount}>Recipes: {follower.recipes?.length || 0}</p>
        <button className={styles.followButton}>FOLLOW</button>
      </div>
      <div className={styles.recipesPreview}>
        {follower.recipes?.slice(0, 4).map((recipe, index) => {
          console.log('Recipe object:', recipe);
          return (
            <img
              key={recipe.id || index} // Use recipe.id if available, otherwise fallback to index
              src={recipe.thumb || 'default-image-url.jpg'} // Use default image if thumb is undefined
              alt={recipe.title || 'No title'}
              className={styles.recipeImage}
            />
          );
        })}
      </div>
      <button
        className={styles.profileButton}
        onClick={() => window.location.href = `http://localhost:3001/user/${follower.id}`}
      >
        /
      </button>
    </div>
  );
};

export default FollowerCard;