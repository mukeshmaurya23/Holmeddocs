import { configureStore } from "@reduxjs/toolkit";
import mobileAppSlice from "./mobileAppSlice";
import loginSlice from "./loginSlice";
const store = configureStore({
  reducer: {
    mobileApp: mobileAppSlice,
    login: loginSlice,
  },
});

export default store;
