import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/recipes');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (recipeId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/recipes/${recipeId}`);
      // TODO: remove log
      console.log(response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addRecipe = createAsyncThunk(
  'recipes/addRecipe',
  async (recipeData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/recipes', recipeData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateRecipe = createAsyncThunk(
  'recipes/updateRecipe',
  async ({ id, recipeData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/recipes/${id}`, recipeData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  'recipes/deleteRecipe',
  async (recipeId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/recipes/${recipeId}`);
      return recipeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
