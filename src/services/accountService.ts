// src/services/accountService.ts
import { AccountRequest, PasswordChangeData, PasswordResetData } from "@/types/userinfo";
import api from "../api/api";
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

export interface Account {
  id: number;
  name: string;
  fullName: string;
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


export const getAccountById = async (id: number): Promise<Account | null> => {
  try {
    const res = await api.get(`/accounts/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Fetch account ${id} error:`, err);
    return null;
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
