import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Функція для обробки помилок зі сповільненням
const handleRequestError = (error) => {
  console.error('API request failed:', error);
  return new Promise((resolve) => {
    // Затримка перед поверненням помилки, щоб запобігти надто частим запитам
    setTimeout(() => {
      resolve(error.response?.data?.message || 'Network error');
    }, 1000);
  });
};

export const getIngredients = createAsyncThunk(
  'common/getIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/ingredients');

      // Перетворюємо дані до формату, який очікує Dropdown
      // Перевіряємо структуру відповіді та адаптуємо її
      if (response.data && Array.isArray(response.data.data)) {
        // Якщо API повертає дані у форматі { data: [...] }
        return response.data.data.map(item => ({
          value: item._id,
          name: item.name
        }));
      } else if (Array.isArray(response.data)) {
        // Якщо API повертає просто масив
        return response.data.map(item => ({
          value: item._id || item.id,
          name: item.name
        }));
      }

      // Якщо структура зовсім інша, виводимо в консоль для дебагу
      console.log('Unexpected ingredients API response structure:', response.data);
      return [];
    } catch (error) {
      const errorMessage = await handleRequestError(error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAreas = createAsyncThunk(
  'common/getAreas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/areas');

      // Перетворюємо дані до формату, який очікує Dropdown
      // Перевіряємо структуру відповіді та адаптуємо її
      if (response.data && Array.isArray(response.data.data)) {
        // Якщо API повертає дані у форматі { data: [...] }
        return response.data.data.map(item => ({
          value: item._id,
          name: item.name
        }));
      } else if (Array.isArray(response.data)) {
        // Якщо API повертає просто масив
        return response.data.map(item => ({
          value: item._id || item.id,
          name: item.name
        }));
      }

      // Якщо структура зовсім інша, виводимо в консоль для дебагу
      console.log('Unexpected areas API response structure:', response.data);
      return [];
    } catch (error) {
      const errorMessage = await handleRequestError(error);
      return rejectWithValue(errorMessage);
    }
  }
);