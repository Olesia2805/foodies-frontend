import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (params, { rejectWithValue }) => {
    try {
      const { page = 1, categoryId, areaId, ingredientId } = params || {};

      let url = `/recipes?page=${page}&limit=12`;

      if (categoryId) {
        url += `&categoryId=${categoryId}`;
      }

      if (areaId) {
        url += `&areaId=${areaId}`;
      }

      if (ingredientId) {
        url += `&ingredientId=${ingredientId}`;
      }

      console.log('Requesting URL:', url);

      const response = await axiosInstance.get(url);

      const formattedData = {
        recipes: response.data.data || [],
        totalPages: response.data.pages || 1,
        currentPage: response.data.currentPage || 1
      };

      if (!formattedData.recipes.length) {
        return rejectWithValue('Recipes not found');
      }

      return formattedData;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      if (error.response?.status === 404) {
        return rejectWithValue('Recipes not found');
      }
      return rejectWithValue(error.response?.data?.message || 'Network error');
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

export const fetchOwnerRecipes = createAsyncThunk(
  'recipes/fetchOwnerRecipes',
  async (params, { rejectWithValue }) => {
    try {
      const { page = 1 } = params || {};

      console.log('Fetching owner recipes with page:', page);

      const response = await axiosInstance.get(`/recipes/own?page=${page}&limit=9`);

      console.log('Owner recipes API response:', response.data);

      const formattedData = {
        recipes: response.data.data || [],
        totalPages: response.data.pages || 1,
        currentPage: response.data.currentPage || 1
      };

      return formattedData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch owner recipes'
      );
    }
  }
);

export const toggleFavoriteRecipe = createAsyncThunk(
  'recipes/toggleFavorite',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/recipes/favorite/${recipeId}`);
      return { recipeId, ...response.data };
} catch (error) {
      //const errorMessage = await handleRequestError(error);
      //return rejectWithValue(errorMessage);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch '
      );
    }
  }
);