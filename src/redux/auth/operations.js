import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance.js';
import toast from 'react-hot-toast';
import { ERROR_MESSAGES } from '../../constants/messages.js';

export const signUpUserOps = createAsyncThunk(
  'auth/signUpUserOps',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/register', credentials);

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || ERROR_MESSAGES.REGISTRATION_FAILED
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
      if (err.response?.data?.message === ERROR_MESSAGES.EMAIL_NOT_VERIFIED) {
        await axiosInstance.post(`/auth/verify/`, {
          email: credentials.email,
        });

        return rejectWithValue(ERROR_MESSAGES.EMAIL_NOT_VERIFIED_CHECK_EMAIL);
      }

      return rejectWithValue(
        err.response?.data?.message || ERROR_MESSAGES.LOGIN_FAILED
      );
    }
  }
);

export const logOutUserOps = createAsyncThunk(
  'auth/logOutUserOps',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/logout');

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || ERROR_MESSAGES.LOGOUT_FAILED
      );
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
      return rejectWithValue(
        err.response?.data?.message || ERROR_MESSAGES.CANT_GET_USER
      );
    }
  }
);

export const refreshTokenOps = createAsyncThunk(
  'auth/refresh',
  async (refreshToken, { getState, rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/auth/refresh-token', {
        refreshToken,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || ERROR_MESSAGES.SESSION_EXPIRED
      );
    }
  }
);

export const verifyUserWithTokenOps = createAsyncThunk(
  'auth/verifyUserWithTokenOps',
  async (token, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/auth/verify/${token}`);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || ERROR_MESSAGES.INCORRECT_USER_VERIFICATION_TOKEN
      );
    }
  }
);
