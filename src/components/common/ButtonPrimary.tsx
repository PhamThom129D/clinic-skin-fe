import { Button } from "@mui/material";
import React from "react";

interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  size?: "small" | "medium" | "large"; // cho phép tùy chỉnh
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  onClick,
  href,
  size = "large", 
}) => (
  <Button variant="contained" color="primary" size={size} onClick={onClick} href={href}>
    {children}
  </Button>
);

export default ButtonPrimary;
