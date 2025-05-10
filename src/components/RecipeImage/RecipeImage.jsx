import React from 'react';
import styles from './RecipeImage.module.css';

const RecipeImage = ({ src, alt }) => {
  return (
    <div className={styles.imageWrapper}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
};

export default RecipeImage;
