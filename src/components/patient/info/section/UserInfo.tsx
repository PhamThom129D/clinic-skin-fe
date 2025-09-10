// components/UserInfo.tsx
"use client";
import React from "react";
import { Box, Typography, Paper, Grid, Button, Avatar, Divider } from "@mui/material";
import { styled } from '@mui/system';
import { AuthResponse } from "@/types/auth";
import { EmergencyContact } from "@/types/userinfo"; 
import UserInfoRow from "./UserInfoRow";

  // Dữ liệu mẫu cho Liên hệ khẩn cấp
  const dummyEmergencyContact: EmergencyContact = {
    emergency_id: 1,
    contact_name: "Nguyễn Văn A",
    contact_phone: "0912345678",
    patient_id: 101,
  };

interface UserInfoProps {
  account: AuthResponse;
  emergencyContact?: EmergencyContact;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  minHeight: "100%",
}));

const UserInfo: React.FC<UserInfoProps> = ({ account, emergencyContact }) => {
  const getGenderText = (gender: string) => {
    switch (gender) {
      case "FEMALE":
        return "Nữ";
      case "MALE":
        return "Nam";
      case "OTHER":
        return "Khác";
      default:
        return "Chưa cập nhật";
    }
  };

  const infoFields = [
    { label: "Họ và tên", value: account?.fullName },
    { label: "Số điện thoại", value: account?.phoneNumber },
    { label: "Giới tính", value: getGenderText(account?.gender) },
    { label: "Ngày sinh", value: account?.dateOfBirth },
    { label: "Email", value: account?.email },
    { label: "Địa chỉ", value: account?.address },
  ];

  const emergencyFields = [
    { label: "Họ tên", value: dummyEmergencyContact.contact_name },
    { label: "Số điện thoại", value: dummyEmergencyContact.contact_phone },
  ];

  if (!account) {
    return null;
  }

  return (
    <Box
      sx={{
        p: 1.5,
        bgcolor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <StyledPaper elevation={3}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold">
            Thông tin cá nhân
          </Typography>
        </Box>
        
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "33%" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              src={account.avatarUrl}
              alt={account.fullName}
              sx={{ width: 120, height: 120, border: "2px solid #ccc" }}
            />
          </Box>
          
          <Box sx={{ flexGrow: 1, width: { xs: "100%", md: "67%" } }}>
            {infoFields.map((field, index) => (
              <UserInfoRow
                key={`info-${index}`}
                label={field.label}
                value={field.value}
                isLast={false}
              />
            ))}
            
            <>
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 4, mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
                Liên hệ khẩn cấp
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {emergencyFields.map((field, index) => (
                <UserInfoRow
                  key={`emergency-${index}`}
                  label={field.label}
                  value={field.value}
                  isLast={index === emergencyFields.length - 1}
                />
              ))}
            </>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button variant="contained" color="primary">
                Chỉnh sửa thông tin
              </Button>
            </Box>
          </Box>
        </Grid>
      </StyledPaper>
    </Box>
  );
};

export default UserInfo;