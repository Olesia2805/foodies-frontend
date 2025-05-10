import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserRecipes,
  fetchUserFavorites,
  fetchUserFollowers,
  fetchUserFollowing,
} from './operations';
import { logOutUserOps } from '../auth';

const initialState = {
  recipes: [],
  favorites: [],
  followers: [],
  following: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRecipes.fulfilled, (state, { payload }) => {
        state.recipes = payload;
      })
      .addCase(fetchUserFavorites.fulfilled, (state, { payload }) => {
        state.favorites = payload;
      })
      .addCase(fetchUserFollowers.fulfilled, (state, { payload }) => {
        state.followers = payload;
      })
      .addCase(fetchUserFollowing.fulfilled, (state, { payload }) => {
        state.following = payload;
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
