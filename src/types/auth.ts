// src/types/auth.ts
export interface LoginRequest {
  emailOrPhone: string;
  password: string;
  rememberMe?: boolean; 
  otpCode?: string;
  googleToken?: string;
}
export type FieldErrorResponse = {
  field: keyof RegisterFormData;
  message: string;
};

export interface AuthResponse {
  token: string;
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; 
  address: string;
  gender: string;
  avatarUrl: string;
  status: string;
  roles: string[];
}


export interface RegisterFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  dateOfBirth: string; 
  gender: "MALE" | "FEMALE" | "OTHER"; 
  status?: "Active" | "Inactive" | "Banned"; 
  avatarFile?: File; 
  role: string;
}

