import { createSlice } from '@reduxjs/toolkit';
import { fetchAreas } from './operations';

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const areasSlice = createSlice({
  name: 'areas',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, handlePending)
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchAreas.rejected, handleRejected);
  },
});

export default areasSlice.reducer;
