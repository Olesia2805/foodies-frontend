import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance.js';

export const signUpUserOps = createAsyncThunk(
  'auth/signUpUserOps',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/register', credentials);

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Registration failed'
      );
    }
  }
);

export const signInUserOps = createAsyncThunk(
  'auth/signInUserOps',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const signOutUserOps = createAsyncThunk(
  'auth/signOutUserOps',
  async (_, { rejectWithValue }) => {
    try {
      return await axiosInstance.post('/auth/logout');
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Logout failed');
    }
  }
);

export const getMeOps = createAsyncThunk(
  'auth/getMeOps',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/auth/me');

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Logout failed');
    }
  }
);

export const refreshTokenOps = createAsyncThunk(
  'auth/refresh',
  async (refreshToken, { getState, rejectWithValue }) => {
    try {
      console.log('refreshToken', refreshToken);
      const res = await axiosInstance.post('/auth/refresh-token', {
        refreshToken,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Session expired');
    }
  }
);
