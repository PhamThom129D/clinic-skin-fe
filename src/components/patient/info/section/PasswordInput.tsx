"use client";

import { useState } from "react";
import { IconButton, InputAdornment, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormInput } from "@/components/common/FormInput";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

interface PasswordInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rules?: RegisterOptions<T, Path<T>>;
}

export function PasswordInput<T extends FieldValues>({
  name,
  control,
  label,
  rules,
}: PasswordInputProps<T>) {
  const theme = useTheme();
  const [show, setShow] = useState(false);

  return (
    <FormInput
      name={name}
      control={control}
      label={label}
      type={show ? "text" : "password"}
      rules={rules}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={() => setShow((v) => !v)}
            edge="end"
            size="small"
            sx={{ color: theme.palette.primary.main }}
          >
            {show ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
}
