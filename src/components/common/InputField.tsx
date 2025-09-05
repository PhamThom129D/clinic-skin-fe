import { TextField, TextFieldProps, useTheme, alpha } from "@mui/material";
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
}) => {
  const theme = useTheme();
  
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      fullWidth
      variant="outlined"
      InputLabelProps={type === "date" || type === "time" ? { shrink: true } : undefined}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
          background: "rgba(100, 206, 130, 0.03)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            background: "rgba(100, 206, 130, 0.06)",
            borderColor: theme.palette.primary.main,
            transform: "translateY(-2px)",
            boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            }
          },
          "&.Mui-focused": {
            background: "rgba(100, 206, 130, 0.08)",
            transform: "translateY(-2px)",
            boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            }
          },
          "&.Mui-error": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "error.main",
            }
          }
        },
        "& .MuiInputLabel-root": {
          fontWeight: 500,
          "&.Mui-focused": {
            color: "primary.main",
            fontWeight: 600,
          }
        },
        "& .MuiFormHelperText-root": {
          fontWeight: 500,
          fontSize: "0.75rem",
        }
      }}
      {...rest}
    />
  );
};

export default InputField;
