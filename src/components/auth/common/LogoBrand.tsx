"use client";
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { LocalHospital } from "@mui/icons-material";

export default function LogoBrand() {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <LocalHospital 
        sx={{ fontSize: 32, color: theme.palette.primary.main, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }} 
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Thu Cúc Clinic
      </Typography>
    </Box>
  );
}
