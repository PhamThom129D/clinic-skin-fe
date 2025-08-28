import React from "react";
import { TextField, MenuItem } from "@mui/material";

interface GenderSelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({ name, value, onChange }) => {
  return (
    <TextField
      select
      fullWidth
      label="Giới tính"
      name={name}
      value={value}
      onChange={onChange}
    >
      <MenuItem value="Male">Nam</MenuItem>
      <MenuItem value="Female">Nữ</MenuItem>
      <MenuItem value="Other">Khác</MenuItem>
    </TextField>
  );
};

export default GenderSelect;
