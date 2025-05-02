import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  extraReducers: (builder) => {
    builder
  }
})

export default recipesSlice.reducer
