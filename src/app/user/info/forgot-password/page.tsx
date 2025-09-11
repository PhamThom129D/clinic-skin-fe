// src/app/user/info/forgot-password/page.tsx
"use client";
import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { emailRule, passwordRule } from "@/utils/validation/validators";
import { notifySuccess, notifyWarning } from "@/utils/toast";
import { loginWithOtp, verifyOtp, resetPassword } from "@/services/authService";
import { AxiosError } from "axios";
import EmailInput from "@/components/patient/info/section/EmailInput";
import OtpPopup from "@/components/patient/info/section/VerifyOtp";
import ResetPassword from "@/components/patient/info/section/ResetPassword";

// Đặt tên phù hợp hơn cho các form data
interface EmailForm {
  email: string;
}

interface NewPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export default function ForgotPasswordPage() {
  const [stage, setStage] = useState<"email" | "otp-popup" | "reset-password">("email");
  const [emailValue, setEmailValue] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);

  // Xử lý khi gửi email
  const handleSendEmail: SubmitHandler<EmailForm> = async (data) => {
    setLoading(true);
    try {
      await loginWithOtp(data.email);
      setEmailValue(data.email);
      notifySuccess(`OTP đã được gửi tới ${data.email}`);
      setStage("otp-popup");
    } catch (err: unknown) {
      handleError(err, "Gửi OTP thất bại");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi xác thực OTP
  const handleVerifyOTP = async (otpCode: string) => {
    setLoading(true);
    try {
      const res = await verifyOtp({ emailOrPhone: emailValue, otpCode });
      const resetToken = res.data.token;
      setResetToken(resetToken);
      notifySuccess("Xác thực thành công!");
      setStage("reset-password"); // Chuyển sang giao diện đặt lại mật khẩu
    } catch (err: unknown) {
      handleError(err, "Xác thực OTP thất bại");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi đặt lại mật khẩu mới
  const handleResetPassword: SubmitHandler<NewPasswordForm> = async (data) => {
    setLoading(true);
    if (data.newPassword !== data.confirmPassword) {
      notifyWarning("Mật khẩu xác nhận không khớp.");
      setLoading(false);
      return;
    }
    try {
      await resetPassword({ email: emailValue, newPassword: data.newPassword, resetToken });
      notifySuccess("Đặt lại mật khẩu thành công!");
      // Reset về giao diện ban đầu sau khi thành công
      setStage("email");
    } catch (err: unknown) {
      handleError(err, "Đặt lại mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err: unknown, fallbackMessage: string) => {
    if (err instanceof AxiosError) {
      notifyWarning(err.response?.data?.error || fallbackMessage);
    } else if (err instanceof Error) {
      notifyWarning(err.message);
    } else {
      notifyWarning(fallbackMessage);
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
      {stage === "email" && (
        <EmailInput onSubmit={handleSendEmail} loading={loading} />
      )}
      {stage === "reset-password" && (
        <ResetPassword onSubmit={handleResetPassword} loading={loading} />
      )}
      {stage === "otp-popup" && (
        <OtpPopup
          open={true} // Luôn mở khi stage là otp-popup
          onClose={() => setStage("email")} // Đóng pop-up và quay về bước email
          onVerify={handleVerifyOTP}
          email={emailValue}
        />
      )}
    </Box>
  );
}