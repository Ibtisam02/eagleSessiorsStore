// src/booleanSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isToggled: false, // Initial value of the boolean
};

const booleanSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isToggled = !state.isToggled; // Toggle the boolean value
    },
  },
});

export const { toggle } = booleanSlice.actions;

export default booleanSlice.reducer;