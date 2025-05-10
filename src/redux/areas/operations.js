import { createAsyncThunk } from '@reduxjs/toolkit';
import areasAPI from '../../api/areasAPI';

export const fetchAreas = createAsyncThunk(
  'areas/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await areasAPI.getAll();
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
