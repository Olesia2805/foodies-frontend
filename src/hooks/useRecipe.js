import { useDispatch, useSelector } from 'react-redux';

import {
  selectPopularRecipes,
  selectPopularRecipesIsLoading,
} from '../redux/recipes/selectors.js';
import { getPopularRecipesOps } from '../redux/recipes/operations.js';

const useRecipe = () => {
  const dispatch = useDispatch();
  const popularRecipes = useSelector(selectPopularRecipes);
  const isPopularRecipesLoading = useSelector(selectPopularRecipesIsLoading);

  const getPopularRecipes = async () => {
    await dispatch(getPopularRecipesOps());
  };

  return {
    popularRecipes,
    isPopularRecipesLoading,
    getPopularRecipes,
  };
};

export default useRecipe;
