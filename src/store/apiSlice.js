import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "../axios/custom";


const initialState = {
  loading: false,
  data: null,
  insuranceData: null,
  filterInsuranceData: null,
  stateData: null,
  filterStateData: null,
  cityData: null,
  filterCityData: null,
  zipCodeData: null,
  filterZipCodeData: null,
  error: "",
  status: "idle",
  insuranceStatus: "idle",
  stateStatus: "idle",
  cityStatus: "idle",
  zipCodeStatus: "idle",
  slot_avialability: null,
  slot_avialability_status: "idle",
  slot_avialability_error: "",
  bookAppointmentDoctorData: null,
  bookAppointmentDoctorDataStatus: "idle",
  bookAppointmentDoctorDataError: "",
  getDoctorsData: null,
  getDoctorsDataStatus: "idle",
  getDoctorsDataError: "",
  getAllDoctorsData: null,
  getAllDoctorsDataStatus: "idle",
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

const fetchCityData = createAsyncThunk(
  "api/fetchCityData",
  async ({ url, state_id }) => {
    try {
      if (state_id) {
        const response = await customAxios.post(url, { state_id });
        const resData = await response.data.data.result;
        return resData;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return error.message;
    }
  }
);

const fetchZipCodeData = createAsyncThunk(
  "api/fetchZipCodeData",
  async ({ url, state_id, city_id }) => {
    try {
      if (state_id && city_id) {
        const response = await customAxios.post(url, {
          state_id,
          city_id,
        });
        const resData = await response.data.data.result;
        return resData;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return error.message;
    }
  }
);

export const fetchSlotAvialability = createAsyncThunk(
  "api/fetchSlotAvialability",
  async ({ url, timeSlotDate, doctorId }) => {
    const response = await customAxios.post(url, {
      doctor_id: doctorId,
      time_slot_date: timeSlotDate,
    });
    const resData = response.data.data.result;
    return resData;
  }
);

export const fetchDoctorsData = createAsyncThunk(
  "api/fetchDoctorsData",
  async ({ url, featured }) => {
    const response = await customAxios.post(url, {
      featured,
    });
    const resData = response.data.data.result;
    return resData;
  }
);

export const fetchAllDoctorsData = createAsyncThunk(
  "api/fetchAllDoctorsData",
  async (url) => {
    const response = await customAxios.post(url);
    const resData = await response.data
    return resData;
  }
)
export const book_appointment_DoctorData = createAsyncThunk(
  "api/book_appointment_DoctorData",
  async (id) => {
    try {
      const response = await customAxios.post("/patient/book_appointment", {
        doctor_id: id,
      });
      return response?.data?.data?.result || [];
    } catch (error) {
      console.error("Error while fetching search results:", error);
      return [];
    }
  }
);

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
      state.filterInsuranceData = action.payload;
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
      state.filterStateData = action.payload;
    });
    builder.addCase(fetchStateData.rejected, (state, action) => {
      state.stateStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchCityData.pending, (state) => {
      state.cityStatus = "loading";
    });
    builder.addCase(fetchCityData.fulfilled, (state, action) => {
      state.cityStatus = "succeeded";
      state.cityData = action.payload;
      state.filterCityData = action.payload;
    });
    builder.addCase(fetchCityData.rejected, (state, action) => {
      state.cityStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchZipCodeData.pending, (state) => {
      state.zipCodeStatus = "loading";
    });
    builder.addCase(fetchZipCodeData.fulfilled, (state, action) => {
      state.zipCodeStatus = "succeeded";
      state.zipCodeData = action.payload;
      state.filterZipCodeData = action.payload;
    });
    builder.addCase(fetchZipCodeData.rejected, (state, action) => {
      state.zipCodeStatus = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchSlotAvialability.pending, (state) => {
      state.slot_avialability_status = "loading";
    });
    builder.addCase(fetchSlotAvialability.fulfilled, (state, action) => {
      state.slot_avialability_status = "succeeded";
      state.slot_avialability = action.payload;
    });
    builder.addCase(fetchSlotAvialability.rejected, (state, action) => {
      state.slot_avialability_status = "failed";
      state.slot_avialability_error = action.error.message;
    });
    builder.addCase(book_appointment_DoctorData.pending, (state) => {
      state.bookAppointmentDoctorDataStatus = "loading";
    });
    builder.addCase(book_appointment_DoctorData.fulfilled, (state, action) => {
      state.bookAppointmentDoctorDataStatus = "succeeded";
      state.bookAppointmentDoctorData = action.payload;
    });
    builder.addCase(book_appointment_DoctorData.rejected, (state, action) => {
      state.bookAppointmentDoctorDataStatus = "failed";
      state.bookAppointmentDoctorDataError = action.error.message;
    });
    builder.addCase(fetchDoctorsData.pending, (state) => {
      state.getDoctorsDataStatus = "loading";
    });
    builder.addCase(fetchDoctorsData.fulfilled, (state, action) => {
      state.getDoctorsDataStatus = "succeeded";
      state.getDoctorsData = action.payload;
    });
    builder.addCase(fetchDoctorsData.rejected, (state, action) => {
      state.getDoctorsDataStatus = "failed";
      state.getDoctorsDataError = action.error.message;
    });

    builder.addCase(fetchAllDoctorsData.pending, (state, action) => {
      state.getAllDoctorsDataStatus = "loading"
    });
    builder.addCase(fetchAllDoctorsData.fulfilled, (state, action) => {
      state.getAllDoctorsDataStatus = "succeeded";
      state.getAllDoctorsData = action.payload;
    });
  },
});

export {
  fetchData,
  fetchInsuranceData,
  fetchStateData,
  fetchCityData,
  fetchZipCodeData,
};
export default apiSlice.reducer;
