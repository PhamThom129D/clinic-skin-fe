"use client";

import { Box, Typography } from "@mui/material";
import ChangePassword from "@/components/patient/info/layout/ChangePassword";
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
        <Typography>Bạn chưa đăng nhập. Vui lòng đăng nhập để truy cập trang này.</Typography>
      </Box>
    );
  }

  return (
    <ChangePassword onBackClick={handleBackClick} />
  );
}