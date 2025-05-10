import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { selectFavoriteRecipesId } from '../redux/auth/index.js';
import { setIsSignInModalOpen } from '../redux/common/index.js';
import {
  addToFavorites,
  removeFromFavorites,
  selectIsFavoritesLoading,
} from '../redux/recipes/index.js';

import useAuth from './useAuth.js';

const useFavorites = (id) => {
  const dispatch = useDispatch();
  const favoritesIds = useSelector(selectFavoriteRecipesId);
  const isFavoriteLoading = useSelector(selectIsFavoritesLoading);

  const { isAuthenticated } = useAuth();

  const isFav = favoritesIds.includes(Number(id));

  const onFavoriteHandler = async (recipeId) => {
    if (!isAuthenticated) {
      dispatch(setIsSignInModalOpen(true));
      return;
    }

    if (isFav) {
      await dispatch(removeFromFavorites(recipeId));
      toast.success('Recipe removed from favorites');
    } else {
      await dispatch(addToFavorites(recipeId));
      toast.success('Recipe added to favorites');
    }
  };

  return {
    isFav,
    isFavoriteLoading,
    onFavoriteHandler,
  };
};

export default useFavorites;
