import customAxios from "../axios/custom";
import { useDispatch } from "react-redux";
import { setMedicalConditionData } from "../store/healthConcernSlice";
const cachedResponses = {};
export const getAllMedicalCondition = async () => {
  try {
    const response = await customAxios.post("/patient/master/condition", {
      paginate: 4,
      featured: "1",
    });
    const resData = await response?.data?.data?.result;
    console.log(resData, "im resData from services");
    return resData;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const getAllMedicalConditionList = async (id) => {
  console.log(id, "im id from services");
  try {
    if (cachedResponses[id]) {
      console.log("Returning cached response");
      return cachedResponses[id]; // Return cached response if it exists
    }
    const response = await customAxios.post("/patient/master/mapped", {
      paginate: 4,
      condition_id: id,
    });
    const resData = await response?.data?.data?.result;

    cachedResponses[id] = resData;
    return resData;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
