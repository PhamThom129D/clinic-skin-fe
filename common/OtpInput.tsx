"use client";
import React, { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { Box, TextField, FormHelperText } from "@mui/material";

interface OtpInputProps {
  name: string;
  control: UseControllerProps["control"];
}

export const OtpInput: React.FC<OtpInputProps> = ({ name, control }) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control });

  // Khởi tạo state cục bộ với một mảng rỗng có 6 phần tử.
  // Điều này đảm bảo giá trị luôn xác định, không bao giờ là undefined.
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Đồng bộ giá trị của react-hook-form với state cục bộ
    // Đảm bảo value luôn là một chuỗi, tránh undefined
    if (value && typeof value === 'string') {
      const sanitizedValue = value.slice(0, 6);
      setOtp(sanitizedValue.split(""));
    } else {
      setOtp(Array(6).fill(""));
    }
  }, [value]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    // Chỉ cho phép nhập một chữ số
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Cập nhật giá trị vào react-hook-form
    onChange(newOtp.join(""));

    // Tự động chuyển focus đến ô tiếp theo
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Xử lý phím "Backspace"
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
      {otp.map((digit, index) => (
        <TextField
          key={index}
          // Đảm bảo value luôn có giá trị
          value={digit} 
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
          onBlur={onBlur}
          inputRef={el => (inputRefs.current[index] = el)}
          inputProps={{
            maxLength: 1,
            style: { textAlign: 'center' },
          }}
          sx={{
            width: 48,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: '2px',
              },
            },
          }}
          error={!!error}
        />
      ))}
      {error && (
        <FormHelperText error sx={{ textAlign: 'center' }}>
          {error.message}
        </FormHelperText>
      )}
    </Box>
  );
};
export default OtpInput;