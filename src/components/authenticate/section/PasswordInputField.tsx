// src/components/authenticate/login/PasswordInputField.tsx
"use client";
import React, { ChangeEvent } from "react";
import InputField from "./InputField";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PasswordInputField: React.FC<Props> = ({ value, onChange }) => (
  <InputField
    label="Mật khẩu"
    name="password"
    type="password"
    value={value}
    onChange={onChange}
    placeholder="••••••••"

  />
);

export default PasswordInputField;