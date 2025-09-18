"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { notifyWarning, notifySuccess } from "@/utils/toast";
import OTPVerification from "../../../auth/OTPVerification";
import { resendOtp, verifyOtp } from "@/services/authService";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

interface ResetPasswordModalProps {
  open: boolean;
  onClose: () => void;
  emailValue: string;
  onOtpVerified: () => void;
}

export default function ResetPasswordModal({ open, onClose, emailValue, onOtpVerified }: ResetPasswordModalProps) {
  const router = useRouter();

  const handleVerifyOTP = async (otpCode: string) => {
    try {
      const user = await verifyOtp({ emailOrPhone: emailValue, otpCode });
      notifySuccess("Xác thực thành công!");
      onOtpVerified();
      
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