import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useState } from 'react';
import css from './RecipeCard.module.css';
import Icon from '../Icon/Icon';
import { selectFavoriteRecipesId } from '../../redux/auth/index.js';
import { addToFavorites, removeFromFavorites } from '../../redux/recipes/index.js';
import { selectIsAuthenticated } from '../../redux/auth/index.js';
import clsx from 'clsx';
import toast from 'react-hot-toast';

const RecipeCard = ({
                      mealImage,
                      title,
                      description,
                      userId,
                      userAvatar,
                      userName,
                      recipeId,
                      onUserAvatarClick = () => {},
                      onRecipeDetailsClick = () => {},
                      onFavoriteClick = () => {},
                      onAuthRequired = () => {},
                    }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const favoritesIds = useSelector(selectFavoriteRecipesId);
  const [isProcessing, setIsProcessing] = useState(false);

  const isFav = useMemo(() => {
    return favoritesIds.includes(recipeId);
  }, [favoritesIds, recipeId]);

  const heartClass = useMemo(() => {
    return clsx(css.cardBtn, {
      [css.cardBtnActive]: isFav,
    });
  }, [isFav]);

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    if (isProcessing) {
      return;
    }

    setIsProcessing(true);

    try {
      if (isFav) {
        await dispatch(removeFromFavorites(recipeId)).unwrap();
        toast.success('Recipe removed from favorites');
      } else {
        await dispatch(addToFavorites(recipeId)).unwrap();
        toast.success('Recipe added to favorites');
      }

      if (onFavoriteClick) {
        onFavoriteClick(recipeId);
      }
    } catch (error) {
      let errorMessage = 'Failed to update favorites';

      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error.message === 'string') {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={css.card}>
      <img src={mealImage} alt="meal" className={css.cardImg} />
      <h2 className={css.cardTitle}>{title}</h2>
      <p className={css.cardDescription}>{description}</p>
      <div className={css.cardFooter}>
        <button className={css.userInfo} onClick={() => onUserAvatarClick(userId)}>
          <img src={userAvatar} alt={userName} className={css.userImg} />
          <p className={css.userName}>{userName}</p>
        </button>
        <div className={css.cardActions}>
          <button
            className={heartClass}
            aria-label="Toggle favorite"
            onClick={handleFavoriteClick}
            disabled={isProcessing}
          >
            <Icon name="heart" className={css.icon} />
          </button>
          <button
            className={css.cardBtn}
            onClick={() => onRecipeDetailsClick(recipeId)}
            aria-label="Go to details"
          >
            <Icon name="arrow-up-right" className={css.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;