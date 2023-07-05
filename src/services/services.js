import customAxios from "../axios/custom";

export const getAllMedicalCondition = async () => {
  try {
    const response = await customAxios.post("/patient/master/condition", {
      paginate: 4,
      featured: 1,
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
    const response = await customAxios.post("/patient/master/mapped", {
      paginate: 4,
      condition_id: id,
    });
    const resData = await response?.data?.data?.result;
    console.log(resData, "im resData from services");
    return resData;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
