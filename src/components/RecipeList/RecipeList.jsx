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

  // Логування для діагностики
  console.log('RecipeList rendering with recipes:', recipes);
  console.log('Loading state:', isRecipesLoading);
  console.log('Error state:', error);

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
                mealImage={item.thumb || item.preview || 'https://via.placeholder.com/300x200?text=No+Image'}
                title={item.title || item.name || 'Unnamed Recipe'}
                description={item.description || 'No description available'}
                userAvatar={item.owner?.avatar || 'https://via.placeholder.com/40x40?text=User'}
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
          <p>No recipes found. Try selecting different filters or categories.</p>
        </div>
      )}
    </>
  );
};

export default RecipeList;