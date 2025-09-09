"use client";
import React from "react";
import { Box, Typography, Paper, Grid, Button, Avatar } from "@mui/material";
import { styled } from '@mui/system';
import { AuthResponse } from "@/types/auth";
import UserInfoRow from "./UserInfoRow";

interface UserInfoProps {
  account: AuthResponse;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  minHeight: "100%",
}));

const UserInfo: React.FC<UserInfoProps> = ({ account }) => {
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
    { label: "Họ và tên", value: account.fullName },
    { label: "Số điện thoại", value: account.phoneNumber },
    { label: "Giới tính", value: getGenderText(account.gender) },
    { label: "Ngày sinh", value: account.dateOfBirth },
    { label: "Email", value: account.email },
    { label: "Địa chỉ", value: account.address },
  ];

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

        {/* Layout avatar + info */}
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Avatar */}
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

          {/* Info section */}
          <Box sx={{ flexGrow: 1, width: { xs: "100%", md: "67%" } }}>
            {infoFields.map((field, index) => (
              <UserInfoRow
                key={index}
                label={field.label}
                value={field.value}
                isLast={index === infoFields.length - 1}
              />
            ))}
            
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