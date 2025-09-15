// src/components/auth/ForgotPasswordModal.tsx
"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { notifyWarning, notifySuccess } from "@/utils/toast";
import OTPVerification from "../../../auth/OTPVerification";
import { resendOtp, verifyOtp } from "@/services/authService";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
  emailValue: string;
}

export default function ForgotPasswordModal({ open, onClose, emailValue }: ForgotPasswordModalProps) {
  const router = useRouter();

  const handleVerifyOTP = async (otpCode: string) => {
    try {
      const user = await verifyOtp({ emailOrPhone: emailValue, otpCode });

      notifySuccess("Xác thực thành công!");
      const role = user.data.roles[0] || "ROLE_PATIENT";
      localStorage.setItem("authToken", user.data.token);
      localStorage.setItem("account", JSON.stringify(user.data));
      localStorage.setItem("userRole", role);

      if (role === "ROLE_ADMIN") router.push("/dashboard");
      else router.push("/home");

      onClose(); // Đóng pop-up sau khi xác thực thành công
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400 && err.response.data?.error === "Invalid OTP . Please try again.") {
          notifyWarning("OTP không đúng, vui lòng thử lại.");
          return;
        }
        notifyWarning(err.response?.data?.error || "Xác thực OTP thất bại");
        return;
      }
      notifyWarning("Xác thực OTP thất bại");
    }
  };

  const handleResendOTP = async () => {
    try {
      await resendOtp(emailValue);
      notifySuccess("OTP đã được gửi lại!");
    } catch (err: unknown) {
      notifyWarning("Gửi lại OTP thất bại");
    }
  };

  const handleEditEmail = () => {
    // Đóng modal OTP để quay lại trang nhập email
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Xác nhận OTP
      </DialogTitle>
      <DialogContent sx={{ py: 2 }}>
        <OTPVerification
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
          onEditEmail={handleEditEmail}
        />
      </DialogContent>
    </Dialog>
  );
}