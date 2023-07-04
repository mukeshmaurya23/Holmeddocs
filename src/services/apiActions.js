// import customAxios from "../axios/custom";
// import {
//   FETCH_DATA_SUCCESS,
//   FETCH_DATA_FAILURE,
//   FETCH_DATA_REQUEST,
// } from "./actionTypes";

// export const apiActions = async (url) => {
//   return (dispatch) => {
//     dispatch({ type: FETCH_DATA_REQUEST });
//     customAxios
//       .post(url)
//       .then((response) => {
//         const data = response.data;
//         dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
//       })
//       .catch((error) => {
//         const errorMsg = error.message;
//         dispatch({ type: FETCH_DATA_FAILURE, payload: errorMsg });
//       });
//   };
// };
