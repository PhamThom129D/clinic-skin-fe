import { Typography } from "@mui/material";
import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <Typography variant="h4" textAlign="center" gutterBottom>
    {children}
  </Typography>
);

export default SectionTitle;
