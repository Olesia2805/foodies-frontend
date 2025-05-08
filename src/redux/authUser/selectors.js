import { createSelector } from '@reduxjs/toolkit';

export const selectFavoritesObject = state =>
  state.recipes?.favorites || { data: [] };

export const selectFavoriteRecipes = createSelector(
  [selectFavoritesObject],
  (favorites) => favorites.data || []
);

export const selectFavoriteRecipesId = createSelector(
  [selectFavoriteRecipes],
  (favorites) => {
    return favorites.map(recipe => {
      return recipe._id || recipe.id;
    });
  }
);