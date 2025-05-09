import { createSelector } from '@reduxjs/toolkit';

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectUser = (state) => state.auth.user;

export const selectIsAuthLoading = (state) => state.auth.loading;

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