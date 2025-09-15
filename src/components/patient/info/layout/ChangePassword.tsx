"use client";

import React, { useState } from "react";
import { Box, Typography, Paper, Button, IconButton, InputAdornment, useTheme } from "@mui/material";
import { styled } from '@mui/system';
import { useForm, SubmitHandler } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormInput } from "@/components/common/FormInput";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { passwordRule, confirmPasswordRule } from "@/utils/validation/validators";
import { notifySuccess, notifyWarning } from "@/utils/toast";

// Định nghĩa kiểu dữ liệu cho form
interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Kiểu props cho component này
interface ChangePasswordProps {
  onBackClick: () => void;
}

// Styled Paper để tạo khung nền trắng
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const ChangePassword: React.FC<ChangePasswordProps> = ({ onBackClick }) => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>();

  const newPassword = watch("newPassword");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword: SubmitHandler<ChangePasswordFormData> = async (data) => {
    console.log("Dữ liệu đổi mật khẩu:", data);

    try {
      notifySuccess("Đổi mật khẩu thành công!");
      reset();
    } catch (error) {
      notifyWarning("Đổi mật khẩu thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <StyledPaper elevation={3}>
      <Box sx={{ padding: "40px" }}>
        <Typography variant="h2" fontWeight="bold" sx={{ mb: 4, textAlign: 'center', marginBottom: '50px' }}>
          Đổi mật khẩu
        </Typography>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <Box sx={{ maxWidth: 450, mx: 'auto', mb: 3 }}>
            <FormInput 
              name="oldPassword" 
              control={control} 
              label="Mật khẩu cũ" 
              type={showOldPassword ? "text" : "password"} 
              rules={passwordRule}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPassword((v) => !v)}
                    edge="end"
                    size="small"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormInput 
              name="newPassword" 
              control={control} 
              label="Mật khẩu mới" 
              type={showNewPassword ? "text" : "password"} 
              rules={passwordRule} 
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword((v) => !v)}
                    edge="end"
                    size="small"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormInput 
              name="confirmNewPassword" 
              control={control} 
              label="Xác nhận mật khẩu mới" 
              type={showConfirmPassword ? "text" : "password"} 
              rules={{
                ...confirmPasswordRule,
                validate: (value) => value === newPassword || "Mật khẩu xác nhận không khớp",
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    edge="end"
                    size="small"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <Box sx={{ maxWidth: 450, mx: 'auto', display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <ButtonPrimary
              type="submit"
              sx={{
                py: 1.5,
                marginBottom: '20px',
                fontSize: "0.95rem",
                borderRadius: 1,
                background: "linear-gradient(135deg, #64ce82, #4caf50)",
                "&:hover": {
                  background: "linear-gradient(135deg, #4caf50, #388e3c)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(100, 206, 130, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Cập nhật mật khẩu
            </ButtonPrimary>
          </Box>
        </form>
      </Box>
    </StyledPaper>
  );
};

export default ChangePassword;