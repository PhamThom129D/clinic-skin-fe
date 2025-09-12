"use client";
import React from "react";
import { Fab, useTheme, alpha } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function BackButton({ href = "/" }: { href?: string }) {
  const theme = useTheme();
  return (
    <Fab
      size="medium"
      onClick={() => window.location.href = href}
      sx={{
        background: `linear-gradient(135deg, ${alpha("#ffffff", 0.9)}, ${alpha("#f8f9fa", 0.9)})`,
        backdropFilter: "blur(20px)",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        color: theme.palette.primary.main,
        "&:hover": {
          background: `linear-gradient(135deg, ${alpha("#ffffff", 1)}, ${alpha("#f0f0f0", 1)})`,
          transform: "scale(1.05)",
        },
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <ArrowBack />
    </Fab>
  );
}
