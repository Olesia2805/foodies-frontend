import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserRecipesApi,
  getUserFavoritesApi,
  getUserFollowersApi,
  getUserFollowingApi,
} from 'api/userApi';
import { RECIPES_PER_PAGE, USERS_PER_PAGE } from '../../constants/userTabs';

export const fetchUserRecipes = createAsyncThunk(
  'user/fetchUserRecipes',
  async ({ userId, page = 1, limit = RECIPES_PER_PAGE }, thunkAPI) => {
    try {
      return await getUserRecipesApi(userId, { page, limit });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchUserFavorites = createAsyncThunk(
  'user/fetchUserFavorites',
  async ({ page = 1, limit = RECIPES_PER_PAGE }, thunkAPI) => {
    try {
      return await getUserFavoritesApi({ page, limit });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchUserFollowers = createAsyncThunk(
  'user/fetchUserFollowers',
  async ({ userId, page = 1, limit = USERS_PER_PAGE }, thunkAPI) => {
    try {
      return await getUserFollowersApi(userId, { page, limit });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchUserFollowing = createAsyncThunk(
  'user/fetchUserFollowing',
  async ({ userId, page = 1, limit = USERS_PER_PAGE }, thunkAPI) => {
    try {
      return await getUserFollowingApi(userId, { page, limit });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
