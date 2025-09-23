export interface PasswordResetData {
    email: String;
    newPassword: String;
}

export interface ResetPasswordFormData {
    newPassword: string;
    confirmNewPassword: string;
}

export interface PasswordChangeData {
    email: String;
    oldPassword: String;
    newPassword: String;
}

export interface ChangePasswordFormData {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface AccountResponse {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  dateOfBirth: string; 
  gender: "MALE" | "FEMALE" | "OTHER"; 
  avatarUrl: string; 
}

export interface AccountRequest {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    dateOfBirth: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    avatarFile: File;
}