import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import recipesReducer from './recipes/slice';
import ingredientsReducer from './ingredients/slice';
import categoriesReducer from './categories/slice';
import areasReducer from './areas/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
    categories: categoriesReducer,
    areas: areasReducer,
  },
});
