import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import Icon from '../Icon/Icon.jsx';

import { useAuth } from '../../hooks/index.js';

import { ROUTER } from '../../constants/router.js';

import { selectFavoriteRecipesId } from '../../redux/auth/index.js';

import styles from '../RecipeCard/RecipeCard.module.css';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/recipes/index.js';
import toast from 'react-hot-toast';

const RecipeCard = ({ recipe, size = 'regular' }) => {
  const dispatch = useDispatch();
  const favoritesIds = useSelector(selectFavoriteRecipesId);

  const { isAuthenticated } = useAuth();
  const { owner, thumb, title, description, _id } = recipe;

  const isFav = favoritesIds.includes(_id);

  const handlerFavorite = async (recipeId) => {
    if (isFav) {
      await dispatch(removeFromFavorites(recipeId));
      toast.success('Recipe removed from favorites');
    } else {
      await dispatch(addToFavorites(recipeId));
      toast.success('Recipe added to favorites');
    }
  };

  return (
    <div
      className={clsx(styles.card, {
        [styles.largeCard]: size === 'large',
      })}
    >
      <Link
        aria-label="Go to details"
        to={`${ROUTER.RECIPE}/${_id}`}
        target="_blank"
      >
        <img src={thumb} alt="meal" className={styles.cardImg} />
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
      </Link>
      <div className={styles.cardFooter}>
        {isAuthenticated ? (
          <Link
            to={`${ROUTER.PROFILE}/${owner._id}`}
            className={styles.userInfo}
            target="_blank"
          >
            <UserCard owner={owner} />
          </Link>
        ) : (
          <div className={styles.userInfo}>
            <UserCard owner={owner} />
          </div>
        )}

        <div className={styles.cardActions}>
          <button
            className={clsx(styles.cardBtn, {
              [styles.cardBtnActive]: isFav,
            })}
            onClick={() => handlerFavorite(_id)}
          >
            <Icon name="heart" className={styles.icon} />
          </button>
          <Link
            className={styles.cardBtn}
            aria-label="Go to details"
            to={`${ROUTER.RECIPE}/${_id}`}
            target="_blank"
          >
            <Icon name="arrow-up-right" className={styles.icon} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

const UserCard = ({ owner }) => {
  return (
    <>
      <img src={owner.avatar} alt={owner.name} className={styles.userImg} />
      <p className={styles.userName}>{owner.name}</p>
    </>
  );
};
