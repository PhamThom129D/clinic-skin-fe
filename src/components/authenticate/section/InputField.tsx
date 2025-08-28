"use client";

import React from "react";
import { TextField } from "@mui/material";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

const InputField: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    type={type}
    placeholder={placeholder}
    fullWidth
    variant="outlined"
    size="medium"
  />
);

export default InputField;
