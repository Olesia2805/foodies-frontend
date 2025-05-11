import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserRecipesApi,
  getUserFavoritesApi,
  getUserFollowersApi,
  getUserFollowingApi,
} from 'api/userApi';

export const fetchUserRecipes = createAsyncThunk(
  'user/fetchUserRecipes',
  async ({ userId, page = 1, limit = 9 }, thunkAPI) => {
    try {
      return await getUserRecipesApi(userId, { page, limit });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchUserFavorites = createAsyncThunk(
  'user/fetchUserFavorites',
  async ({ page = 1, limit = 9 }, thunkAPI) => {
    try {
      return await getUserFavoritesApi({ page, limit });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchUserFollowers = createAsyncThunk(
  'user/fetchUserFollowers',
  async ({ userId, page = 1, limit = 5 }, thunkAPI) => {
    try {
      return await getUserFollowersApi(userId, { page, limit });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchUserFollowing = createAsyncThunk(
  'user/fetchUserFollowing',
  async ({ userId, page = 1, limit = 5 }, thunkAPI) => {
    try {
      return await getUserFollowingApi(userId, { page, limit });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
