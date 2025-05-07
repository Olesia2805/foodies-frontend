import { createSlice } from '@reduxjs/toolkit';
import {
  addRecipe,
  deleteRecipe,
  fetchRecipeById,
  fetchOwnerRecipes,
  updateRecipe,
} from './operations';

const initialState = {
  items: [],
  item: null,
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
    builder
      // Fetch all recipes
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch recipe by ID
      .addCase(fetchRecipeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add recipe
      .addCase(addRecipe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update recipe
      .addCase(updateRecipe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete recipe
      .addCase(deleteRecipe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, clearRecipes } = recipesSlice.actions;
// export const recipesReducer = recipesSlice.reducer;
export default recipesSlice.reducer;