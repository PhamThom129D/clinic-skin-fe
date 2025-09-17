"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { Paper } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "@/components/common/FormInput";
import { PasswordInput } from "@/components/patient/info/section/PasswordInput";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import {
  emailRule,
  newPasswordRule,
  confirmNewPasswordRule,
} from "@/utils/validation/validators";
import { loginWithOtp } from "@/services/authService";
import { notifyError, notifySuccess } from "@/utils/toast";
import { AxiosError } from "axios";
import ForgotPasswordModal from "./ForgotPasswordModal";

// === Styled Paper ===
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

interface EmailForm {
  email: string;
}

interface ResetPasswordFormData {
  newPassword: string;
  confirmNewPassword: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
  } = useForm<EmailForm>({
    defaultValues: { email: "" },
  });

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    getValues,
  } = useForm<ResetPasswordFormData>();

  const handleSendEmail: SubmitHandler<EmailForm> = async (data) => {
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

  const handleResetPassword: SubmitHandler<ResetPasswordFormData> = (data) => {
    // Tạm thời chỉ hiển thị thông báo, không có logic gọi API
    console.log("Dữ liệu mật khẩu mới:", data);
    notifySuccess("Giao diện đổi mật khẩu đã hoạt động! Bạn có thể thêm logic API ở đây.");
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
            Quên mật khẩu
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", marginBottom: "30px" }}>
            Vui lòng nhập địa chỉ email của bạn để nhận OTP cho phép đặt lại mật khẩu.
          </Typography>
          
          {!otpVerified ? (
            <form onSubmit={handleEmailSubmit(handleSendEmail)} style={{ width: "60%", margin: "30px auto" }}>
              <FormInput name="email" control={emailControl} label="Email của bạn" rules={emailRule} />
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
          ) : (
            <form onSubmit={handlePasswordSubmit(handleResetPassword)}>
              <Box sx={{ maxWidth: 450, mx: "auto", mb: 3 }}>
                <PasswordInput
                  name="newPassword"
                  control={passwordControl}
                  label="Mật khẩu mới"
                  rules={undefined}
                />
                <PasswordInput
                  name="confirmNewPassword"
                  control={passwordControl}
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

      <ForgotPasswordModal
        open={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        emailValue={userEmail}
        onOtpVerified={handleOtpSuccess}
      />
    </>
  );
};

export default ForgotPassword;