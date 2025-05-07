import axios from "axios";
import useAuthStore from "@/store/authStore";

const api = axios.create({
  baseURL: "https://24.199.124.67:4000/api",
});

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
