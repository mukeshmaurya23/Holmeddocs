import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import customAxios from "../axios/custom";

export const searchLocation = createAsyncThunk(
  "search/searchLocation",
  async (searchValue) => {
    //{ dispatch }
    try {
      const response = await customAxios.post("/patient/master/areas", {
        name: searchValue,
      });
      //const result = response?.data?.data?.result || [];
      //   dispatch(addCacheResults({ [searchValue]: result }));
      //   console.log(addCacheResults({ [searchValue]: result }), "im result" );
      // return result;
      return response?.data?.data?.result || [];
    } catch (error) {
      console.error("Error while fetching search results:", error);
      return [];
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    name: "",

    loading: false,
    locationSearchResults: null,
    // cachedResults: initialCache,
  },
  reducers: {
    // addCacheResults: (state, action) => {
    //   state.cachedResults = { ...state.cachedResults, ...action.payload };
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(searchLocation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchLocation.fulfilled, (state, action) => {
      state.locationSearchResults = action.payload;
      state.loading = false;
    });
    builder.addCase(searchLocation.rejected, (state) => {
      state.loading = false;
    });
  },
});
//export const { addCacheResults } = searchSlice.actions;
export default searchSlice.reducer;
