// src/components/forms/LoginForm.tsx
"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Paper, Typography, Link } from "@mui/material";
import LoginFormFields from "../authenticate/layout/LoginFields";
import SubmitButton from "../authenticate/section/SubmitButton";

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Login form:", form);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 400,
        borderRadius: 3,
        p: { xs: 3, md: 5 },
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" align="center" fontWeight={600} mb={3}>
        Đăng nhập
      </Typography>

      <LoginFormFields form={form} handleChange={handleChange} />

        <Box sx={{ textAlign: 'right', mt: -1, mb: 2 }}>
        <Link href="/authenticate/forgotpassword" variant="body2" underline="hover">
          Quên mật khẩu?
        </Link>
      </Box>

      <Box mt={3}>
        <SubmitButton text="ĐĂNG NHẬP" fullWidth />
      </Box>

      <Typography mt={2} textAlign="center" variant="body2" color="text.secondary">
        Chưa có tài khoản?{" "}
        <Link href="/authenticate/register" underline="hover">
          Đăng ký ngay
        </Link>
      </Typography>
    </Paper>
  );
}