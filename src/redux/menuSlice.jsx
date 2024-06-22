// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuState: false,
    themeState: 'system',
  },
  // initialState: 8,
  reducers: {
    menuHandler: (state, action) => {
      console.log(state, action, action.payload);
      state.menuState = action.payload;
    },
    themeHandler: (state, action) => {
      console.log(state, action, action.payload);
      state.themeState = action.payload;
    },
  },
});

export const { menuHandler, themeHandler } = menuSlice.actions;

export default menuSlice.reducer;
