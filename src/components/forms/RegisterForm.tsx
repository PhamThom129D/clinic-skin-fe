"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Paper, Typography, Link } from "@mui/material";
import AvatarPicker  from "../authenticate/section/AvatarPicker";
import RegistrationFields from "../authenticate/layout/RegistrationFields";
import SubmitButton from "../authenticate/section/SubmitButton";

export default function RegisterForm() {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    avatarFile: null as File | null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleChooseFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setForm((s) => ({ ...s, avatarFile: f }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Register form:", form);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 760,
        borderRadius: 3,
        p: { xs: 3, md: 5 },
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" align="center" fontWeight={600} mb={3}>
        Đăng ký tài khoản
      </Typography>

      <AvatarPicker avatarFile={form.avatarFile} onChooseFile={handleChooseFile} />

      <RegistrationFields form={form} handleChange={handleChange} />

      <Box mt={3}>
        <SubmitButton text="ĐĂNG KÝ" fullWidth />
      </Box>

      <Typography mt={2} textAlign="center" variant="body2" color="text.secondary">
        Đã có tài khoản?{" "}
        <Link href="/authenticate/login" underline="hover">
          Đăng nhập ngay
        </Link>
      </Typography>
    </Paper>
  );
}