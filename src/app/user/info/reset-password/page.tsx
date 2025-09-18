"use client";

import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import ResetPassword from "@/components/patient/info/layout/ResetPassword";

export default function Page() {
  const router = useRouter();
  const { account } = useUser();
  
  if (!account) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>Đang tải thông tin...</Typography>
      </Box>
    );
  }

  return (
    <ResetPassword account={account} />
  );
}
