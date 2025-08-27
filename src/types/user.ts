// src/types/user.ts
export interface RegisterRequest {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  address: string;
  dateOfBirth: string; // "dd-MM-yyyy"
  gender: string;
  status: string;
  role: string;
  avatarFile?: File; // FE gửi multipart/form-data
}
