import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import recipesReducer from './recipes/slice';
import categoriesReducer from './categories/slice';
import { profileApi } from './auth/profileServices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    categories: categoriesReducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware),
});