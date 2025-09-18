export interface EmergencyContact {
    emergency_id: number;
    contact_name: string;
    contact_phone: string;
    patient_id: number;
}

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