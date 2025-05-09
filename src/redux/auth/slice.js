import { createSlice } from '@reduxjs/toolkit';
import {
  getMeOps,
  refreshTokenOps,
  signInUserOps,
  logOutUserOps,
  signUpUserOps,
} from './operations.js';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token') ?? false,
  user: null,

  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserOps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUserOps.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUpUserOps.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(signInUserOps.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(signInUserOps.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.isAuthenticated = true;

        localStorage.setItem('token', payload.token);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(signInUserOps.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isAuthenticated = false;
      })

      .addCase(getMeOps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMeOps.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(getMeOps.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.user = null;
      })

      .addCase(refreshTokenOps.fulfilled, (state, { payload }) => {
        localStorage.setItem('token', payload.token);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })

      .addCase(logOutUserOps.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOutUserOps.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;

        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logOutUserOps.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;

        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      });
  },
});

export default authSlice.reducer;
