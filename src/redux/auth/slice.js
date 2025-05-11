import { createSlice } from '@reduxjs/toolkit';
import {
  getMeOps,
  signInUserOps,
  logOutUserOps,
  signUpUserOps,
  verifyUserWithTokenOps,
} from './operations.js';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
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
      })
      .addCase(signInUserOps.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isAuthenticated = false;
      })

      .addCase(verifyUserWithTokenOps.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(verifyUserWithTokenOps.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.isAuthenticated = true;
      })
      .addCase(verifyUserWithTokenOps.rejected, (state, { payload }) => {
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

      .addCase(logOutUserOps.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOutUserOps.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logOutUserOps.rejected, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
