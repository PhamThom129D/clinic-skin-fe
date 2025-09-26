"use client";

import { Box, Typography } from "@mui/material";
import ChangePassword from "@/components/patient/personal/account/layout/ChangePassword";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function Page() {
  const router = useRouter();
  const { account } = useUser();

  const handleBackClick = () => {
    router.back();
  };
  
  if (!account) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>Đang tải thông tin...</Typography>
      </Box>
    );
  }

  return <ChangePassword account={account}/>;
}