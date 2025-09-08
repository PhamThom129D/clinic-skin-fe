"use client";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
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
import ButtonPrimary from "../common/ButtonPrimary";

import { LoginRequest } from "@/types/auth";
import { passwordRule } from "@/utils/validation/validators";
import { notifyWarning, notifySuccess } from "@/utils/toast";
import { login as loginApi } from "@/services/authService";
import { redirectByRole } from "@/utils/authUtils";

export default function LoginForm() {
  const router = useRouter();
  const theme = useTheme();

  const { control, handleSubmit, watch, setValue } = useForm<LoginRequest>({
    defaultValues: { emailOrPhone: "", password: "", rememberMe: false },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

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
    if (!data.emailOrPhone) {
      notifyWarning("Vui lòng nhập email hoặc số điện thoại");
      return;
    }

    try {
      const response = await loginApi({ emailOrPhone: data.emailOrPhone, password: data.password });
      const user = response.data;

      notifySuccess("Đăng nhập thành công!");
      const role = user.roles[0] || "ROLE_PATIENT";

      if (data.rememberMe) {
        localStorage.setItem("authToken", user.token);
        localStorage.setItem("userRole", role);
      } else {
        sessionStorage.setItem("authToken", user.token);
        sessionStorage.setItem("userRole", role);
      }
      window.dispatchEvent(new Event("authChange"));

      redirectByRole(role, router);


    } catch (err: unknown) {
      notifyWarning(err instanceof Error ? err.message : "Đăng nhập thất bại");
    }
  };

  return (
    <>
      <Box sx={{ width: "100%",maxWidth: 500, mx: "auto", py: 4 }}>
  <Typography
    variant="h2"
    fontWeight="bold"
    textAlign="center"
    sx={{ mb: 9, color: theme.palette.primary.main }}
  >
    Đăng nhập
  </Typography>
  <form onSubmit={handleSubmit(handleFinalSubmit)}>
    {/* Email/Phone */}
    <FormInput
      name="emailOrPhone"
      control={control}
      label="Email hoặc số điện thoại"
      rules={{ required: "Vui lòng nhập email hoặc số điện thoại" }}
      sx={inputStyles}
    />

    {/* Password */}
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

    {/* Remember Me + Forgot Password */}
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

    {/* Submit */}
    <ButtonPrimary type="submit" fullWidth sx={{ mb: 3, py: 1.5 }}>
      Đăng nhập
    </ButtonPrimary>

    {/* Divider */}
    <Divider sx={{ my: 2 }}>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Hoặc
      </Typography>
    </Divider>

    {/* Google Login */}
    <GoogleLoginButton />
  </form>
</Box>


      <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </>
  );
}

// Reusable Form Input component
interface FormInputProps {
  name: keyof LoginRequest;
  control: any;
  label: string;
  type?: string;
  rules?: any;
  sx?: object;
  endAdornment?: React.ReactNode;
}

function FormInput({ name, control, label, type = "text", rules, sx, endAdornment }: FormInputProps) {
  return (
    <Box sx={{ my: 4 }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type={type}
            label={label}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
            variant="outlined"
            sx={sx}
            InputProps={{ endAdornment }}
          />
        )}
      />
    </Box>
  );
}
