import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import recipesReducer from './recipes/slice';
import categoriesSlice from './categories/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    categories: categoriesSlice,
  },
});
