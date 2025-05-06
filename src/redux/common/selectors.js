export const selectIsCommonLoading = state => state.common?.isLoading || false;
export const selectCommonError = state => state.common?.error || null;
export const selectIngredients = state => state.common?.ingredients || [];
export const selectAreas = state => state.common?.areas || [];
export const selectSelectedCategory = state => state.common?.selectedCategory || null;
export const selectSelectedIngredients = state => state.common?.selectedIngredients || [];
export const selectSelectedArea = state => state.common?.selectedArea || null;