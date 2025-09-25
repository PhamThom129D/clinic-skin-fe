// src/services/accountService.ts

import { AccountRequest, PasswordChangeData, PasswordResetData } from "@/types/userinfo";
import api from "../api/api";
import { AuthResponse } from "@/types/auth";
import { buildFormData } from "@/utils/accountMappers";

export const resetPassword = (data: PasswordResetData) => {
    return api.put('/accounts/reset-password', data);
}

export const changePassword = (data: PasswordChangeData) => {
    return api.put(`/accounts/change-password`, data)
}

export const deleteAccount = (id: number) => {
    return api.delete(`/accounts/${id}`);
}


export const updateInfo = async (data: AccountRequest) => {
  const formData = buildFormData(data);
  console.log("data gui len");
  console.log("--- Nội dung chi tiết của FormData ---");
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
  console.log("---------------------------------------");
  const response = await api.put(`/accounts/${data.id}`, formData);
  return response.data;
};


