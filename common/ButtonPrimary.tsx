import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface ButtonPrimaryProps extends ButtonProps {
  children: React.ReactNode;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  variant = "contained",
  color = "primary",
  size = "large",
  sx,
  ...props
}) => (
  <Button
    variant={variant}
    color={color}
    size={size}
    sx={{
      fontSize: "1rem",
      fontWeight: 600,
      borderRadius: 3,
      py: 1.5,
      textTransform: "none",
      boxShadow: "none",
      background: "linear-gradient(135deg, #64ce82, #4caf50)",
      "&:hover": {
        background: "linear-gradient(135deg, #4caf50, #388e3c)",
        transform: "translateY(-2px)",
        boxShadow: "0 8px 25px rgba(100, 206, 130, 0.3)",
      },
      "&:active": {
        transform: "translateY(0)",
      },
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      ...sx,
    }}
    {...props}
  >
    {children}
  </Button>
);

export default ButtonPrimary;
