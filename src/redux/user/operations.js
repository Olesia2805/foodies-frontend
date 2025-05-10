import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserRecipesApi,
  getUserFavoritesApi,
  getUserFollowersApi,
  getUserFollowingApi,
} from 'api/userApi';

export const fetchUserRecipes = createAsyncThunk(
  'user/fetchUserRecipes',
  async (userId, thunkAPI) => {
    try {
      return await getUserRecipesApi(userId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchUserFavorites = createAsyncThunk(
  'user/fetchUserFavorites',
  async (_, thunkAPI) => {
    try {
      return await getUserFavoritesApi();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchUserFollowers = createAsyncThunk(
  'user/fetchUserFollowers',
  async (userId, thunkAPI) => {
    try {
      return await getUserFollowersApi(userId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchUserFollowing = createAsyncThunk(
  'user/fetchUserFollowing',
  async (userId, thunkAPI) => {
    try {
      return await getUserFollowingApi(userId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
