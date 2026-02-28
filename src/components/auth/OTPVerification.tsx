"use client";
import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { notifySuccess, notifyWarning } from "@/utils/toast";

interface OTPVerificationProps {
  onVerify: (otp: string) => Promise<void>; 
  onResend: () => void;
  onEditEmail: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ onVerify, onResend, onEditEmail }) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(180);
  const [loading, setLoading] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  interface APIError {
  error: string;
}

const handleSubmit = async () => {
  if (otp.some((d) => d === "")) {
    notifyWarning("Vui lòng nhập đủ 6 chữ số OTP");
    return;
  }

  setLoading(true);
  try {
    await onVerify(otp.join(""));
  } catch (err: unknown) {
    // Kiểm tra kiểu lỗi API
    const apiErr = err as APIError | Error;
    if ("error" in apiErr && apiErr.error === "Invalid OTP . Please try again.") {
      notifyWarning("OTP không đúng, vui lòng thử lại.");
      setOtp(Array(6).fill(""));
      setSecondsLeft(180);
      return;
    }

    if (apiErr instanceof Error) {
      notifyWarning(apiErr.message);
    } else {
      notifyWarning("Xác thực OTP thất bại");
    }
  } finally {
    setLoading(false);
  }
};

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <Box>
      <Typography variant="h6" mb={3} sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
        Nhập mã OTP gồm 6 chữ số đã được gửi tới email của bạn
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} mb={3}>
        {otp.map((val, idx) => (
          <TextField
            key={idx}
            id={`otp-${idx}`}
            value={val}
            onChange={(e) => handleChange(idx, e.target.value)}
            inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: "2rem", fontWeight: 500 } }}
            sx={{ width: 60 }}
            disabled={loading}
          />
        ))}
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={3}>
        <Typography variant="body1" sx={{ fontSize: "1.1rem", mb: 1 }}>
          Thời gian hết hạn
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontSize: "1.6rem", fontWeight: "bold", color: secondsLeft > 0 ? "#d32f2f" : "#999" }}
        >
          {secondsLeft > 0 ? formatTime(secondsLeft) : "OTP đã hết hạn"}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="outlined" onClick={onEditEmail} sx={{ fontSize: "1rem", px: 3, py: 1 }} disabled={loading}>
          Nhập lại email
        </Button>
        <Button variant="contained" onClick={handleSubmit} sx={{ fontSize: "1rem", px: 3, py: 1 }} disabled={loading}>
          Xác nhận OTP
        </Button>
      </Box>

      <Box display="flex" justifyContent="center">
        <Button
          variant="text"
          disabled={secondsLeft > 0 || loading}
          onClick={() => {
            setOtp(Array(6).fill(""));
            setSecondsLeft(180);
            onResend();
          }}
          sx={{ fontSize: "1rem" }}
        >
          Gửi lại
        </Button>
      </Box>
    </Box>
  );
};

export default OTPVerification;
