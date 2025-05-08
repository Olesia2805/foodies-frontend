import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import axiosInstance from '../../api/axiosInstance';

// TODO: перевірити
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

// * DONE
export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (recipeId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/recipes/${recipeId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// TODO: перевірити
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

// TODO: перевірити
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

// TODO: перевірити
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

export const getPopularRecipesOps = createAsyncThunk(
  'recipes/getPopularRecipesOps',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/recipes/popular');

      return response.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
