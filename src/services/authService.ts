// src/services/authService.ts
import api from "../api/api";
import { LoginRequest, AuthResponse } from "../types/auth";
import { RegisterRequest } from "../types/user";

// ---- LOGIN ----
export const login = (data: Pick<LoginRequest, "emailOrPhone" | "password">) => {
  return api.post<AuthResponse>("/auth/login", data);
};
// ---- LOGIN WITH GOOGLE ----

export const loginWithGoogle = (googleToken: string) => {
  // gửi token lên backend, backend trả về AuthResponse
  return api.post<AuthResponse>("/auth/login-google", { token: googleToken });
};


// ---- LOGIN OTP ----
export const loginWithOtp = (emailOrPhone: string) => {
  return api.post("/auth/login-otp", { emailOrPhone });
};

// ---- VERIFY OTP ----
export const verifyOtp = (data: Pick<LoginRequest, "emailOrPhone" | "otpCode">) => {
  return api.post<AuthResponse>("/auth/verify-otp", data);
};

// ---- RESEND OTP ----
export const resendOtp = (emailOrPhone: string) => {
  return api.post("/auth/resend-otp", { emailOrPhone });
};


// ---- REGISTER ----
export const register = async (data: RegisterRequest) => {
  const formData = new FormData();

  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("address", data.address);

  // dateOfBirth giữ nguyên yyyy-MM-dd
  formData.append("dateOfBirth", data.dateOfBirth);

  // gender in hoa: MALE/FEMALE/OTHER
  formData.append("gender", data.gender);

  formData.append("status", data.status ?? "ACTIVE");
  formData.append("role", data.role);

  if (data.avatarFile) {
    formData.append("avatarFile", data.avatarFile);
  }

  return api.post("/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


// ---- LOGOUT ----
export const logout = () => {
  return api.get("/auth/logout");
};
