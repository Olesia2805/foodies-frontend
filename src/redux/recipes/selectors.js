export const selectRecipes = state => state.recipes.items;
export const selectIsRecipesLoading = state => state.recipes.isLoading;
export const selectRecipesError = state => state.recipes.error;
export const selectTotalPages = state => state.recipes.totalPages;
export const selectPage = state => state.recipes.page;