import { createSlice } from '@reduxjs/toolkit';
import {
  fetchRecipes,
  fetchOwnerRecipes,
  addRecipe,
  deleteRecipe,
  fetchRecipeById,
  updateRecipe,
  fetchFavoriteRecipes,
  addToFavorites,
  removeFromFavorites,
} from './operations';
import { logOutUserOps } from '../auth/index.js';

const initialState = {
  items: [],
  item: null,
  isLoading: false,
  error: null,
  totalPages: 1,
  page: 1,
  favorites: {},
  isFavoriteLoading: false,
  favoriteError: null,
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
      })

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
      })

      .addCase(fetchFavoriteRecipes.pending, (state) => {
        state.isFavoriteLoading = true;
        state.favoriteError = null;
      })
      .addCase(fetchFavoriteRecipes.fulfilled, (state, { payload }) => {
        state.isFavoriteLoading = false;
        state.favorites = payload;
      })
      .addCase(fetchFavoriteRecipes.rejected, (state, { payload }) => {
        state.isFavoriteLoading = false;
        state.favoriteError = payload;
      })

      .addCase(addToFavorites.pending, (state) => {
        state.isFavoriteLoading = true;
        state.favoriteError = null;
      })
      .addCase(addToFavorites.fulfilled, (state, { payload }) => {
        state.isFavoriteLoading = false;
        if (state.favorites && state.favorites.data) {
          const existingIndex = state.favorites.data.findIndex(
            (item) =>
              item._id === payload.recipeId || item.id === payload.recipeId
          );

          if (existingIndex === -1) {
            const recipe = state.items.find(
              (item) =>
                item._id === payload.recipeId || item.id === payload.recipeId
            );

            if (recipe) {
              state.favorites.data = [...state.favorites.data, recipe];
            }
          }
        }
      })
      .addCase(addToFavorites.rejected, (state, { payload }) => {
        state.isFavoriteLoading = false;
        state.favoriteError = payload;
      })

      .addCase(removeFromFavorites.pending, (state) => {
        state.isFavoriteLoading = true;
        state.favoriteError = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, { payload }) => {
        state.isFavoriteLoading = false;
        if (state.favorites && Array.isArray(state.favorites.data)) {
          state.favorites.data = state.favorites.data.filter((item) => {
            const itemId = item._id || item.id;
            return itemId != payload.recipeId;
          });
        }
      })
      .addCase(removeFromFavorites.rejected, (state, { payload }) => {
        state.isFavoriteLoading = false;
        state.favoriteError = payload;
      })

      .addCase(logOutUserOps.fulfilled, (state) => {
        state.favorites = {
          data: [],
        };
      });
  },
});

export const { setPage, clearRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;
