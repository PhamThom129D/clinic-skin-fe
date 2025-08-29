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
      fontSize: "1.5rem", // chữ to hơn
      fontWeight: 600,    // chữ đậm
      ...sx,              // vẫn giữ các style truyền từ ngoài
    }}
    {...props}
  >
    {children}
  </Button>
);

export default ButtonPrimary;
