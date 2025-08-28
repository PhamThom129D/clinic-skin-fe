// src/components/forms/OTPFieldsContainer.tsx
"use client";
import React from "react";
import { Box, TextField } from "@mui/material";

interface Props {
  otpInputs: string[];
  handleOtpChange: (index: number, value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
}

const OTPFieldsContainer: React.FC<Props> = ({ otpInputs, handleOtpChange, handleKeyDown }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mb: 3 }}>
    {Array.from({ length: 6 }).map((_, index) => (
      <TextField
        key={index}
        id={`otp-input-${index}`}
        variant="outlined"
        size="medium"
        value={otpInputs[index]}
        onChange={(e) => handleOtpChange(index, e.target.value)}
        slotProps={{
          input: {
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index),
            style: {
              textAlign: 'center',
              padding: '12px 0',
              width: '38px',
              height: '38px',
            },
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
      />
    ))}
  </Box>
);

export default OTPFieldsContainer;