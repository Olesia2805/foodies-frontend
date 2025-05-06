//export const selectFavoriteRecipesId = state =>
//  state.auth?.user?.favoriteRecipes?.map(recipe => recipe.id) || [];

//export const selectFavoriteRecipesId = state =>
//  state.auth?.user?.favorites?.map(recipe => recipe.id) || [];

// Temporary solution to avoid errors in the codebase
export const selectFavoriteRecipesId = () => [];