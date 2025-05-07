import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipes, fetchOwnerRecipes } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  totalPages: 1,
  page: 1
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    clearRecipes: (state) => {
      state.items = [];
      state.totalPages = 1;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload.recipes || [];
        state.totalPages = payload.totalPages || 1;
      })
      .addCase(fetchRecipes.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        if (payload === 'Recipes not found' || payload?.includes('404')) {
          state.items = [];
          state.totalPages = 1;
        }
      })

      .addCase(fetchOwnerRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOwnerRecipes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload.recipes || [];
        state.totalPages = payload.totalPages || 1;
      })
      .addCase(fetchOwnerRecipes.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        if (payload === 'Recipes not found' || payload?.includes('404')) {
          state.items = [];
          state.totalPages = 1;
        }
      });
  },
});

export const { setPage, clearRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;