import { createSelector } from '@reduxjs/toolkit';

export const selectIsAuthenticated = (state) =>
  Boolean(state.auth.isAuthenticated);

export const selectUser = (state) => state.auth.user || null;

export const selectIsAuthLoading = (state) => Boolean(state.auth.loading);

export const selectId = (state) => state.auth.user.id;

export const selectRecipesCount = (state) => state.auth.user?.recipes || 0;

export const selectFollowers = (state) => state.auth.user?.followers || 0;

export const selectFollowings = (state) => state.auth.user?.following || 0;

export const selectFavoritesObject = (state) =>
  state.recipes?.favorites || { data: [] };

export const selectFavoriteRecipes = createSelector(
  [selectFavoritesObject],
  (favorites) => favorites.data || []
);

export const selectFavoriteRecipesId = createSelector(
  [selectFavoriteRecipes],
  (favorites) => {
    return favorites.map((recipe) => {
      return recipe._id || recipe.id;
    });
  }
);
