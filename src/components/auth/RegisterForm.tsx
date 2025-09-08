"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

import { RegisterFormData } from "@/types/auth";
import { register as registerAPI } from "@/services/authService";
import { redirectByRole } from "@/utils/authUtils";
import { notifySuccess, notifyWarning } from "@/utils/toast";

import AvatarUpload from "@/components/common/AvatarUpload";
import GenderSelect from "@/components/common/GenderSelect";
import { FormInput } from "../common/FormInput";
import ButtonPrimary from "../common/ButtonPrimary";

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
      gender: gender || "OTHER",
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
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", py: 2 }}>
      <h1>Đăng ký</h1>
      <form onSubmit={handleSubmit(handleFinalSubmit)}>
        {/* Avatar */}
        <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
          <AvatarUpload preview={avatarPreview} onChange={handleAvatarChange} />
        </Box>

        {/* Form Inputs 2 cột */}
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
          <FormInput name="fullName" control={control} label="Họ và tên" rules={fullNameRule} />
          <FormInput name="address" control={control} label="Địa chỉ" rules={addressRule} />

          <FormInput name="email" control={control} label="Email" rules={emailRule} />
          <FormInput name="phoneNumber" control={control} label="Số điện thoại" rules={phoneNumberRule} />

          <FormInput name="password" control={control} label="Mật khẩu" type="password" rules={passwordRule} />
          <FormInput
            name="confirmPassword"
            control={control}
            label="Xác nhận mật khẩu"
            type="password"
            rules={{
              ...confirmPasswordRule,
              validate: (v) => v === password || "Mật khẩu xác nhận không khớp",
            }}
          />

          <FormInput name="dateOfBirth" control={control} label="Ngày sinh" type="date" />
          <GenderSelect
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value as RegisterFormData["gender"])}
            error={!!errors.gender}
            helperText={errors.gender?.message}
          />
        </Box>

        {/* Submit */}
        <Box sx={{ mt: 3 }}>
          <ButtonPrimary
            type="submit"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "0.95rem",
              borderRadius: 3,
              background: "linear-gradient(135deg, #64ce82, #4caf50)",
              "&:hover": {
                background: "linear-gradient(135deg, #4caf50, #388e3c)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(100, 206, 130, 0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Đăng ký tài khoản
          </ButtonPrimary>
        </Box>
      </form>
    </Box>
  );
}
