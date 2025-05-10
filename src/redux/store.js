import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import recipesReducer from './recipes/slice';
import userReducer from './user/slice';
import categoriesReducer from './categories/slice';
import commonReducer from './common/slice'; 
import { profileApi } from './auth/profileServices'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer,
    categories: categoriesReducer,
<<<<<<< HEAD
    user: userReducer,
    common: commonReducer,
=======
    common: commonReducer, 
    [profileApi.reducerPath]: profileApi.reducer, 
>>>>>>> f6823ee40a8af732f82e4a76bb0d5098b1b7d888
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware),
});
