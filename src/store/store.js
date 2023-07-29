import { configureStore } from "@reduxjs/toolkit";
import mobileAppSlice from "./mobileAppSlice";
import loginSlice from "./loginSlice";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import dataSlice from "./LocSpecSlice";
import searchSlice from "./searchSlice";
//import filterApiSlice from "./filterApiSlice";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  mobileApp: mobileAppSlice,
  login: loginSlice,

  api: apiSlice,
  data: dataSlice,
  search: searchSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  window:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});

export default store;


// import { configureStore } from "@reduxjs/toolkit";
// import mobileAppSlice from "./mobileAppSlice";
// import loginSlice from "./loginSlice";
// import thunk from "redux-thunk";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { combineReducers } from "@reduxjs/toolkit";
// import apiSlice from "./apiSlice";
// import dataSlice from "./LocSpecSlice";
// import searchReducer from "./searchSlice";

// const persistConfig = {
//   key: "login",
//   storage,
// };

// const rootReducer = combineReducers({
//   mobileApp: mobileAppSlice,
//   login: loginSlice,
//   api: apiSlice,
//   data: dataSlice,
//   search: searchReducer,
// });


// const persistedLoginReducer = persistReducer(persistConfig, rootReducer.login);

// const store = configureStore({
//   reducer: {
//     mobileApp: mobileAppSlice,
//     login: persistedLoginReducer, 
//     api: apiSlice,
//     data: dataSlice,
//     search: searchReducer,
//   },
//   window:
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__(),
// });

// export default store;
