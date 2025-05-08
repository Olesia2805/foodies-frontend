import { createSelector } from '@reduxjs/toolkit';

// TODO: перевірити
export const selectRecipes = (state) => state.recipes.items;

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
