import axios from "axios";
import useAuthStore from "@/store/authStore";
const baseURL = "https://api.etracademy.com/api";
const devBaseURL = "http://localhost:4000/api";
const Status = "Dev";
const api = axios.create({
  baseURL: Status === "Prod" ? baseURL : devBaseURL,
  withCredentials: true,
});

const prodImageBaseURL = "https://api.etracademy.com";
const devImageBaseURL = "http://localhost:4000";

export const ImageUrl = Status === "Prod" ? prodImageBaseURL : devImageBaseURL;

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
