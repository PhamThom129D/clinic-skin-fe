// src/app/user/info/update-account/page.tsx
"use client";

import { Box, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { AuthResponse } from "@/types/auth";
import { EmergencyContact } from "@/types/userinfo";
import UserInfoUpdate from "@/components/patient/info/layout/UserInfoUpdate";
import { useRouter } from "next/navigation";

export default function Page() {
  const { account, setAccount } = useUser();
  const router = useRouter();
  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact | null>(null);

  useEffect(() => {
    if (account) {
      const dummyEmergencyContact: EmergencyContact = {
        emergency_id: 1,
        contact_name: "Phạm T",
        contact_phone: "0397464805",
        patient_id: 101,
      };
      setEmergencyContact(dummyEmergencyContact);
    }
  }, [account]);

  const handleUpdateSuccess = (updatedAccount: AuthResponse, updatedEmergencyContact: EmergencyContact) => {
    setAccount(updatedAccount); // Cập nhật state toàn cục
    router.push("/user/info"); // Điều hướng quay lại trang thông tin
  };
  
  const handleBackClick = () => {
    router.push("/user/info");
  };

  if (!account) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <Typography>Đang tải thông tin...</Typography>
      </Box>
    );
  }

  return (
    <UserInfoUpdate
      account={account}
      emergencyContact={emergencyContact}
      onBackClick={handleBackClick}
      onUpdateSuccess={handleUpdateSuccess}
    />
  );
}