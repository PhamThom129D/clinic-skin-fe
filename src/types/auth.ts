// src/types/auth.ts
export interface LoginRequest {
  emailOrPhone: string;
  password?: string;
  otpCode?: string;
  googleToken?: string;
}

export interface AuthResponse {
  token: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // BE trả LocalDate, FE nhận string
  address: string;
  gender: string;
  avatarUrl: string;
  status: string;
  roles: string[];
}
