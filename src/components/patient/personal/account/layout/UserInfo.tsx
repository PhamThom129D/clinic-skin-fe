"use client";
import React from "react";
import { Box, Typography, Paper, Grid, Button, Avatar, Divider } from "@mui/material";
import { styled } from '@mui/system';
import { AuthResponse } from "@/types/auth";
import UserInfoRow from "../section/UserInfoRow";
import StyledPaper from "../../../../../../common/StyledPaper";

interface UserInfoProps {
  account: AuthResponse;
  onEditClick: () => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ account, onEditClick }) => {
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

  if (!account) {
    return null;
  }

  const renderFields = (fields: { label: string; value?: string }[], prefix: string) =>
  fields.map((field, index) => (
    <UserInfoRow
      key={`${prefix}-${index}`}
      label={field.label}
      value={field.value ?? ""}
      isLast={index === fields.length - 1}
    />
  ));


  return (
      <StyledPaper elevation={3}>
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
              src={account?.avatarUrl || '/avatars/default-avatar.png'}
              alt={account?.fullName || 'Người dùng'} 
              sx={{ width: 120, height: 120, border: "2px solid #ccc" }}
          />
          </Box>
          
          <Box sx={{ flexGrow: 1, width: { xs: "100%", md: "67%" } }}>
            {renderFields(infoFields, 'info')}
            
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button variant="contained" color="primary" onClick={onEditClick}>
                Chỉnh sửa thông tin
              </Button>
            </Box>  
          </Box>
        </Grid>
      </StyledPaper>
  );
};

export default UserInfo;