import { Link } from 'react-router-dom';
import { ROUTER } from '../../constants/router.js';
import Icon from '../Icon/Icon';
import styles from './ListRecipeCard.module.css';

const ListRecipeCard = ({ item, isOwnProfile }) => {
  return (
    <div className={styles.recipeCard}>
      <img src={item.thumb} alt={item.title} className={styles.recipeImage} />
      <div className={styles.recipeInfo}>
        <h3 className={styles.recipeTitle}>{item.title}</h3>
        <p className={styles.recipeDescription}>{item.description}</p>
      </div>
      <div className={styles.recipeButtons}>
        <Link
          to={`${ROUTER.RECIPE}/${item._id}`}
          className={styles.recipeButton}
        >
          <Icon
            name="arrow-up-right"
            className={styles.recipeBtnIcon}
            size={16}
          />
        </Link>

        {isOwnProfile && (
          <button className={styles.recipeButton}>
            <Icon
              name="trash"
              className={styles.recipeBtnIcon}
              size={16}
            ></Icon>
          </button>
        )}
      </div>
    </div>
  );
};

export default ListRecipeCard;
