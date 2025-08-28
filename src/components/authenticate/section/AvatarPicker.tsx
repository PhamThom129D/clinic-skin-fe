"use client";
import React, { useRef, useMemo, ChangeEvent } from "react";
import { Avatar, Button, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

interface Props {
  avatarFile: File | null;
  onChooseFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AvatarPicker: React.FC<Props> = ({ avatarFile, onChooseFile }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const avatarPreview = useMemo(
    () => (avatarFile ? URL.createObjectURL(avatarFile) : ""),
    [avatarFile]
  );

  const handlePickAvatar = () => fileRef.current?.click();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
      <Avatar
        src={avatarPreview}
        sx={{ width: 96, height: 96, mb: 2, bgcolor: "#e5e7eb" }}
      >
        {!avatarPreview && <PersonIcon fontSize="large" sx={{ color: "#9ca3af" }} />}
      </Avatar>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onChooseFile}
      />
      <Button variant="contained" onClick={handlePickAvatar} size="small">
        CHỌN ẢNH ĐẠI DIỆN
      </Button>
    </Box>
  );
};

export default AvatarPicker;