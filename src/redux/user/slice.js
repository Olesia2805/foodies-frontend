import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserRecipes,
  fetchUserFavorites,
  fetchUserFollowers,
  fetchUserFollowing,
} from './operations';
import { logOutUserOps } from '../auth';
import { deleteRecipe, removeFromFavorites } from '../recipes';
import { RECIPES_PER_PAGE } from '../../constants/userTabs';

const initialState = {
  recipes: { data: [], total: 0, pages: 1, currentPage: 1 },
  favorites: { data: [], total: 0, pages: 1, currentPage: 1 },
  followers: { data: [], total: 0, pages: 1, currentPage: 1 },
  following: { data: [], total: 0, pages: 1, currentPage: 1 },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRecipes.fulfilled, (state, { payload }) => {
        state.recipes = {
          data: payload.data,
          total: payload.total,
          pages: payload.pages,
          currentPage: payload.currentPage,
        };
      })
      .addCase(fetchUserFavorites.fulfilled, (state, { payload }) => {
        state.favorites = {
          data: payload.data,
          total: payload.total,
          pages: payload.pages,
          currentPage: payload.currentPage,
        };
      })
      .addCase(fetchUserFollowers.fulfilled, (state, { payload }) => {
        state.followers = {
          data: payload.data,
          total: payload.total,
          pages: payload.pages,
          currentPage: payload.currentPage,
        };
      })
      .addCase(fetchUserFollowing.fulfilled, (state, { payload }) => {
        state.following = {
          data: payload.data,
          total: payload.total,
          pages: payload.pages,
          currentPage: payload.currentPage,
        };
      })
      .addCase(deleteRecipe.fulfilled, (state, { payload }) => {
        state.recipes.data = state.recipes.data.filter(
          (recipe) => recipe._id !== payload
        );
        state.recipes.total -= 1;
        state.recipes.pages = Math.ceil(state.recipes.total / RECIPES_PER_PAGE);
      })
      .addCase(removeFromFavorites.fulfilled, (state, { payload }) => {
        state.favorites.data = state.favorites.data.filter((item) => {
          return item._id != payload.recipeId;
        });
        state.favorites.total -= 1;
        state.favorites.pages = Math.ceil(
          state.favorites.total / RECIPES_PER_PAGE
        );
      })
      .addCase(logOutUserOps.fulfilled, (state) => {
        Object.assign(state, initialState);
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
        }
      );
  },
});

export default userSlice.reducer;
