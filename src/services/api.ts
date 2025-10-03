// services/api.ts
import axios, { AxiosInstance } from "axios";

const USERNAME = "admin";  // đổi theo user muốn dùng
const PASSWORD = "123456";  // đổi theo password

// Encode Base64 cho Basic Auth
const basicToken = btoa(`${USERNAME}:${PASSWORD}`);

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:1209/api",
  timeout: 8000,
  withCredentials: true,
  headers: {
    Authorization: `Basic ${basicToken}`,
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    if (status === 401) {
      console.warn("⛔ Unauthorized - kiểm tra username/password");
    } else if (status === 403) {
      console.warn("⛔ Forbidden - không có quyền truy cập");
    } else {
      console.error("🚨 Lỗi API:", err.message);
    }
    return Promise.reject(err);
  }
);

export default api;
