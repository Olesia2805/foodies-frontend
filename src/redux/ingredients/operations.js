import { createAsyncThunk } from '@reduxjs/toolkit';
import ingredientsAPI from '../../api/ingredientsAPI';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await ingredientsAPI.getAll();
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
