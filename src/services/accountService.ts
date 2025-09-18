// src/services/accountService.ts

import { PasswordChangeData, PasswordResetData } from "@/types/userinfo";
import api from "../api/api";


export const resetPassword = (data: PasswordResetData) => {
    return api.post('/accounts/reset-password', data);
}

export const changePassword = (data: PasswordChangeData) => {
    return api.post('/accounts/change-password', data)
}