import { Button, ButtonProps } from "@mui/material";
import React from "react";

// Kế thừa tất cả ButtonProps để dùng fullWidth, sx, type, variant, ...
interface ButtonPrimaryProps extends ButtonProps {
  children: React.ReactNode;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  variant = "contained",
  color = "primary",
  size = "large",
  ...props
}) => (
  <Button variant={variant} color={color} size={size} {...props}>
    {children}
  </Button>
);

export default ButtonPrimary;
