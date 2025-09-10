import React from "react";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

export interface GenderSelectProps {
  name: string;
  value: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  error?: boolean;
  helperText?: string;
}

const GenderSelect: React.FC<GenderSelectProps> = ({
  name,
  value,
  onChange,
  error = false,
  helperText,
}) => {
  return (
    <FormControl fullWidth error={error}>

      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        name={name}
        value={value}
        onChange={onChange}
        displayEmpty
      >
        <MenuItem value="" disabled style={{ display: 'none' }}>
          <em>-- Chọn giới tính --</em>
        </MenuItem>
        <MenuItem value="MALE">Nam</MenuItem>
        <MenuItem value="FEMALE">Nữ</MenuItem>
        <MenuItem value="OTHER">Khác</MenuItem>
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default GenderSelect;
