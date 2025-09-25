// src/services/accountService.ts
import { AccountRequest, PasswordChangeData, PasswordResetData } from "@/types/userinfo";
import api from "../api/api"; // axios instance có sẵn
import axios from "axios";

export const resetPassword = (data: PasswordResetData) => {
  return api.post("/accounts/reset-password", data);
};

export const changePassword = (data: PasswordChangeData) => {
  return api.post("/accounts/change-password", data);
};

export const updateInfo = (data: AccountRequest) => {
  return api.post("/accounts/update-info", data);
};

export interface Account {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const getListAccounts = async (): Promise<Account[]> => {
  try {
    const res = await api.get("/accounts?roles=ROLE_PATIENT");
    return res.data;
  } catch (err) {
    console.error("Fetch accounts error:", err);
    return [];
  }
};


export const createAccount = async (formData: FormData) => {
  const res = await api.post("/accounts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
// Cập nhật account theo id
export const updateAccount = async (id: number, formData: FormData) => {
  const res = await api.put(`/accounts/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
// Lấy account theo id
export const getAccountById = async (id: number) => {
  const res = await api.get(`/accounts/${id}`);
  return res.data;
};
