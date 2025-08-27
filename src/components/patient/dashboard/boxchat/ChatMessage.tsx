"use client"; 

import { Box, Typography } from "@mui/material";
import React from "react";

interface ChatMessageProps { text: string; sender?: "A" | "user"; }

export const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender = "A" }) => (
  <Box sx={{
    mb: 1, p: 1.5, maxWidth: "80%",
    bgcolor: sender === "A" ? "#e0f7fa" : "#f0f0f0",
    color: sender === "A" ? "#00796b" : "inherit",
    borderRadius: 2, alignSelf: sender === "A" ? "flex-start" : "flex-end",
    wordBreak: "break-word", boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  }}>
    <Typography variant="body2">{text}</Typography>
  </Box>
);
