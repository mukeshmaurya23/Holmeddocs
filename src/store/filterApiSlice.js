// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import customAxios from "../axios/custom";

// const initialState = {
//   loading: false,
//   data: null,
//   error: "",
//   status: "idle",
// };

// const fetchFilterData = createAsyncThunk(
//   "api/fetchFilterData",
//   async (url, { language }) => {
//     try {
//       const response = await customAxios.post(url, {
//         language,
//       });

//       const resData = await response?.data?.result;
//       console.log(resData, "im resData from filterData");
//       return resData;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return error.message;
//     }
//   }
// );

// const apiSlice = createSlice({
//   name: "filterapi",
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder.addCase(fetchFilterData.pending, (state) => {
//       state.status = "loading";
//     });
//     builder.addCase(fetchFilterData.fulfilled, (state, action) => {
//       state.status = "succeeded";
//       state.data = action.payload;
//     });
//     builder.addCase(fetchFilterData.rejected, (state, action) => {
//       state.status = "failed";
//       state.error = action.error.message;
//     });
//   },
// });
// export { fetchFilterData };
// export default apiSlice.reducer;
