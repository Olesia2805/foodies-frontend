import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import recipesSlice from './recipes/slice';
import categoriesSlice from './categories/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesSlice,
    categories: categoriesSlice,
  },
});
