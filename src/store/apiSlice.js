import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "../axios/custom";
const initialState = {
  loading: false,
  data: null,
  insuranceData: null,
  stateData: null,
  error: "",
  status: "idle",
  insuranceStatus: "idle",
  stateStatus: "idle",
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

const fetchInsuranceData = createAsyncThunk(
  "api/fetchInsuranceData",
  async (url) => {
    try {
      const response = await customAxios.post(url);
      const resData = await response.data.data.result;
      return resData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return error.message;
    }
  }
);

const fetchStateData = createAsyncThunk("api/fetchStateData", async (url) => {
  try {
    const response = await customAxios.post(url);
    const resData = await response.data.data.result;
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
    builder.addCase(fetchInsuranceData.pending, (state) => {
      state.insuranceStatus = "loading";
    });
    builder.addCase(fetchInsuranceData.fulfilled, (state, action) => {
      state.insuranceStatus = "succeeded";
      state.insuranceData = action.payload;
    });
    builder.addCase(fetchInsuranceData.rejected, (state, action) => {
      state.insuranceStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchStateData.pending, (state) => {
      state.stateStatus = "loading";
    });
    builder.addCase(fetchStateData.fulfilled, (state, action) => {
      state.stateStatus = "succeeded";
      state.stateData = action.payload;
    });
    builder.addCase(fetchStateData.rejected, (state, action) => {
      state.stateStatus = "failed";
      state.error = action.error.message;
    });
  },
});

export { fetchData, fetchInsuranceData, fetchStateData };
export default apiSlice.reducer;
