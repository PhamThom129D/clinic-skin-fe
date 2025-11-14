// src/components/patient/personal/account/section/UserInfoUpdate.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { notifySuccess, notifyWarning } from "@/utils/toast";
import AvatarUpload from "@/components/common/AvatarUpload";
import GenderSelect from "@/components/common/GenderSelect";
import { FormInput } from "../../../../common/FormInput";
import ButtonPrimary from "../../../../common/ButtonPrimary";
import { emailRule, fullNameRule, phoneNumberRule, addressRule, dateOfBirthRule, formatDateForInput
} from "@/utils/validation/validators";
import StyledPaper from "@/components/common/StyledPaper";
import { AuthResponse } from "@/types/auth";
import { AccountRequest } from "@/types/userinfo";
import { mapToAccountRequest } from "@/utils/accountMappers";

export interface UserInfoUpdateProps {
  account: AuthResponse;
  onBackClick: () => void;
  onUpdateSuccess: (data: AccountRequest) => void;
}

const UserInfoUpdate: React.FC<UserInfoUpdateProps> = ({ account, onBackClick, onUpdateSuccess }) => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(account.avatarUrl);
    const [gender, setGender] = useState<AccountRequest["gender"] | "">("");
  

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthResponse>();

useEffect(() => {
  if (account) {
    reset({
      ...account,
      dateOfBirth: account.dateOfBirth ? formatDateForInput(account.dateOfBirth) : ""
    });
  }
}, [account, reset]);

  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
    setAvatarPreview(file ? URL.createObjectURL(file) : null);
  };

const handleUpdateSubmit: SubmitHandler<AuthResponse> = async (formData) => {
  try {
    const requestData = mapToAccountRequest(formData, avatarFile ?? undefined);
    onUpdateSuccess(requestData);
    notifySuccess("Cập nhật thông tin thành công!");
  } catch (err) {
    notifyWarning("Cập nhật thông tin thất bại.");
  }
};

  return (
    <Box sx={{ bgcolor: "#f0f2f5" }}>
      <StyledPaper elevation={3}>
        <form onSubmit={handleSubmit(handleUpdateSubmit)}>
          <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
            <AvatarUpload preview={avatarPreview} onChange={handleAvatarChange} />
          </Box>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
            gap={2}
          >
            <FormInput name="fullName" control={control} label="Họ và tên" rules={fullNameRule} />
            <FormInput name="address" control={control} label="Địa chỉ" rules={addressRule} />
            <FormInput name="email" control={control} label="Email" rules={emailRule} />
            <FormInput name="phoneNumber" control={control} label="Số điện thoại" rules={phoneNumberRule} />
            <FormInput
              name="dateOfBirth"
              control={control}
              label="Ngày sinh"
              type="date"
              rules={dateOfBirthRule}
            />

            <Controller
              name="gender"
              control={control}
              defaultValue="OTHER"
              render={({ field, fieldState: { error } }) => (
                <GenderSelect
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Box>

          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <Button variant="outlined" color="primary" sx={{ flex: 1 }} onClick={onBackClick}>
              Hủy
            </Button>
            <ButtonPrimary
              type="submit"
              sx={{
                flex: 1,
                py: 1.5,
                fontSize: "0.95rem",
                borderRadius: 1,
                background: "linear-gradient(135deg, #64ce82, #4caf50)",
                "&:hover": {
                  background: "linear-gradient(135deg, #4caf50, #388e3c)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(100, 206, 130, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Cập nhật thông tin
            </ButtonPrimary>
          </Box>
        </form>
      </StyledPaper>
    </Box>
  );
};

export default UserInfoUpdate;
