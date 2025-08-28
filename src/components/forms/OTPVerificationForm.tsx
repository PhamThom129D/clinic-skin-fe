// src/components/forms/OTPVerificationForm.tsx
"use client";
import React, { useState, FormEvent } from "react";
import { Box, Paper, Typography, Link, Button } from "@mui/material";
import OTPFields from "../authenticate/layout/OTPFields";

export default function OTPVerificationForm() {
  const [otp, setOtp] = useState("");
  const [otpInputs, setOtpInputs] = useState<string[]>(Array(6).fill(''));

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
    setOtp(newOtpInputs.join(''));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otpInputs[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Mã OTP đã nhập:", otp);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 400,
        borderRadius: 3,
        p: { xs: 3, md: 5 },
        textAlign: "center",
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" fontWeight={600} mb={1}>
        Xác minh mã OTP
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Nhập mã OTP đã được gửi tới vykid9@gmail.com
      </Typography>

      {/* Sử dụng component OTPFields đã tạo */}
      <OTPFields
        otpInputs={otpInputs}
        handleOtpChange={handleOtpChange}
        handleKeyDown={handleKeyDown}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          py: 1.5,
          fontWeight: 'bold',
          backgroundColor: '#64ce82',
          '&:hover': {
            backgroundColor: '#479b5c',
          },
        }}
      >
        XÁC NHẬN
      </Button>

      <Box mt={3}>
        <Typography variant="body2" color="text.secondary">
          Gửi lại mã sau: 02:56
        </Typography>
        <Link href="#" underline="hover" mt={1} display="block" color="#64ce82">
          Nhập lại email
        </Link>
        <Link href="/authenticate/login" underline="hover" mt={1} display="block" color="#64ce82">
          Quay lại đăng nhập
        </Link>
      </Box>
    </Paper>
  );
}