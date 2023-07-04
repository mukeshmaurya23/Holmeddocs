import axios from "axios";

const customAxios = axios.create({
  //baseURL: "http://192.168.1.35/holmeddoc",
  baseURL:
    "http://skyonliners.com/demo/holmeddoc" || "http://192.168.1.35/holmeddoc",
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
  return config;
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
