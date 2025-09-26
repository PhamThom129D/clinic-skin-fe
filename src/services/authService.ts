// src/services/authService.ts
import api from "../api/api";
import { LoginRequest, AuthResponse, RegisterFormData } from "../types/auth";

// ---- LOGIN ----
export const login = (data: Pick<LoginRequest, "emailOrPhone" | "password">) => {
  return api.post<AuthResponse>("/auth/login", data);
};
// ---- LOGIN WITH GOOGLE ----

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


import { AxiosResponse } from "axios";



export const register = async (data: RegisterFormData): Promise<AuthResponse> => {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("address", data.address);
  formData.append("dateOfBirth", data.dateOfBirth);
  formData.append("gender", data.gender);
  formData.append("status", data.status ?? "ACTIVE");
  formData.append("role", data.role);

  if (data.avatarFile) {
    formData.append("avatarFile", data.avatarFile);
  }

  const response: AxiosResponse<AuthResponse> = await api.post("/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data; // trả về data trực tiếp
};


// src/services/authService.ts
export const logoutClient = async () => {
  try {
    await api.post("/auth/logout").catch(() => { });
  } catch (err) {
    console.warn("Logout API error:", err);
  }

  localStorage.removeItem("authToken");
  localStorage.removeItem("account");
  localStorage.removeItem("userRole");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("account");
  sessionStorage.removeItem("userRole");

  localStorage.removeItem("chatKey");
  localStorage.removeItem("guestId");
  sessionStorage.removeItem("chatKey");
  sessionStorage.removeItem("guestId");


  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("authChange"));
    window.location.href = "/auth";
  }
};




