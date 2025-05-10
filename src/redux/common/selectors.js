export const selectIsCommonLoading = (state) =>
  state.common?.isLoading || false;
export const selectCommonError = (state) => state.common?.error || null;
export const selectIngredients = (state) => state.common?.ingredients || [];
export const selectAreas = (state) => state.common?.areas || [];
export const selectCategories = (state) => state.common?.categories || [];
export const selectSelectedCategory = (state) =>
  state.common?.selectedCategory || null;
export const selectSelectedIngredients = (state) =>
  state.common?.selectedIngredients || [];
export const selectSelectedArea = (state) => state.common?.selectedArea || null;

export const selectIsSignInModalOpen = (state) =>
  state.common.isSignInModalOpen;
export const selectIsSignUpModalOpen = (state) =>
  state.common.isSignUpModalOpen;
export const selectIsVerifyEmailModalOpen = (state) =>
  state.common.isVerifyEmailModalOpen;
