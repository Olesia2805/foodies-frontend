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
import { setIsSignInModalOpen } from '../../redux/common/index.js';
import useFavorites from '../../hooks/useFavorites.js';
import { useMemo } from 'react';
import css from '../RecipeCard/RecipeCard.module.css';

const SimpleRecipeCard = ({ recipe, size = 'regular' }) => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useAuth();

  const { owner, thumb, title, description, _id } = recipe;

  const { isFav, isFavoriteLoading, onFavoriteHandler } = useFavorites(_id);

  return (
    <div
      className={clsx(styles.card, {
        [styles.largeCard]: size === 'large',
      })}
    >
      <Link
        aria-label="Go to details"
        to={`${ROUTER.RECIPE}/${_id}`}
        className={styles.link}
      >
        <img
          src={thumb || 'https://placehold.co/300x200?text=No+Image'}
          alt="meal"
          className={styles.cardImg}
        />
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
      </Link>

      <div className={styles.cardFooter}>
        {isAuthenticated ? (
          <Link
            to={`${ROUTER.USER}/${owner._id}`}
            className={styles.userInfo}
            target="_blank"
          >
            <UserCard owner={owner} />
          </Link>
        ) : (
          <div
            className={styles.userInfo}
            onClick={() => dispatch(setIsSignInModalOpen(true))}
          >
            <UserCard owner={owner} />
          </div>
        )}

        <div className={styles.cardActions}>
          <button
            className={clsx(styles.cardBtn, {
              [styles.cardBtnActive]: isFav,
            })}
            aria-label="Toggle favorite"
            disabled={isFavoriteLoading}
            onClick={() => onFavoriteHandler(_id)}
          >
            <Icon name="heart" className={styles.icon} />
          </button>

          <Link
            className={styles.cardBtn}
            aria-label="Go to details"
            to={`${ROUTER.RECIPE}/${_id}`}
          >
            <Icon name="arrow-up-right" className={styles.icon} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleRecipeCard;

const UserCard = ({ owner }) => {
  return (
    <>
      <img src={owner.avatar} alt={owner.name} className={styles.userImg} />
      <p className={styles.userName}>{owner.name}</p>
    </>
  );
};
