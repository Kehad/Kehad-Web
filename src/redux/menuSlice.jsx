// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menuState: false,
  },
  // initialState: 8,
  reducers: {
    menuHandler: (state, action) => {
      console.log(state, action, action.payload);
      state.menuState = action.payload;
    },
  },
});

export const { menuHandler } = menuSlice.actions;

export default menuSlice.reducer;
