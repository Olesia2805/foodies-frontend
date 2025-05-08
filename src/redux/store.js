import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import recipesReducer from './recipes/slice';
import userReducer from './user/slice';
import categoriesReducer from './categories/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    categories: categoriesReducer,
    user: userReducer,
  },
});
