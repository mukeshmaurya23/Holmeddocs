import axios from "axios";
import { logout } from "../store/loginSlice";
import store from "../store/store";
const customAxios = axios.create({
  //baseURL: "http://192.168.1.35/holmeddoc",
  baseURL: "http://skyonliners.com/demo/holmeddoc",
  //"https://755b-110-227-197-199.ngrok-free.app/holemeddoc",
  headers: {
    "Content-Type": "application/json",

    // origin: "https://755b-110-227-197-199.ngrok-free.app/holemeddoc",
    // "Access-Control-Allow-Origin":
    //   "https://755b-110-227-197-199.ngrok-free.app/holemeddoc",
  },
});

customAxios.interceptors.request.use((config) => {
  config.headers.Authorization = `Basic YWRtaW46bXlwY290`;
  config.headers.platform = "web";
  config.headers["device-id"] = 14;
  config.headers["access-token"] = `${
    store?.getState()?.login?.remember_token
  }`;
  return config;
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(logout());
    }

    return Promise.reject(error);
  }
);

export default customAxios;
