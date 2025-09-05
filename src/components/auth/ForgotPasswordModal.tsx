"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "../common/FormInput";
import { notifyError, notifySuccess, notifyWarning } from "@/utils/toast";
import OTPVerification from "./OTPVerification";
import { emailRule } from "@/utils/validation/validators";
import { loginWithOtp, resendOtp, verifyOtp } from "@/services/authService";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

interface EmailForm {
  email: string;
}

export default function ForgotPasswordModal({ open, onClose }: ForgotPasswordModalProps) {
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm<EmailForm>({
    defaultValues: { email: "" },
  });
  const [otpStage, setOtpStage] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleError = (err: unknown, fallbackMessage: string) => {
    if (err instanceof Error) notifyWarning(err.message);
    else if (typeof err === "object" && err !== null && "response" in err) {
      const e = err as { response?: { data?: { error?: string } } };
      notifyWarning(e.response?.data?.error || fallbackMessage);
    } else {
      notifyWarning(fallbackMessage);
    }
  };

  // Gửi OTP
  const handleSendEmail: SubmitHandler<EmailForm> = async (data) => {
    setLoading(true); // khóa nút gửi
    try {
      await loginWithOtp(data.email);
      notifySuccess(`OTP đã được gửi tới ${data.email}`);
      setEmailValue(data.email);
      setOtpStage(true);
    } catch (err: unknown) {
      notifyError("Gửi OTP thất bại");
    } finally {
      setLoading(false); 
    }
  };

const handleVerifyOTP = async (otpCode: string) => {
  try {
    const user = await verifyOtp({ emailOrPhone: emailValue, otpCode });

    notifySuccess("Xác thực thành công!");
    const role = user.data.roles[0] || "ROLE_PATIENT";
    localStorage.setItem("authToken", user.data.token);
    localStorage.setItem("userRole", role);

    if (role === "ROLE_ADMIN") router.push("/dashboard");
    else router.push("/home");

    setOtpStage(false);
    reset();
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 400 && err.response.data?.error === "Invalid OTP . Please try again.") {
        notifyWarning("OTP không đúng, vui lòng thử lại.");
        return; 
      }
      notifyWarning(err.response?.data?.error || "Xác thực OTP thất bại");
      return;
    }
    if (err instanceof Error) {
      notifyWarning(err.message);
    } else {
      notifyWarning("Xác thực OTP thất bại");
    }
  }
};

  const handleResendOTP = async () => {
    try {
      await resendOtp(emailValue);
      notifySuccess("OTP đã được gửi lại!");
    } catch (err: unknown) {
      handleError(err, "Gửi lại OTP thất bại");
    }
  };

  const handleEditEmail = () => {
    setOtpStage(false);
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {otpStage ? "Xác nhận OTP" : "Quên mật khẩu"}
      </DialogTitle>
      <DialogContent sx={{ py: 2 }}>
        {!otpStage && (
          <Box mb={2}>
            <Typography variant="body1" color="textSecondary" mb={2}>
              Nhập email đã đăng ký. Một mã OTP gồm 6 chữ số sẽ được gửi tới email để đặt lại mật khẩu.
            </Typography>
            <form id="forgot-form" onSubmit={handleSubmit(handleSendEmail)}>
              <FormInput name="email" control={control} label="Email của bạn" rules={emailRule} />
            </form>
          </Box>
        )}

        {otpStage && (
          <OTPVerification
            onVerify={handleVerifyOTP}
            onResend={handleResendOTP}
            onEditEmail={handleEditEmail}
          />
        )}
      </DialogContent>

      {!otpStage && (
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} sx={{ fontSize: "1rem" }} disabled={loading}>
            Hủy
          </Button>
          <Button
            type="submit"
            form="forgot-form"
            variant="contained"
            sx={{ fontSize: "1rem", position: "relative" }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Gửi"
            )}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
