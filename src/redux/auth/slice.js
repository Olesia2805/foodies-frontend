import { createSlice } from '@reduxjs/toolkit';
import {
  refreshTokenOps,
  signInUserOps,
  signOutUserOps,
  signUpUserOps,
} from './operations.js';

const initialState = {
  isAuthenticated: localStorage.getItem('token') ?? false,
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
      .addCase(signUpUserOps.fulfilled, (state, { payload }) => {
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

      .addCase(refreshTokenOps.fulfilled, (state, { payload }) => {
        localStorage.setItem('token', payload.token);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(signOutUserOps.rejected, () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      })

      .addCase(signOutUserOps.fulfilled, (state) => {
        state.user = null;

        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      });
  },
});

export default authSlice.reducer;
