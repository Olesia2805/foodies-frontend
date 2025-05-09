import { createSelector } from '@reduxjs/toolkit';

export const selectRecipes = state => state.recipes.items;
export const selectIsRecipesLoading = state => state.recipes.isLoading;
export const selectRecipesError = state => state.recipes.error;
export const selectTotalPages = state => state.recipes.totalPages;
export const selectPage = state => state.recipes.page;

//* DONE
export const selectRecipeById = () => (state) => {
  return state.recipes.item?.recipe || null;
};

// TODO: перевірити
export const selectSingleRecipe = (id) => (state) => {
  const items = state.recipes?.items || [];
  return items.find((recipe) => recipe?._id === id) || null;
};
// TODO: перевірити
export const selectIsLoading = (state) => state.recipes.isLoading;
// TODO: перевірити
export const selectError = (state) => state.recipes.error;
// TODO: перевірити
export const selectRecipesStatus = createSelector(
  [selectIsLoading, selectError],
  (isLoading, error) => ({ isLoading, error })
);
