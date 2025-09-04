"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Paper } from "@mui/material";

import GenderSelect from "@/components/common/GenderSelect";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import AvatarUpload from "@/components/common/AvatarUpload";
import { notifySuccess, notifyWarning } from "@/utils/toast";
import { FormInput } from "../common/FormInput";

import { RegisterFormData } from "@/types/auth";
import { register as registerAPI } from "@/services/authService";

import {
  emailRule,
  passwordRule,
  confirmPasswordRule,
  fullNameRule,
  phoneNumberRule,
  addressRule,
  dateOfBirthRule,
} from "@/utils/validation/validators";
import { useRouter } from "next/navigation";
import { redirectByRole } from "@/utils/authUtils";

type RegisterFormProps = {
  onSubmit?: (data: RegisterFormData) => Promise<void>;
};
interface FieldErrorResponse {
  field: keyof RegisterFormData;
  message: string;
}


export default function RegisterForm({ onSubmit }: RegisterFormProps) {
   const router = useRouter();
  const { control, handleSubmit, watch, setError, formState: { errors } } = useForm<RegisterFormData>();
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
      setError("email", { type: "manual", message: "Vui lòng nhập email hoặc số điện thoại." });
      setError("phoneNumber", { type: "manual", message: "Vui lòng nhập email hoặc số điện thoại." });
      return;
    }

    const formattedData: RegisterFormData = {
      ...data,
      gender: gender || "OTHER",   // MALE/FEMALE/OTHER
      avatarFile: avatarFile ?? undefined,
      role: "ROLE_PATIENT",
      status: data.status ?? "Active",
        email: data.email || "",      
  phoneNumber: data.phoneNumber || "",

    };
try {
  await registerAPI(formattedData);
  notifySuccess("Đăng ký thành công!");
  if (onSubmit) await onSubmit(data);
  redirectByRole("ROLE_PATIENT", router);
} catch (err: unknown) {
  const maybeError = err as { response?: { data?: FieldErrorResponse } };
  const fieldError = maybeError?.response?.data;

  if (fieldError?.field && fieldError?.message) {
    setError(fieldError.field, { type: "manual", message: fieldError.message });
  } else {
    notifyWarning(err instanceof Error ? err.message : "Đăng ký thất bại");
  }
}




  };

  return (
    <Paper
      elevation={4}
      sx={{ p: { xs: 3, md: 6 }, maxWidth: 900, mx: "auto", mt: 6, borderRadius: 3, backgroundColor: "#fff" }}
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
            <FormInput name="email" control={control} label="Email" rules={emailRule} />
            <FormInput name="password" control={control} label="Mật khẩu" type="password" rules={passwordRule} />
            <FormInput
              name="confirmPassword"
              control={control}
              label="Xác nhận mật khẩu"
              type="password"
              rules={{ ...confirmPasswordRule, validate: (v) => v === password || "Mật khẩu xác nhận không khớp" }}
            />
            <FormInput name="address" control={control} label="Địa chỉ" rules={addressRule} />
          </Box>

          {/* Cột phải */}
          <Box display="flex" flexDirection="column" gap={2}>
            <FormInput name="fullName" control={control} label="Họ và tên" rules={fullNameRule} />
            <FormInput name="phoneNumber" control={control} label="Số điện thoại" rules={phoneNumberRule} />
            <FormInput name="dateOfBirth" control={control} label="Ngày sinh" type="date" rules={dateOfBirthRule} />
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
