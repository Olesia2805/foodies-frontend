import { createSlice } from '@reduxjs/toolkit';
import { getIngredients, getAreas } from './operations';

const initialState = {
  isLoading: false,
  error: null,
  ingredients: [],
  areas: [],
  selectedCategory: null,
  selectedIngredients: [],
  selectedArea: null,
  // Додаємо флаги для відстеження спроб завантаження на рівні Redux
  ingredientsFetchStatus: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  areasFetchStatus: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
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
    // Додаємо акції для скидання статусу спроб
    resetFetchStatus: (state) => {
      state.ingredientsFetchStatus = 'idle';
      state.areasFetchStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Обробка запитів інгредієнтів
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

        // Додаємо логування для дебагу
        console.log('Ingredients from API saved to Redux state:', payload);
      })
      .addCase(getIngredients.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.ingredientsFetchStatus = 'failed';
        // Встановлюємо порожній масив, щоб не зациклювати запити
        state.ingredients = [];
      })

      // Обробка запитів областей
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

        // Додаємо логування для дебагу
        console.log('Areas from API saved to Redux state:', payload);
      })
      .addCase(getAreas.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.areasFetchStatus = 'failed';
        // Встановлюємо порожній масив, щоб не зациклювати запити
        state.areas = [];
      });
  },
});

export const {
  setSelectedCategory,
  setSelectedIngredients,
  setSelectedArea,
  resetFetchStatus
} = commonSlice.actions;
export default commonSlice.reducer;