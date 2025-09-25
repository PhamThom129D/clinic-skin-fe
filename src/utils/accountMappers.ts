// utils/accountMappers.ts
import { AuthResponse } from "@/types/auth";
import { AccountRequest } from "@/types/userinfo";
import { formatDateToDisplay } from "./validation/validators";

export const mapToAccountRequest = (
  account: AuthResponse,
  avatarFile?: File
): AccountRequest => ({
  id: account.id,
  fullName: account.fullName,
  email: account.email,
  phoneNumber: account.phoneNumber,
  address: account.address,
  dateOfBirth: account.dateOfBirth ? formatDateToDisplay(account.dateOfBirth) : "",
  gender: account.gender as AccountRequest["gender"],
  role: account.roles[0],
  avatarFile,
});

export const buildFormData = (data: AccountRequest): FormData => {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("address", data.address);
  formData.append("dateOfBirth", data.dateOfBirth);
  formData.append("gender", data.gender);
  formData.append("role", data.role || "");
  if (data.avatarFile) {
    formData.append("avatarFile", data.avatarFile);
  }
  return formData;
};
