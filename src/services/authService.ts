// src/services/authService.ts
import api from "../api/api";
import { LoginRequest, AuthResponse } from "../types/auth";
import { RegisterRequest } from "../types/user";

// ---- LOGIN ----
export const login = (data: Pick<LoginRequest, "emailOrPhone" | "password">) => {
  return api.post<AuthResponse>("/auth/login", data);
};

// ---- LOGIN GOOGLE ----
export const loginWithGoogle = (googleToken: string) => {
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
export const register = (data: RegisterRequest) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return api.post<AuthResponse>("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ---- LOGOUT ----
export const logout = () => {
  return api.get("/auth/logout");
};
