import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://skyonliners.com/demo/holmeddoc",
  headers: {
    "Content-Type": "application/json",
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
