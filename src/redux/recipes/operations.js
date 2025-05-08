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

      const response = await axiosInstance.get(`/recipes/own?page=${page}&limit=9`);

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
      return rejectWithValue(
        error.response?.data?.message || 'Failed to toggle favorite'
      );
    }
  }
);

export const fetchFavoriteRecipes = createAsyncThunk(
  'recipes/fetchFavoriteRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/recipes/favorites');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch favorite recipes'
      );
    }
  }
);

export const addToFavorites = createAsyncThunk(
  'recipes/addToFavorites',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/recipes/favorites', { id: recipeId });
      return { recipeId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add to favorites'
      );
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'recipes/removeFromFavorites',
  async (recipeId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete('/recipes/favorites', {
        data: { id: recipeId }
      });

      return { recipeId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove from favorites'
      );
    }
  }
);