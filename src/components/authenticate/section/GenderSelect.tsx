"use client";

import React from "react";
import { MenuItem, TextField } from "@mui/material";

const genders = [
  { value: "MALE", label: "Nam" },
  { value: "FEMALE", label: "Nữ" },
  { value: "OTHER", label: "Khác" },
];

interface Props {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const GenderSelect: React.FC<Props> = ({ name, value, onChange, placeholder }) => (
  <TextField
    select
    fullWidth
    label={placeholder || "Giới tính"}
    name={name}
    value={value}
    onChange={onChange}
    variant="outlined"
    size="medium"
  >
    <MenuItem value="">-- Chọn giới tính --</MenuItem>
    {genders.map((gender) => (
      <MenuItem key={gender.value} value={gender.value}>
        {gender.label}
      </MenuItem>
    ))}
  </TextField>
);

export default GenderSelect;
