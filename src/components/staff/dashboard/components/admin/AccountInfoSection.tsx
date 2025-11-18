// AccountInfoSection.tsx
"use client";
import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { Control } from "react-hook-form";
import { FormInput } from "../../../../../../common/FormInput";

interface AccountInfoSectionProps {
  control: Control<any>;
}

const AccountInfoSection: React.FC<AccountInfoSectionProps> = ({ control }) => {
  return (
    <Box flex={1}>
      <Typography variant="h6" gutterBottom>
        Thông tin tài khoản
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <FormInput control={control} name="fullName" label="Họ và tên" />
      <FormInput control={control} name="phoneNumber" label="Số điện thoại" />
      <FormInput control={control} name="email" label="Email" type="email" />
      <FormInput control={control} name="password" label="Mật khẩu" type="password" />
    </Box>
  );
};

export default AccountInfoSection;
