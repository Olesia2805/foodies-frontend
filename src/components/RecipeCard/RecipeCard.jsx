import { useSelector } from 'react-redux';
import css from './RecipeCard.module.css';
import Icon from '../Icon/Icon';
import { selectFavoriteRecipesId } from '../../redux/authUser/index.js';
import clsx from 'clsx';

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
                    }) => {
  const favoritesIds = useSelector(selectFavoriteRecipesId);
  const isFav = favoritesIds?.includes(recipeId);
  const heartClass = clsx(css.cardBtn, {
    [css.cardBtnActive]: isFav,
  });

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
            onClick={() => onFavoriteClick(recipeId)}
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