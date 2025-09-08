// services/api.ts
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL } from "../constants/api";

// Tạo instance axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

// Interceptor request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        if (process.env.NODE_ENV === "development") {
          console.log("🔑 Token gửi đi:", token);
        }
      }
    }
    return config;
  },  
  (error: AxiosError) => Promise.reject(error)
);

// Interceptor response
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("⛔ Unauthorized - cần đăng nhập lại");
    } else if (status === 403) {
      console.warn("⛔ Forbidden - không có quyền truy cập");
    } else {
      console.error(`🚨 Lỗi API [${status ?? "unknown"}]:`, error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
