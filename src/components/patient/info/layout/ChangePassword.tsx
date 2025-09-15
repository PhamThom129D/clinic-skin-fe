"use client";

import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { styled } from '@mui/system';
import { useForm, SubmitHandler } from "react-hook-form";
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
  minHeight: "100%",
}));

const ChangePassword: React.FC<ChangePasswordProps> = ({ onBackClick }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>();

  const newPassword = watch("newPassword");

  // Xử lý khi form được submit
  const handleChangePassword: SubmitHandler<ChangePasswordFormData> = async (data) => {
    // Giả lập logic gọi API đổi mật khẩu
    console.log("Dữ liệu đổi mật khẩu:", data);

    try {
      // Giả lập thành công
      notifySuccess("Đổi mật khẩu thành công!");
      reset(); // Reset form sau khi thành công
    } catch (error) {
      notifyWarning("Đổi mật khẩu thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <StyledPaper elevation={3} sx={{ minHeight: "fit-content" }}>
        <Box sx={{ padding: "40px"}}>
            <Typography variant="h2" fontWeight="bold" sx={{ mb: 4, textAlign: 'center', marginBottom: '50px' }}>
                Đổi mật khẩu
            </Typography>
            <form onSubmit={handleSubmit(handleChangePassword)}>
                <Box sx={{ maxWidth: 450, mx: 'auto', display: 'grid', gap: 2, mb: 3 }}>
                <FormInput 
                    name="oldPassword" 
                    control={control} 
                    label="Mật khẩu cũ" 
                    type="password" 
                    rules={passwordRule} 
                />
                <FormInput 
                    name="newPassword" 
                    control={control} 
                    label="Mật khẩu mới" 
                    type="password" 
                    rules={passwordRule} 
                />
                <FormInput 
                    name="confirmNewPassword" 
                    control={control} 
                    label="Xác nhận mật khẩu mới" 
                    type="password" 
                    rules={{
                    ...confirmPasswordRule,
                    validate: (value) => value === newPassword || "Mật khẩu xác nhận không khớp",
                    }}
                />
                </Box>
                {/* Nút được căn phải */}
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