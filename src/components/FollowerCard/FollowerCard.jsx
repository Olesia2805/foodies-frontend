import { Link } from 'react-router-dom';
import { ROUTER } from '../../constants/router';
import Icon from '../Icon/Icon';
import styles from './FollowerCard.module.css';

const FollowerCard = ({ item }) => {
  return (
    <div className={styles.card}>
      <div className={styles.user}>
        <img src={item.avatar} alt={item.name} className={styles.avatar} />
        <div className={styles.info}>
          <h3 className={styles.name}>{item.name}</h3>
          <p className={styles.text}>
            Own recipes: {item.recipes?.length || 0}
          </p>
          <button className={styles.followBtn}>Follow</button>
        </div>
      </div>
      <div className={styles.recipes}>
        {item.recipes.map((recipe) => {
          return (
            <Link
              key={recipe._id}
              to={`${ROUTER.RECIPE}/${recipe._id}`}
              className={styles.recipeLink}
              title={recipe.title}
            >
              <img
                key={recipe._id}
                src={recipe.thumb}
                alt={recipe.title}
                className={styles.recipeImage}
              />
            </Link>
          );
        })}
      </div>
      <Link to={`${ROUTER.USER}/${item._id}`} className={styles.btn}>
        <Icon name="arrow-up-right" className={styles.btnIcon} size={16} />
      </Link>
    </div>
  );
};

export default FollowerCard;
