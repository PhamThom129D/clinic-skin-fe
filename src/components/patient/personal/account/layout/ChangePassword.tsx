"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/patient/personal/account/section/PasswordInput";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import {
  oldPasswordRule,
  newPasswordRule,
  confirmNewPasswordRule,
} from "@/utils/validation/validators";
import { notifySuccess, notifyWarning, notifyError } from "@/utils/toast";
import StyledPaper from "@/components/common/StyledPaper";
import { ChangePasswordFormData, PasswordChangeData } from "@/types/userinfo";
import { AuthResponse } from "@/types/auth";
import { changePassword } from "@/services/accountService";
import { isAxiosError } from "axios";

interface ChangePasswordProps {
  account: AuthResponse;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ account }) => {
  const theme = useTheme();
  const router = useRouter();

  const { control, handleSubmit, getValues } = useForm<ChangePasswordFormData>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleChangePassword: SubmitHandler<ChangePasswordFormData> = async (
    data
  ) => {
    try {
      const userEmail = account.email;
      const dataString: PasswordChangeData = {
        email: userEmail,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };

      await changePassword(dataString);
      notifySuccess("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
      router.push("/auth");
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        const errorMessage = error.response.data;
        if (errorMessage === "Mật khẩu cũ không chính xác") {
          notifyError("Mật khẩu cũ không đúng. Vui lòng thử lại.");
        } else {
          notifyError(errorMessage || "Có lỗi xảy ra. Vui lòng thử lại.");
        }
      } else {
        notifyWarning("Đổi mật khẩu thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <StyledPaper elevation={3}>
      <Box sx={{ padding: "40px" }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ mb: 4, textAlign: "center", marginBottom: "50px" }}
        >
          Đổi mật khẩu
        </Typography>

        <form onSubmit={handleSubmit(handleChangePassword)}>
          <Box sx={{ maxWidth: 450, mx: "auto", mb: 3 }}>
            <PasswordInput
              name="oldPassword"
              control={control}
              label="Mật khẩu cũ"
              rules={oldPasswordRule}
            />
            <PasswordInput
              name="newPassword"
              control={control}
              label="Mật khẩu mới"
              rules={newPasswordRule(getValues)}
            />
            <PasswordInput
              name="confirmNewPassword"
              control={control}
              label="Xác nhận mật khẩu mới"
              rules={confirmNewPasswordRule(getValues)}
            />
          </Box>

          <Box
            sx={{
              maxWidth: 450,
              mx: "auto",
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <ButtonPrimary
              type="submit"
              sx={{
                py: 1.5,
                marginBottom: "20px",
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
