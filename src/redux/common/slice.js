import { createSlice } from '@reduxjs/toolkit';
import { getIngredients, getAreas, getCategories } from './operations';

const initialState = {
  isLoading: false,
  error: null,
  ingredients: [],
  areas: [],
  categories: [],
  selectedCategory: null,
  selectedIngredients: [],
  selectedArea: null,
  ingredientsFetchStatus: 'idle',
  areasFetchStatus: 'idle',
  categoriesFetchStatus: 'idle',

  isSignInModalOpen: false,
  isSignUpModalOpen: false,
  isVerifyEmailModalOpen: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
    setSelectedIngredients: (state, { payload }) => {
      state.selectedIngredients = payload;
    },
    setSelectedArea: (state, { payload }) => {
      state.selectedArea = payload;
    },
    resetFetchStatus: (state) => {
      state.ingredientsFetchStatus = 'idle';
      state.areasFetchStatus = 'idle';
      state.categoriesFetchStatus = 'idle';
    },

    setIsSignInModalOpen: (state, { payload }) => {
      state.isSignInModalOpen = payload;
    },
    setIsSignUpModalOpen: (state, { payload }) => {
      state.isSignUpModalOpen = payload;
    },
    setIsVerifyEmailModalOpen: (state, { payload }) => {
      state.isVerifyEmailModalOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(getIngredients.pending, (state) => {
        if (state.ingredientsFetchStatus !== 'succeeded') {
          state.isLoading = true;
          state.ingredientsFetchStatus = 'loading';
          state.error = null;
        }
      })
      .addCase(getIngredients.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.ingredients = payload || [];
        state.ingredientsFetchStatus = 'succeeded';
      })
      .addCase(getIngredients.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.ingredientsFetchStatus = 'failed';
        state.ingredients = [];
      })
      
      .addCase(getAreas.pending, (state) => {
        if (state.areasFetchStatus !== 'succeeded') {
          state.isLoading = true;
          state.areasFetchStatus = 'loading';
          state.error = null;
        }
      })
      .addCase(getAreas.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.areas = payload || [];
        state.areasFetchStatus = 'succeeded';
      })
      .addCase(getAreas.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.areasFetchStatus = 'failed';
        state.areas = [];
      })
      
      .addCase(getCategories.pending, (state) => {
        if (state.categoriesFetchStatus !== 'succeeded') {
          state.isLoading = true;
          state.categoriesFetchStatus = 'loading';
          state.error = null;
        }
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = payload || [];
        state.categoriesFetchStatus = 'succeeded';
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.categoriesFetchStatus = 'failed';
        state.categories = [];
      });
  },
});

export const {
  setSelectedCategory,
  setSelectedIngredients,
  setSelectedArea,
  resetFetchStatus,
  setIsSignInModalOpen,
  setIsSignUpModalOpen,
  setIsVerifyEmailModalOpen,
} = commonSlice.actions;
export default commonSlice.reducer;
