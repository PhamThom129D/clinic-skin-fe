"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
  Link,
  useTheme,
  alpha,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import ForgotPasswordModal from "./ForgotPasswordModal";
import GoogleLoginButton from "./GoogleLoginButton";
import ButtonPrimary from "../../../common/ButtonPrimary";

import { LoginRequest } from "@/types/auth";
import { passwordRule } from "@/utils/validation/validators";
import { notifyWarning, notifySuccess } from "@/utils/toast";
import { login as loginApi } from "@/services/authService";
import { redirectByRole } from "@/utils/authUtils";
import { FormInput } from "../../../common/FormInput";
import loadingBus from "@/utils/loadingBus";


export default function LoginForm() {
  const router = useRouter();
  const theme = useTheme();

  const { control, handleSubmit, watch, setValue } = useForm<LoginRequest>({
    defaultValues: { emailOrPhone: "", password: "", rememberMe: false },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null); // ✅ ADD ERROR STATE

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      background: "rgba(100,206,130,0.05)",
      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      transition: "all 0.3s ease",
      "&:hover": {
        background: "rgba(100,206,130,0.1)",
        borderColor: theme.palette.primary.main,
        transform: "translateY(-1px)",
        boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
      },
      "&.Mui-focused": {
        background: "rgba(100,206,130,0.15)",
        boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
      },
    },
    "& .MuiInputLabel-root": {
      fontWeight: 500,
      "&.Mui-focused": { color: theme.palette.primary.main },
    },
  };

 const handleFinalSubmit: SubmitHandler<LoginRequest> = async (data) => {
  setLoginError(null);
  loadingBus.start(); // 🏥 bật loading ngay

  if (!data.emailOrPhone) {
    loadingBus.stop();
    setLoginError("Vui lòng nhập email hoặc số điện thoại");
    notifyWarning("Vui lòng nhập email hoặc số điện thoại");
    return;
  }

  try {
    const response = await loginApi({
      emailOrPhone: data.emailOrPhone,
      password: data.password,
    });

    const user = response.data;
    notifySuccess("Đăng nhập thành công!");

    const role = user.roles[0] || "ROLE_PATIENT";

    if (data.rememberMe) {
      localStorage.setItem("authToken", user.token);
      localStorage.setItem("account", JSON.stringify(user));
      localStorage.setItem("userRole", role);
    } else {
      sessionStorage.setItem("authToken", user.token);
      sessionStorage.setItem("account", JSON.stringify(user));
      sessionStorage.setItem("userRole", role);
    }

    window.dispatchEvent(new Event("authChange"));

    redirectByRole(role, router);

    // Tắt loading sau khi route load xong
    setTimeout(() => loadingBus.stop(), 500);

  } catch (err: any) {
    loadingBus.stop();

    let message = err?.response?.data?.message;
    if (err?.response?.status === 400) {
      message = "Sai tài khoản hoặc mật khẩu, vui lòng thử lại.";
    }
    if (!message) {
      message = "Đăng nhập thất bại, vui lòng thử lại.";
    }

    setLoginError(message);
  }
};


  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 500, mx: "auto", py: 4 }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 9, color: theme.palette.primary.main }}
        >
          Đăng nhập
        </Typography>

        <form onSubmit={handleSubmit(handleFinalSubmit)}>
          <FormInput
            name="emailOrPhone"
            control={control}
            label="Email hoặc số điện thoại"
            rules={{ required: "Vui lòng nhập email hoặc số điện thoại" }}
            sx={inputStyles}
          />

          <FormInput
            name="password"
            control={control}
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            rules={passwordRule}
            sx={inputStyles}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((v) => !v)}
                  edge="end"
                  size="small"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          {/* Remember + Forgot */}
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={watch("rememberMe")}
                  onChange={(e) => setValue("rememberMe", e.target.checked)}
                  color="primary"
                />
              }
              label={<Typography variant="body2">Nhớ tài khoản</Typography>}
            />

            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setForgotOpen(true);
              }}
              sx={{ fontWeight: 600 }}
            >
              Quên mật khẩu?
            </Link>
          </Box>

          {/* ⚠️ HIỂN THỊ LỖI */}
          {loginError && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}
            >
              {loginError}
            </Typography>
          )}

          <ButtonPrimary type="submit" fullWidth sx={{ mb: 3, py: 1.5 }}>
            Đăng nhập
          </ButtonPrimary>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Hoặc
            </Typography>
          </Divider>

          <GoogleLoginButton />
        </form>
      </Box>

      <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </>
  );
}
