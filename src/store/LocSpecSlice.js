import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "../axios/custom";

// Async thunk action to fetch location areas
const fetchLocationAreas = createAsyncThunk(
  "data/fetchLocationAreas",
  async ({ url, zip_code_id = "" }) => {
    const response = await customAxios.post(
      url,
      zip_code_id ? { zip_code_id } : null
    );
    const data = response?.data?.data?.result;
    return data;
  }
);

// Async thunk action to fetch specialties
const fetchSpecialties = createAsyncThunk(
  "data/fetchSpecialties",
  async (url) => {
    const response = await customAxios.post(url);
    return response?.data?.data?.result;
  }
);

const fetchConditions = createAsyncThunk(
  "data/fetchConditions",
  async (url) => {
    const response = await customAxios.post(url);
    return response?.data?.data?.result;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    locationAreas: [],
    specialties: [],
    conditions: [],
    status: "idle",
    specialtiesStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationAreas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocationAreas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.locationAreas = action.payload;
      })
      .addCase(fetchLocationAreas.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSpecialties.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpecialties.fulfilled, (state, action) => {
        state.specialtiesStatus = "succeeded";
        state.specialties = action.payload;
      })
      .addCase(fetchSpecialties.rejected, (state) => {
        state.specialtiesStatus = "failed";
      })
      .addCase(fetchConditions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchConditions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conditions = action.payload;
      })
      .addCase(fetchConditions.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export { fetchLocationAreas, fetchSpecialties, fetchConditions };
export default dataSlice.reducer;
