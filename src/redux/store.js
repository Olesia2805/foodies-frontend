import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import recipesSlice from './recipes/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesSlice,
  },
});
