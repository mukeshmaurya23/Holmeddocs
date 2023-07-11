import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "../axios/custom";

// Async thunk action to fetch location areas
const fetchLocationAreas = createAsyncThunk(
  "data/fetchLocationAreas",
  async (url) => {
    const response = await customAxios.post(url);
    return response?.data?.data?.result;
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

const dataSlice = createSlice({
  name: "data",
  initialState: {
    locationAreas: [],
    specialties: [],
    status: "idle",
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
        state.status = "succeeded";
        state.specialties = action.payload;
      })
      .addCase(fetchSpecialties.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export { fetchLocationAreas, fetchSpecialties };
export default dataSlice.reducer;