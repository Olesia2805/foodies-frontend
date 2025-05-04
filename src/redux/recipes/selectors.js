import { createSelector } from '@reduxjs/toolkit';

export const selectRecipes = (state) => state.recipes.items;
export const selectRecipeById = (id) => (state) => state.recipes.item;
export const selectSingleRecipe = (id) => (state) => {
  const items = state.recipes?.items || [];
  return items.find((recipe) => recipe?._id === id) || null;
};
export const selectIsLoading = (state) => state.recipes.isLoading;
export const selectError = (state) => state.recipes.error;

export const selectRecipesStatus = createSelector(
  [selectIsLoading, selectError],
  (isLoading, error) => ({ isLoading, error })
);
