"use client";
import React, { useRef } from "react";
import { Avatar, Button, Box, Typography } from "@mui/material";

interface AvatarUploadProps {
  preview?: string | null;
  onChange?: (file: File | null) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ preview, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (onChange) onChange(file);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Avatar
        src={preview || "/default-avatar.png"}
        alt="Avatar Preview"
        sx={{ width: 120, height: 120, mb: 1, border: "2px solid #1976d2" }}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // ẩn hoàn toàn input
      />
      <Button variant="contained" color="primary" size="medium" onClick={handleClick}>
        Chọn ảnh đại diện
      </Button>
    </Box>
  );
};

export default AvatarUpload;
