// src/components/forms/LoginFormFields.tsx
"use client";
import React, { ChangeEvent } from "react";
import { Box } from "@mui/material";
import EmailInputField from "../section/EmailInputField";
import PasswordInputField from "../section/PasswordInputField";

interface Props {
  form: {
    email: string;
    password: string;
  };
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const LoginFormFields: React.FC<Props> = ({ form, handleChange }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
    <EmailInputField value={form.email} onChange={handleChange} />
    <PasswordInputField value={form.password} onChange={handleChange} />
  </Box>
);

export default LoginFormFields;