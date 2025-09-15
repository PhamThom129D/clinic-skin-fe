"use client";

import { Controller, FieldValues, Path, Control, RegisterOptions } from "react-hook-form";
import { TextField, Box } from "@mui/material";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  rules?: RegisterOptions<T, Path<T>>;
  sx?: object;
  endAdornment?: React.ReactNode;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  rules,
  sx,
  endAdornment,
}: FormInputProps<T>) {
  return (
    <Box sx={{ my: 4 }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type={type}
            label={label}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
            variant="outlined"
            sx={sx}
            InputProps={{ endAdornment }}
          />
        )}
      />
    </Box>
  );
}
