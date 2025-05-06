import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import recipesReducer from './recipes/slice';
import commonReducer from './common/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    common: commonReducer,
  },
});
