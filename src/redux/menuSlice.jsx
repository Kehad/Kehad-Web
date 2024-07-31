// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuState: false,
    themeState: 'system',
  },
  reducers: {
    menuHandler: (state, action) => {
      state.menuState = action.payload;
    },
    themeHandler: (state, action) => {
      // to change theme from dark mode to light mode and vice versa
      state.themeState = action.payload;
    },
  },
});

export const { menuHandler, themeHandler } = menuSlice.actions;

export default menuSlice.reducer;
