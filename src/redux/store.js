import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import recipesSlice from './recipes/recipesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesSlice,
  },
});
