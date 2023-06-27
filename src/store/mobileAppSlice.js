import { createSlice } from "@reduxjs/toolkit";

const mobileAppSlice = createSlice({
  name: "mobileApp",
  initialState: {
    isMenuOpen: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { toggleMenu } = mobileAppSlice.actions;
export default mobileAppSlice.reducer;
