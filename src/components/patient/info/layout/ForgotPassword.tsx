// src/components/auth/ForgotPassword.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { styled, width } from "@mui/system";
import { Paper } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "../../../common/FormInput";
import { emailRule } from "@/utils/validation/validators";
import { loginWithOtp } from "@/services/authService";
import { notifyError, notifySuccess } from "@/utils/toast";
import { AxiosError } from "axios";
import ForgotPasswordModal from "./ForgotPasswordModal"; // Import component pop-up

// === Styled Paper ===
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

interface EmailForm {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const { control, handleSubmit } = useForm<EmailForm>({
    defaultValues: { email: "" },
  });
  const [loading, setLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false); // Trạng thái mở/đóng pop-up OTP
  const [userEmail, setUserEmail] = useState(""); // Lưu email để truyền vào pop-up

  const handleSendEmail: SubmitHandler<EmailForm> = async (data) => {
    setLoading(true);
    try {
      await loginWithOtp(data.email);
      notifySuccess(`OTP đã được gửi tới ${data.email}`);
      setUserEmail(data.email); // Lưu email
      setOtpModalOpen(true); // Mở pop-up OTP
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
            <form onSubmit={handleSubmit(handleSendEmail)} style={{ width: "60%", margin: "30px auto"}}>
            <FormInput name="email" control={control} label="Email của bạn" rules={emailRule} />
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
        </Box>
      </StyledPaper>

      <ForgotPasswordModal open={otpModalOpen} onClose={() => setOtpModalOpen(false)} emailValue={userEmail}
      />
    </>
  );
};

export default ForgotPassword;