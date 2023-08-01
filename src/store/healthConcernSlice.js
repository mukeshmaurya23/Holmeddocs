import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllMedicalCondition,
  getAllMedicalConditionList,
} from "../services/services";

export const fetchAllMedicalConditionList = createAsyncThunk(
  "healthConcern/fetchMedicalConditionList",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoader(true));
      const res = await getAllMedicalConditionList(id);
      dispatch(setMedicalConditionListData(res));
      return res;
    } catch (error) {
      console.log(error.message);
      throw error;
    } finally {
      dispatch(setLoader(false));
    }
  }
);
const healthConcernSlice = createSlice({
  name: "healthConcern",
  initialState: {
    selectedItem: null,
    loader: false,
    medicalConditionData: [],
    medicalConditionListData: null,
  },
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem =
        state.selectedItem === action.payload ? null : action.payload;
    },
    setMedicalConditionData: (state, action) => {
      state.medicalConditionData = action.payload;
    },
    setMedicalConditionListData: (state, action) => {
      state.medicalConditionListData = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
});
export const {
  setSelectedItem,
  setMedicalConditionData,
  setMedicalConditionListData,
  setLoader,
} = healthConcernSlice.actions;
export const fetchAllMedicalCondition = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    const res = await getAllMedicalCondition();
    dispatch(setMedicalConditionData(res));
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatch(setLoader(false));
  }
};

export default healthConcernSlice.reducer;
