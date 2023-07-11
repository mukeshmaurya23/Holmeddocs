import { configureStore } from "@reduxjs/toolkit";
import mobileAppSlice from "./mobileAppSlice";
import loginSlice from "./loginSlice";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
//import filterApiSlice from "./filterApiSlice";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  mobileApp: mobileAppSlice,
  login: loginSlice,
  api: apiSlice,
  //filterapi: filterApiSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  window:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});

export default store;
