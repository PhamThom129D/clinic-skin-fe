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
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { notifyWarning, notifySuccess } from "@/utils/toast";
import { LoginRequest } from "@/types/auth";
import { passwordRule } from "@/utils/validation/validators";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { login as loginApi } from "@/services/authService";
import ButtonPrimary from "../common/ButtonPrimary";
import { FormInput } from "../common/FormInput";
import GoogleLoginButton from "./GoogleLoginButton";
import { redirectByRole } from "@/utils/authUtils";

export default function LoginForm() {
  const router = useRouter();
  const theme = useTheme();
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
      redirectByRole(role, router);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Đăng nhập thất bại";
      notifyWarning(message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFinalSubmit)}>
        {/* Email/Phone */}
        <Box sx={{ mb: 3 }}>
          <Controller
            name="emailOrPhone"
            control={control}
            rules={{ required: "Vui lòng nhập email hoặc số điện thoại" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email hoặc số điện thoại"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    background: "rgba(100, 206, 130, 0.03)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: "rgba(100, 206, 130, 0.06)",
                      borderColor: theme.palette.primary.main,
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
                    },
                    "&.Mui-focused": {
                      background: "rgba(100, 206, 130, 0.08)",
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                    "&.Mui-focused": {
                      color: theme.palette.primary.main,
                    }
                  }
                }}
              />
            )}
          />
        </Box>

        {/* Password */}
        <Box sx={{ mb: 2 }}>
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
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    background: "rgba(100, 206, 130, 0.03)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: "rgba(100, 206, 130, 0.06)",
                      borderColor: theme.palette.primary.main,
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
                    },
                    "&.Mui-focused": {
                      background: "rgba(100, 206, 130, 0.08)",
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                    "&.Mui-focused": {
                      color: theme.palette.primary.main,
                    }
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                        size="small"
                        sx={{
                          color: "primary.main",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: "rgba(100, 206, 130, 0.1)",
                            transform: "scale(1.1)",
                          }
                        }}
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
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={watch("rememberMe")}
                onChange={(e) => setValue("rememberMe", e.target.checked)}
                color="primary"
                sx={{
                  "&.Mui-checked": {
                    color: "primary.main",
                  }
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Nhớ tài khoản
              </Typography>
            }
          />
          <Link
            href="#"
            underline="hover"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              setForgotOpen(true);
            }}
            sx={{
              fontWeight: 600,
              transition: "all 0.3s ease",
              "&:hover": {
                color: "primary.dark",
              }
            }}
          >
            Quên mật khẩu?
          </Link>
        </Box>

        {/* Submit button */}
        <Box sx={{ mb: 3 }}>
          <ButtonPrimary 
            type="submit" 
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "1rem",
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
            Đăng nhập
          </ButtonPrimary>
        </Box>

        <Divider 
          sx={{ 
            my: 3,
            "&::before, &::after": {
              borderColor: "rgba(100, 206, 130, 0.2)",
            }
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
            Hoặc
          </Typography>
        </Divider>

        {/* Google login */}
        <Box>
          <GoogleLoginButton />
        </Box>
      </form>

      <ForgotPasswordModal open={forgotOpen} onClose={() => setForgotOpen(false)} />
    </>
  );
}
