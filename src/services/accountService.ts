// src/services/accountService.ts

import { AccountRequest, PasswordChangeData, PasswordResetData } from "@/types/userinfo";
import api from "../api/api";


export const resetPassword = (data: PasswordResetData) => {
  return api.post('/accounts/reset-password', data);
}

export const changePassword = (data: PasswordChangeData) => {
  return api.post('/accounts/change-password', data)
}

export const updateInfo = (data: AccountRequest) => {
  return api.post('/accounts/update-info', data);
}

export interface Account {
  id: number;
  name: string;
  fullName: string;
  email: string;
  role: string;
}

export const getListAccounts = async (): Promise<Account[]> => {
  try {
    const res = await api.get("/accounts");
    return res.data;
  } catch (err) {
    console.error("Fetch accounts error:", err);
    return [];
  }
};

export const getAccountById = async (id: number): Promise<Account | null> => {
  try {
    const res = await api.get(`/accounts/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Fetch account ${id} error:`, err);
    return null;
  }
};