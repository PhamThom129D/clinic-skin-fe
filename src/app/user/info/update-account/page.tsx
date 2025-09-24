"use client";

import { Box, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { AuthResponse } from "@/types/auth";
import UserInfoUpdate from "@/components/patient/info/layout/UserInfoUpdate";
import { useRouter } from "next/navigation";
import { AccountRequest } from "@/types/userinfo";
import { updateInfo } from "@/services/accountService";

export default function Page() {
  const { account, setAccount } = useUser();
  const router = useRouter();

  const handleUpdateSuccess = async (data: AccountRequest) => {
    
    await updateInfo(data);
    router.push("/user/info");
  };

  const handleBackClick = () => {
    router.push("/user/info");
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
