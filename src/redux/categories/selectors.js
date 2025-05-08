export const selectCategories = (state) => state.categories?.items || [];
export const selectCategoriesIsLoading = (state) => state.categories?.loading || false;
export const selectCategoriesError = (state) => state.categories?.error || null;