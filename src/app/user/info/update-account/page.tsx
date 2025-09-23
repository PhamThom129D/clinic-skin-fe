"use client";

import { Box, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { AuthResponse } from "@/types/auth";
import { AccountResponse } from "@/types/userinfo";
import UserInfoUpdate from "@/components/patient/info/layout/UserInfoUpdate";
import { useRouter } from "next/navigation";

export default function Page() {
  const { account, setAccount } = useUser();
  const router = useRouter();

  const handleUpdateSuccess = (updatedFormData: AccountResponse) => {
    // setAccount({
    //   ...(account as AuthResponse),
    //   avatarUrl: updatedFormData.avatarUrl,
    //   fullName: updatedFormData.fullName,
    //   phoneNumber: updatedFormData.phoneNumber,
    //   email: updatedFormData.email,
    //   address: updatedFormData.address,
    //   dateOfBirth: updatedFormData.dateOfBirth,
    //   gender: updatedFormData.gender,
    // });
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

  const formData: AccountResponse = mapToFormData(account);

  return (
    <UserInfoUpdate
      formData={formData}
      onBackClick={handleBackClick}
      onUpdateSuccess={handleUpdateSuccess}
    />
  );
}
