// src/components/authenticate/login/EmailInputField.tsx
"use client";
import React, { ChangeEvent } from "react";
import InputField from "./InputField";

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const EmailInputField: React.FC<Props> = ({ value, onChange }) => (
  <InputField
    label="Email"
    name="email"
    type="email"
    value={value}
    onChange={onChange}
    placeholder="example@gmail.com"
  />
);

export default EmailInputField;