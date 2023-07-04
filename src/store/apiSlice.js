import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "../axios/custom";
const initialState = {
  loading: false,
  data: null,
  error: "",
  status: "idle",
};

const fetchData = createAsyncThunk("api/fetchData", async (url) => {
  try {
    const response = await customAxios.post(url);
    console.log(response, "im response from apiSlice");
    const resData = await response.data;
    console.log(resData, "im resData from apiSlice");
    return resData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return error.message;
  }
});

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export { fetchData };
export default apiSlice.reducer;
