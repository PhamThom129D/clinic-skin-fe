"use client";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Box, Paper } from "@mui/material";

import InputField from "@/components/common/InputField";
import GenderSelect from "@/components/common/GenderSelect";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import AvatarUpload from "@/components/common/AvatarUpload";
import { notifyWarning } from "@/utils/toast";
import { RegisterFormData } from "@/types/auth";

import {
  emailRule,
  passwordRule,
  confirmPasswordRule,
  fullNameRule,
  phoneNumberRule,
  addressRule,
  dateOfBirthRule,
} from "@/utils/validation/validators";

type RegisterFormProps = {
  onSubmit: (data: RegisterFormData) => Promise<void>;
};

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const { control, handleSubmit, watch, setError, formState: { errors } } =
    useForm<RegisterFormData>();
  const password = watch("password");

  const [gender, setGender] = useState<RegisterFormData["gender"] | "">("");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
    setAvatarPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleFinalSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    if (!data.email && !data.phoneNumber) {
      setError("email", {
        type: "manual",
        message: "Vui lòng nhập email hoặc số điện thoại.",
      });
      setError("phoneNumber", {
        type: "manual",
        message: "Vui lòng nhập email hoặc số điện thoại.",
      });
      return;
    }

    const formattedData: RegisterFormData = {
      ...data,
      gender: gender as RegisterFormData["gender"],
      avatarFile: avatarFile ?? undefined,
      role: "PATIENT",
    };

    try {
      await onSubmit(formattedData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Đăng ký thất bại";
      notifyWarning(errorMessage);
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: { xs: 3, md: 6 },
        maxWidth: 900,
        margin: "auto",
        mt: 6,
        borderRadius: 3,
        backgroundColor: "#ffffff",
  
      }}
    >
      <form onSubmit={handleSubmit(handleFinalSubmit)}>
        {/* Avatar */}
        <Box display="flex" justifyContent="center" mb={4}>
          <AvatarUpload preview={avatarPreview} onChange={handleAvatarChange} />
        </Box>

        {/* Grid container */}
      <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={3}>
  {/* Cột trái */}
  <Box display="flex" flexDirection="column" gap={2}>
    <Controller
      name="email"
      control={control}
      rules={emailRule}
      render={({ field }) => (
        <InputField
          label="Email"
          {...field}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      )}
    />

    <Controller
      name="password"
      control={control}
      rules={passwordRule}
      render={({ field }) => (
        <InputField
          label="Mật khẩu"
          type="password"
          {...field}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      )}
    />

    <Controller
      name="confirmPassword"
      control={control}
      rules={{
        ...confirmPasswordRule,
        validate: (value) => value === password || "Mật khẩu xác nhận không khớp",
      }}
      render={({ field }) => (
        <InputField
          label="Xác nhận mật khẩu"
          type="password"
          {...field}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
      )}
    />

    <Controller
      name="address"
      control={control}
      rules={addressRule}
      render={({ field }) => (
        <InputField
          label="Địa chỉ"
          {...field}
          error={!!errors.address}
          helperText={errors.address?.message}
        />
      )}
    />
  </Box>

  {/* Cột phải */}
  <Box display="flex" flexDirection="column" gap={2}>
    <Controller
      name="fullName"
      control={control}
      rules={fullNameRule}
      render={({ field }) => (
        <InputField
          label="Họ và tên"
          {...field}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
      )}
    />

    <Controller
      name="phoneNumber"
      control={control}
      rules={phoneNumberRule}
      render={({ field }) => (
        <InputField
          label="Số điện thoại"
          {...field}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
      )}
    />

    <Controller
      name="dateOfBirth"
      control={control}
      rules={dateOfBirthRule}
      render={({ field }) => (
        <InputField
          label="Ngày sinh"
          type="date"
          {...field}
          error={!!errors.dateOfBirth}
          helperText={errors.dateOfBirth?.message}
        />
      )}
    />

    <GenderSelect
      name="gender"
      value={gender}
      onChange={(e) => setGender(e.target.value as RegisterFormData["gender"])}
      error={!!errors.gender}
      helperText={errors.gender?.message}
    />
  </Box>
</Box>


        <Box mt={4}>
          <ButtonPrimary type="submit" fullWidth>
            Đăng ký
          </ButtonPrimary>
        </Box>
      </form>
    </Paper>
  );
}
