"use client";
import React from 'react';
import { Popover, Stack, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { logoutClient } from "@/services/authService";

interface AccountDropdownProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  setIsLoggedIn: (val: boolean) => void;
}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({ anchorEl, open, onClose, setIsLoggedIn }) => {
  const router = useRouter();

  const handleLogout = () => {
    logoutClient();
    setIsLoggedIn(false);
    onClose();
  };

  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      disableScrollLock
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        paper: {
          sx: {
            mt: 2.5,
          },
        },
      }}
    >
      <Stack spacing={1} sx={{ p: 1, minWidth: 200 }}>
        <Button
          onClick={() => {
            router.push("/user/info");
            onClose();
          }}
          sx={{ justifyContent: "flex-start", "&:hover": { backgroundColor: "#d7d9da" } }}
        >
          Hồ sơ
        </Button>

        <Button
          onClick={() => {
            router.push("/user/setting");
            onClose();
          }}
          sx={{ justifyContent: "flex-start", "&:hover": { backgroundColor: "#d7d9da" } }}
        >
          Cài đặt
        </Button>

        <Button
          color="error"
          onClick={handleLogout}
          sx={{ justifyContent: "flex-start", "&:hover": { backgroundColor: "#d7d9da" } }}
        >
          Đăng xuất
        </Button>
      </Stack>
    </Popover>
  );
};