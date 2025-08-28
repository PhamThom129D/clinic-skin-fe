import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

interface InputFieldProps extends Omit<TextFieldProps, 'onChange'> {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  ...rest
}) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    type={type}
    fullWidth
    variant="outlined"
    InputLabelProps={type === "date" || type === "time" ? { shrink: true } : undefined}
    {...rest}
  />
);

export default InputField;
