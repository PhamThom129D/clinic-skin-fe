//personal/account/update-account
"use client";

import { Box, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { AuthResponse } from "@/types/auth";
import UserInfoUpdate from "@/components/patient/personal/account/layout/UserInfoUpdate";
import { useRouter } from "next/navigation";
import { AccountRequest } from "@/types/userinfo";
import { updateInfo } from "@/services/accountService";
import { notifyError } from "@/utils/toast";
import { format } from "path";
import { formatDateForInput, formatDateToDisplay } from "@/utils/validation/validators";

export default function Page() {
  const { account, setAccount } = useUser();
  const router = useRouter();

  const handleUpdateSuccess = async (data: AccountRequest) => {
     try {
        const accountResponse = await updateInfo(data); 
                console.log(">>> [DEBUG] AccountResponse (Từ API):", accountResponse);

        const updatedAccountData: AuthResponse = {
            ...account,             
            ...accountResponse, 
            roles: Array.from(accountResponse.roles),
            avatarUrl: accountResponse.avtPath,
            dateOfBirth: accountResponse.dateOfBirth ? formatDateToDisplay(accountResponse.dateOfBirth) : ""
        };
                        console.log(">>> [DEBUG] AccountResponse (Từ API):", updatedAccountData);

        setAccount(updatedAccountData); 
        router.push("/user/personal");
  } catch (error: any) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      let errorMessage = "Cập nhật thất bại. Vui lòng thử lại.";
      if (error.response && error.response.data) {
        // Lỗi validation 400 (Bad Request)
        if (error.response.status === 400 && error.response.data.message) {
            errorMessage = error.response.data.message; 
        }
        // Lỗi khác (500 Internal Server Error, 403 Forbidden, v.v.)
        else if (error.response.data.error || error.response.data.title) {
          errorMessage = error.response.data.error || error.response.data.title;
        }
      }
      notifyError(errorMessage);
    }
};

  const handleBackClick = () => {
    router.push("/user/personal");
  };

  if (!account) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Typography>Đang tải thông tin...</Typography>
      </Box>
    );
  }

  return (
    <UserInfoUpdate
      account={ account}
      onBackClick={handleBackClick}
      onUpdateSuccess={handleUpdateSuccess}
    />
  );
}
