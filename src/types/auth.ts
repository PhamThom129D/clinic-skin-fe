// src/types/auth.ts
export interface LoginRequest {
  emailOrPhone: string;
  password: string;
  rememberMe?: boolean; // thêm optional
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

export interface RegisterFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  dateOfBirth: string; // gửi dạng "dd-MM-yyyy" (theo @JsonFormat)
  gender: "MALE" | "FEMALE" | "OTHER"; // Enum Gender bên backend
  status?: "ACTIVE" | "INACTIVE" | "BANNED"; // Enum AccountStatus (nếu cần gửi)
  avatarFile?: File; // File upload từ input type="file"
  role: string;
}
