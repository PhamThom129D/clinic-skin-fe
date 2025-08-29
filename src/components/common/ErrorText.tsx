// src/components/common/ErrorText.tsx
import React from "react";
import { Typography } from "@mui/material";

interface ErrorTextProps {
  children?: React.ReactNode;
}

const ErrorText: React.FC<ErrorTextProps> = ({ children }) => {
  if (!children) return null;

  return (
    <Typography variant="body2" className="text-red-500 text-sm mt-1" role="alert">
      {children}
    </Typography>
  );
};

export default ErrorText;
