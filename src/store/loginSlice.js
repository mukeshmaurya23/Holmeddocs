import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogin: false,
    user: {},
    token: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.user = action.payload.patient_first_name;
      state.token = action.payload.remember_token;

      localStorage.setItem("token", state.token);
      localStorage.setItem("userName", JSON.stringify(state.user));
    },
  },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
