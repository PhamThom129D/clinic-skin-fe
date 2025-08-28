"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Box, Typography, FormControlLabel, Checkbox, Link, Divider, IconButton, InputAdornment } from "@mui/material";
import InputField from "../common/InputField";
import ButtonPrimary from "../common/ButtonPrimary";
import { emailRule, passwordRule } from "@/utils/validation/validators";
import { notifyWarning } from "@/utils/toast";
import { LoginRequest } from "@/types/auth";
import { FcGoogle } from "react-icons/fc";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type LoginFormProps = {
  onSubmit: (data: LoginRequest) => Promise<void>;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const { control, handleSubmit } = useForm<LoginRequest>({
    defaultValues: {
      emailOrPhone: "",
      password: "",
      rememberMe: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleFinalSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      await onSubmit(data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Đăng nhập thất bại";
      notifyWarning(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)}>
      {/* Email/Phone */}
      <Box mb={2}>
        <Controller
          name="emailOrPhone"
          control={control}
          rules={emailRule}
          render={({ field }) => (
            <InputField
              label="Email hoặc số điện thoại"
              {...field}
              value={field.value ?? ""}
            />
          )}
        />
      </Box>

      {/* Password */}
      <Box mb={1.5}>
        <Controller
          name="password"
          control={control}
          rules={passwordRule}
          render={({ field }) => (
            <InputField
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              {...field}
              value={field.value ?? ""}
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
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} color="primary" />}
              label="Nhớ tài khoản"
            />
          )}
        />
        <Link href="#" underline="hover" color="primary">
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
  );
}
