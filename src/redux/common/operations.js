import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { ERROR_MESSAGES } from '../../constants/messages.js';

export const getIngredients = createAsyncThunk(
  'common/getIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/ingredients');

      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data.map(item => ({
          value: item._id,
          name: item.name
        }));
      } else if (Array.isArray(response.data)) {
        return response.data.map(item => ({
          value: item._id || item.id,
          name: item.name
        }));
      }

      console.log('Unexpected ingredients API response structure:', response.data);
      return [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch ingredients'
      );
    }
  }
);

export const getAreas = createAsyncThunk(
  'common/getAreas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/areas');

      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data.map(item => ({
          value: item._id,
          name: item.name
        }));
      } else if (Array.isArray(response.data)) {
        return response.data.map(item => ({
          value: item._id || item.id,
          name: item.name
        }));
      }

      console.log('Unexpected areas API response structure:', response.data);
      return [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch areas'
      );
    }
  }
);

export const getCategories = createAsyncThunk(
  'common/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/categories');

      let categoriesList = [];

      if (response.data && Array.isArray(response.data.data)) {
        categoriesList = response.data.data.map(item => ({
          id: item._id,
          value: item._id,
          name: item.name,
          description: item.description
        }));
      } else if (Array.isArray(response.data)) {
        categoriesList = response.data.map(item => ({
          id: item._id || item.id,
          value: item._id || item.id,
          name: item.name,
          description: item.description
        }));
      }

      return categoriesList;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch categories'
      );
    }
  }
);