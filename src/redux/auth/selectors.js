export const selectIsAuthenticated = (state) => Boolean(state.auth.isAuthenticated);

export const selectUser = (state) => state.auth.user || null;

export const selectIsAuthLoading = (state) => Boolean(state.auth.loading);

export const selectId = (state) => state.auth.user.id;

export const selectRecipesCount = (state) => state.auth.user?.recipes || 0;

export const selectFollowers = (state) => state.auth.user?.followers || 0;

export const selectFollowings = (state) => state.auth.user?.following || 0;