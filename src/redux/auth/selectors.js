export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export const selectUser = (state) => state.auth.user;

export const selectIsAuthLoading = (state) => state.auth.loading;
