import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const handleRequestError = (error) => {
  console.error('API request failed:', error);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(error.response?.data?.message || 'Network error');
    }, 1000);
  });
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (params, { rejectWithValue }) => {
    try {
      const { page = 1, category, area, ingredients = [] } = params || {};

      let url = `/recipes?page=${page}&limit=12`;

      if (category) {
        url += `&category=${category}`;
      }

      if (area) {
        url += `&area=${area}`;
      }

      if (ingredients && ingredients.length > 0) {
        ingredients.forEach(ingredient => {
          url += `&ingredient=${ingredient}`;
        });
      }

      console.log('Requesting URL:', url);

      const response = await axiosInstance.get(url);

      const formattedData = {
        recipes: response.data.data || [],
        totalPages: response.data.pages || 1,
        currentPage: response.data.currentPage || 1
      };

      return formattedData;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      const errorMessage = await handleRequestError(error);
      return rejectWithValue(errorMessage);
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
      const errorMessage = await handleRequestError(error);
      return rejectWithValue(errorMessage);
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
      const errorMessage = await handleRequestError(error);
      return rejectWithValue(errorMessage);
    }
  }
);