"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Typography, IconButton, Avatar, alpha } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useRouter } from "next/navigation";

import { RegisterFormData } from "@/types/auth";
import { register as registerAPI } from "@/services/authService";

import GenderSelect from "../../../common/GenderSelect";
import { FormInput } from "../../../common/FormInput";
import ButtonPrimary from "../../../common/ButtonPrimary";

import {
  emailRule,
  passwordRule,
  confirmPasswordRule,
  fullNameRule,
  phoneNumberRule,
  addressRule,
} from "@/utils/validation/validators";
import { redirectByRole } from "@/utils/authUtils";
import { notifySuccess } from "@/utils/toast";


export default function RegisterForm() {
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
    const response = await registerAPI(formattedData);

    // Lấy token và role từ response
    const token = response.token;
    const role = response.roles?.[0] || "ROLE_PATIENT";

    // Lưu vào sessionStorage
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("user", JSON.stringify(response));

    notifySuccess("Đăng ký thành công!");
  redirectByRole(role, router);

  } catch (err: unknown) {
    let message = "Đăng ký thất bại. Vui lòng thử lại.";
    let field: keyof RegisterFormData = "email";

    if (typeof err === "object" && err !== null && "response" in err) {
      const resp = (err as any).response;
      if (resp?.data) {
        message = typeof resp.data === "string" ? resp.data : message;
        if (message.toLowerCase().includes("email")) {
          field = "email";
        } else if (message.toLowerCase().includes("số điện thoại") || message.toLowerCase().includes("phone")) {
          field = "phoneNumber";
        }
      }
    }

    setError(field, { type: "manual", message });
  }
};


  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", py: 2, minHeight: 800 }}>
      <Typography variant="h2" fontWeight="bold" textAlign="center" sx={{ mb: 4, color: "primary.main" }}>
        Đăng ký
      </Typography>

      <form onSubmit={handleSubmit(handleFinalSubmit)}>
        {/* Avatar với icon bút */}
        <Box display="flex" justifyContent="center" sx={{ mb: 4, position: "relative" }}>
          <Avatar
            src={avatarPreview || "/default-avatar.png"}
            alt="Avatar Preview"
            sx={{ width: 140, height: 140, border: "2px solid #1976d2" }}
          />
          <IconButton
            component="label"
            sx={{
              position: "absolute",
              top: 105,
              left: "58%",
              transform: "translateX(-50%)",
              bgcolor: "primary.main",
              color: "white",
              border: "1px solid white",
              width: 35,
              height: 35,
              "&:hover": { bgcolor: alpha("#1976d2", 0.9) },
              boxShadow: 1,
            }}
          >
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleAvatarChange(e.target.files?.[0] || null)}
            />
            <Edit fontSize="small" />
          </IconButton>
        </Box>

        {/* Form Inputs */}
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={4}>
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
          <ButtonPrimary type="submit" fullWidth sx={{ py: 1.5 }}>
            Đăng ký tài khoản
          </ButtonPrimary>
        </Box>
      </form>
    </Box>
  );
}
