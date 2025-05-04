import { createSelector } from '@reduxjs/toolkit';

export const selectRecipes = state => state.recipes.items;
export const selectRecipeById = id => state => state.recipes.items.find(recipe => recipe._id === id);
export const selectIsLoading = state => state.recipes.isLoading;
export const selectError = state => state.recipes.error;

export const selectRecipesStatus = createSelector(
  [selectIsLoading, selectError],
  (isLoading, error) => ({ isLoading, error })
);