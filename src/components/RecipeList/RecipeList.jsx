import { useSelector } from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard';
import css from './RecipeList.module.css';
import { useShowError } from '../../hooks/useShowError';
import {
  selectRecipes,
  selectIsRecipesLoading,
  selectRecipesError,
} from '../../redux/recipes/index.js';
import Loader from '../Loader/Loader';
import SimpleRecipeCard from '../SimpleRecipeCard/SimpleRecipeCard.jsx';

const RecipeList = () => {
  const isRecipesLoading = useSelector(selectIsRecipesLoading);
  const error = useSelector(selectRecipesError);
  const recipes = useSelector(selectRecipes);

  useShowError(error);

  return (
    <>
      {isRecipesLoading && (
        <div className={css.loadingContainer}>
          <Loader />
        </div>
      )}

      {!isRecipesLoading && recipes?.length > 0 && (
        <ul className={css.recipeListContainer}>
          {recipes.map((item) => (
            <li key={item.id || item._id}>
              <SimpleRecipeCard recipe={item} />
            </li>
          ))}
        </ul>
      )}

      {!isRecipesLoading && (!recipes || recipes.length === 0) && (
        <div className={css.emptyContainer}>
          <p className={css.emptyMessage}>
            Recipes not found.
            <br />
            Try selecting different filters.
          </p>
        </div>
      )}
    </>
  );
};

export default RecipeList;
