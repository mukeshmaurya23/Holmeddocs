import { createSlice } from "@reduxjs/toolkit";

const mobileAppSlice = createSlice({
  name: "mobileApp",
  initialState: {
    isMenuOpen: false,
    isMenuForFilter: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    toggleFilterMenu :(state)=>{
      state.isMenuForFilter = !state.isMenuForFilter;
    }
  },
});

export const { toggleMenu, toggleFilterMenu } = mobileAppSlice.actions;
export default mobileAppSlice.reducer;
