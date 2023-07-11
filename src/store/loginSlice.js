import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogin: false,
    user: {},
    remember_token: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
      state.remember_token = action.payload.remember_token;

      // localStorage.setItem("remember_token", state.remember_token);
      // localStorage.setItem("userName", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = {};
      state.remember_token = null;
      // localStorage.removeItem("remember_token");
      // localStorage.removeItem("userName");
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
