import { Card, CardContent, Avatar, Typography, Box, SxProps, Theme } from "@mui/material";
import React from "react";

interface AvatarCardProps {
  name: string;
  role?: string;
  text?: string;
  img: string;
  sx?: SxProps<Theme>; // cho phép truyền style từ ngoài
}

const AvatarCard: React.FC<AvatarCardProps> = ({ name, role, text, img, sx }) => (
  <Card
    sx={{
      p: 3,
      textAlign: "center",
      transition: "all 0.35s ease",
      borderRadius: 3,
      backgroundColor: "#fdfdfd", // nền sáng cố định, không bị darkmode ảnh hưởng
      border: "1px solid #d6f0e0",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 8px 24px rgba(21,132,55,0.15)",
        background: "linear-gradient(135deg, #e0f7f0, #ffffff)",
        borderColor: "#52b788",
      },
      ...sx, // merge style từ ngoài
    }}
  >
    <CardContent>
      <Avatar
        src={img}
        alt={name}
        sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
      />
      <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
        {name}
      </Typography>
      {role && (
        <Typography color="text.secondary" sx={{ mb: text ? 1 : 0 }}>
          {role}
        </Typography>
      )}
      {text && (
        <Typography color="text.secondary" fontStyle="italic">
          “{text}”
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default AvatarCard;
