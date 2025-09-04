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
        email: data.email || "",       // không để undefined
  phoneNumber: data.phoneNumber || "",
      // **dateOfBirth giữ nguyên yyyy-MM-dd**
    };
try {
  await registerAPI(formattedData);
  notifySuccess("Đăng ký thành công!");
  if (onSubmit) await onSubmit(data);
  router.push("/dashboard");
} catch (err: unknown) {
  // Cast an toàn sang kiểu có response.data
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
    <Box sx={{ width: "100%", pb: 2 }}> {/* Thêm padding bottom */}
      <form onSubmit={handleSubmit(handleFinalSubmit)}>
        {/* Avatar - thu nhỏ lại */}
        <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
          <AvatarUpload 
            preview={avatarPreview} 
            onChange={handleAvatarChange}
          />
        </Box>

        {/* Grid container với spacing nhỏ hơn */}
        <Box 
          display="grid" 
          gridTemplateColumns="1fr" // Chỉ 1 cột để tiết kiệm không gian
          gap={2} // Giảm gap
          sx={{ mb: 2 }} // Giảm margin bottom
        >
          <FormInput 
            name="fullName" 
            control={control} 
            label="Họ và tên" 
            rules={fullNameRule} 
          />
          <FormInput 
            name="email" 
            control={control} 
            label="Email" 
            rules={emailRule} 
          />
          <FormInput 
            name="phoneNumber" 
            control={control} 
            label="Số điện thoại" 
            rules={phoneNumberRule} 
          />
          <FormInput 
            name="password" 
            control={control} 
            label="Mật khẩu" 
            type="password" 
            rules={passwordRule} 
          />
          <FormInput
            name="confirmPassword"
            control={control}
            label="Xác nhận mật khẩu"
            type="password"
            rules={{ 
              ...confirmPasswordRule, 
              validate: (v) => v === password || "Mật khẩu xác nhận không khớp" 
            }}
          />
          
          {/* Grid 2 cột cho các trường ngắn */}
          <Box 
            display="grid" 
            gridTemplateColumns="1fr 1fr" 
            gap={2}
          >
            <FormInput 
              name="dateOfBirth" 
              control={control} 
              label="Ngày sinh" 
              type="date" 
              rules={dateOfBirthRule} 
            />
            <GenderSelect
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as RegisterFormData["gender"])}
              error={!!errors.gender}
              helperText={errors.gender?.message}
            />
          </Box>
          
          <FormInput 
            name="address" 
            control={control} 
            label="Địa chỉ" 
            rules={addressRule} 
          />
        </Box>

        <ButtonPrimary 
          type="submit" 
          fullWidth
          sx={{
            py: 1.2, // Giảm padding
            fontSize: "0.9rem", // Giảm font size
            borderRadius: 3,
            background: "linear-gradient(135deg, #64ce82, #4caf50)",
            "&:hover": {
              background: "linear-gradient(135deg, #4caf50, #388e3c)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(100, 206, 130, 0.3)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          Đăng ký tài khoản
        </ButtonPrimary>
      </form>
    </Box>
  );
}
