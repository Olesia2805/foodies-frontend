export const selectUserRecipes = (state) => state.user.recipes;

export const selectUserFavorites = (state) => state.user.favorites;

export const selectUserFollowers = (state) => state.user.followers;

export const selectUserFollowing = (state) => state.user.following;

export const selectUserLoading = (state) => state.user.loading;

export const selectUserError = (state) => state.user.error;
