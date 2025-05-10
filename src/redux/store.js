import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import recipesReducer from './recipes/slice';
import userReducer from './user/slice';
import ingredientsReducer from './ingredients/slice';
import categoriesReducer from './categories/slice';
import commonReducer from './common/slice';
import { profileApi } from './auth/profileServices';
import areasReducer from './areas/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
    categories: categoriesReducer,
    user: userReducer,
    areas: areasReducer,
    common: commonReducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware),
});
