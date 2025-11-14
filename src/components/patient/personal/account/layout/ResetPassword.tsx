// src/components/patients/personal/account/layout/ResetPassword.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "@/components/common/FormInput";
import { PasswordInput } from "@/components/patient/personal/account/section/PasswordInput";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { emailRule } from "@/utils/validation/validators";

// Import các hàm API và interface
import { loginWithOtp } from "@/services/authService";
import { resetPassword } from "@/services/accountService";
import { PasswordResetData, ResetPasswordFormData } from "@/types/userinfo"; // Import interface

import { notifyError, notifySuccess } from "@/utils/toast";
import { AxiosError } from "axios";
import ResetPasswordModal from "../section/ResetPasswordModal";
import { useRouter } from "next/navigation";
import StyledPaper from "@/components/common/StyledPaper";
import { AuthResponse } from "@/types/auth";

interface ChangePasswordProps {
  account: AuthResponse;
}

const ResetPassword: React.FC<ChangePasswordProps> = ({ account}) => {
  const [loading, setLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const router = useRouter();

  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
  } = useForm<{ email: string}>({
    defaultValues: { email: account?.email || "" },
  });

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    getValues,
  } = useForm<ResetPasswordFormData>();
  
  const handleSendEmail: SubmitHandler<{ email: string}> = async (data) => {
    setLoading(true);
    try {
      await loginWithOtp(data.email);
      notifySuccess(`OTP đã được gửi tới ${data.email}`);
      setUserEmail(data.email);
      setOtpModalOpen(true);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        notifyError(err.response?.data?.error || "Gửi OTP thất bại.");
      } else {
        notifyError("Gửi OTP thất bại. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSuccess = () => {
    setOtpModalOpen(false);
    setOtpVerified(true);
  };

  const handleResetPassword: SubmitHandler<ResetPasswordFormData> = async (formData) => {
    setLoading(true);
    try {
      const data: PasswordResetData = {
        email: account.email,
        newPassword: formData.newPassword,
      };
      await resetPassword(data);

      notifySuccess("Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.");
      router.push("/auth");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        notifyError(err.response?.data?.error || "Đặt lại mật khẩu thất bại.");
      } else {
        notifyError("Đặt lại mật khẩu thất bại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StyledPaper elevation={3}>
        <Box sx={{ padding: "40px" }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ mb: 4, textAlign: "center", marginBottom: "50px" }}
          >
            Đặt lại mật khẩu
          </Typography>
          
          {!otpVerified ? (
            <>
              <Typography variant="body1" sx={{ textAlign: "center", marginBottom: "30px" }}>
                Vui lòng nhấn Gửi để nhận OTP cho phép đặt lại mật khẩu.
              </Typography>
              <form onSubmit={handleEmailSubmit(handleSendEmail)} style={{ width: "60%", margin: "30px auto" }}>
                <FormInput name="email" control={emailControl} label="Email của bạn" rules={emailRule} inputSlotProps={{ disabled: true }} 
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#484848ff",
                    color: "#110f0fff",
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled": {
                    backgroundColor: "#f5f5f5",
                  },
                }}/>
                <Box sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ py: 1.5 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Gửi"
                    )}
                  </Button>
                </Box>
              </form>
            </>
          ) : (
            <form onSubmit={handlePasswordSubmit(handleResetPassword)}>
              <Box sx={{ maxWidth: 450, mx: "auto", mb: 3 }}>
                <PasswordInput
                  name="newPassword"
                  control={passwordControl}
                  label="Mật khẩu mới"
                />
                <PasswordInput
                  name="confirmNewPassword"
                  control={passwordControl}
                  label="Xác nhận mật khẩu mới"
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
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Cập nhật mật khẩu"
                  )}
                </ButtonPrimary>
              </Box>
            </form>
          )}
        </Box>
      </StyledPaper>

      <ResetPasswordModal
        open={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        emailValue={userEmail}
        onOtpVerified={handleOtpSuccess}
      />
    </>
  );
};

export default ResetPassword;