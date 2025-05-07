import { useSelector } from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard';
import css from './RecipeList.module.css';
import { useShowError } from '../../hooks/useShowError';
import {
  selectRecipes,
  selectIsRecipesLoading,
  selectRecipesError
} from '../../redux/recipes/selectors';

const RecipeList = ({ onUserAvatarClick, onRecipeDetailsClick }) => {
  const isRecipesLoading = useSelector(selectIsRecipesLoading);
  const error = useSelector(selectRecipesError);
  const recipes = useSelector(selectRecipes);

  useShowError(error);

  return (
    <>
      {isRecipesLoading && (
        <div className={css.loadingContainer}>Loading recipes...</div>
      )}

      {!isRecipesLoading && recipes?.length > 0 && (
        <ul className={css.recipeListContainer}>
          {recipes.map(item => (
            <li key={item.id || item._id}>
              <RecipeCard
                mealImage={item.thumb || item.preview || 'https://placehold.co/300x200?text=No+Image'}
                title={item.title || item.name || 'Unnamed Recipe'}
                description={item.description || 'No description available'}
                userAvatar={item.owner?.avatar || 'https://placehold.co/40x40?text=User'}
                userName={item.owner?.name || 'Anonymous'}
                userId={item.owner?.id || item.owner?._id || 'unknown'}
                recipeId={item.id || item._id}
                onUserAvatarClick={onUserAvatarClick}
                onRecipeDetailsClick={onRecipeDetailsClick}
              />
            </li>
          ))}
        </ul>
      )}

      {!isRecipesLoading && (!recipes || recipes.length === 0) && (
        <div className={css.emptyContainer}>
          <p className={css.emptyMessage}>
            Recipes not found.<br />
            Try selecting different filters.
          </p>
        </div>
      )}
    </>
  );
};

export default RecipeList;