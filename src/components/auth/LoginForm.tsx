"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Box,
  Divider,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Link,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";


import ButtonPrimary from "../common/ButtonPrimary";
import { FormInput } from "../common/FormInput";
import { notifyWarning, notifySuccess } from "@/utils/toast";
import { LoginRequest } from "@/types/auth";
import { passwordRule } from "@/utils/validation/validators";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { login as loginApi } from "@/services/authService";

export default function LoginForm() {
  const router = useRouter();
  const { control, handleSubmit, watch, setValue } = useForm<LoginRequest>({
    defaultValues: { emailOrPhone: "", password: "", rememberMe: false },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const handleFinalSubmit: SubmitHandler<LoginRequest> = async (data) => {
    if (!data.emailOrPhone) {
      notifyWarning("Vui lòng nhập email hoặc số điện thoại");
      return;
    }

    try {
      const response = await loginApi({
        emailOrPhone: data.emailOrPhone,
        password: data.password,
      });

      const user = response.data; // toàn bộ thông tin user
      notifySuccess("Đăng nhập thành công!");

      // Chọn role chính: lấy role đầu tiên
      const role = user.roles[0] || "ROLE_PATIENT"; 

      // Lưu token & role theo rememberMe
      if (data.rememberMe) {
        localStorage.setItem("authToken", user.token);
        localStorage.setItem("userRole", role);
      } else {
        sessionStorage.setItem("authToken", user.token);
        sessionStorage.setItem("userRole", role);
      }
 console.log("Redirecting to dashboard for role:", role);
      // Redirect theo role
      switch (role) {
        case "ROLE_ADMIN":
          router.push("/dashboard");
          break;
        case "ROLE_PATIENT":
          router.push("/home");
          break;
        case "ROLE_DOCTOR":
    
        case "ROLE_RECEPTIONIST":
    
        case "ROLE_LAB_STAFF":
    
        case "ROLE_CONSULTANT":
    
        case "ROLE_CASHIER":
         
          router.push("/dashboard");
          break;
        default:
          router.push("/");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Đăng nhập thất bại";
      notifyWarning(message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFinalSubmit)}>
        {/* Email/Phone */}
        <Box mb={2}>
          <FormInput<LoginRequest>
            name="emailOrPhone"
            control={control}
            label="Email hoặc số điện thoại"
            rules={{ required: "Vui lòng nhập email hoặc số điện thoại" }}
          />
        </Box>

        {/* Password */}
        <Box mb={1.5}>

<Controller
  name="password"
  control={control}
  rules={passwordRule}
  render={({ field, fieldState }) => (
    <TextField
      {...field}
      type={showPassword ? "text" : "password"}
      label="Mật khẩu"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((v) => !v)}
              edge="end"
              size="small"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )}
/>


        </Box>

        {/* Remember me & Forgot password */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={watch("rememberMe")}
                onChange={(e) => setValue("rememberMe", e.target.checked)}
                color="primary"
              />
            }
            label="Nhớ tài khoản"
          />
          <Link
            href="#"
            underline="hover"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              setForgotOpen(true);
            }}
          >
            Quên mật khẩu?
          </Link>
        </Box>

        {/* Submit button */}
        <Box mb={2}>
          <ButtonPrimary type="submit" fullWidth>
            Đăng nhập
          </ButtonPrimary>
        </Box>

        <Divider sx={{ my: 3 }}>Hoặc</Divider>

        {/* Login with Google */}
        <Box>
          <ButtonPrimary
            variant="outlined"
            fullWidth
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "#000",
              borderColor: "#ccc",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
            onClick={() => notifyWarning("Chức năng Google login chưa được triển khai")}
          >
            <FcGoogle size={24} />
            Đăng nhập bằng Google
          </ButtonPrimary>
        </Box>
      </form>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </>
  );
}
