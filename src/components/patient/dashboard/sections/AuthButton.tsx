"use client";
import { Box, IconButton, Button, useTheme, alpha, Popover, Stack} from "@mui/material";
import NotificationsIcon  from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useRouter } from "next/navigation";
import { logoutClient } from "@/services/authService";
import React, {useEffect, useState} from "react";

interface AccountInfo {
  fullName?: string;
  avatarUrl?: string;
  email?: string;
}

interface AuthButtonProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  fullWidth?: boolean;
  account?: AccountInfo | null;
}


export function BookingButton({ onClick, fullWidth = false }: { onClick: () => void; fullWidth?: boolean }) {
  const theme = useTheme();
  return (
    <Button
      variant={fullWidth ? "contained" : "contained"}
      color="error"
      startIcon={<EventAvailableIcon />}
      onClick={onClick}
      fullWidth={fullWidth}
      sx={{
        textTransform: "none",
        borderRadius: 3,
        px: 4,
        py: 1.5,
        fontWeight: "bold",
        fontSize: { xs: "0.875rem", sm: "1rem" },
        background: `linear-gradient(135deg, ${theme.palette.error.light}, ${theme.palette.error.main})`,
        color: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        "&:hover": {
          background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
          transform: "translateY(-2px) scale(1.02)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        },
      }}
    >
      Đặt lịch ngay
    </Button>
  );
}

export default function AuthButton({ isLoggedIn, setIsLoggedIn, fullWidth = false, account }: AuthButtonProps) {
  const theme = useTheme();
  const router = useRouter();

  console.log("AuthButton account:", account);

  const goToAuth = () => router.push("/auth");

  const handleLogout = () => {
    logoutClient();
    setIsLoggedIn(false);
  };

  const [avtDropdown, setAvtDropdown] = React.useState<null | HTMLElement>(null);
  const open = Boolean(avtDropdown);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAvtDropdown(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAvtDropdown(null);
  };

  return isLoggedIn ? (
    <Box display="flex" alignItems="center" gap={2}>
      {/* Notifications */}
      <IconButton
        color="primary"
        onClick={() => router.push("/notifications")}
        sx={{ "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.1) } }}
      >
        <NotificationsIcon  fontSize="medium" />
      </IconButton>

      {/* Avatar */}
      <IconButton
        onClick={handleMenuOpen}
        sx={{ p: 0 }}
      >
      <Avatar alt={account?.fullName} src={account?.avatarUrl || "/images/avatar.png"} />
      </IconButton>

      <Popover
        anchorEl={avtDropdown}
        open={open}
        onClose={handleMenuClose}
        disableScrollLock
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 2.5
            },
          },
        }}
      >

        <Stack spacing={1} sx={{ p: 1, minWidth: 200 }}>
          <Button
            onClick={() => router.push("/profile")}
            sx={{ justifyContent: "flex-start", "&:hover": {backgroundColor: "#d7d9da"} }}
          >
            Hồ sơ
          </Button>

          <Button
            onClick={() => router.push("/settings")}
            sx={{ justifyContent: "flex-start", "&:hover": {backgroundColor: "#d7d9da"} }}
          >
            Cài đặt
          </Button>

          <Button
            color="error"
            onClick={handleLogout}
            sx={{ justifyContent: "flex-start", "&:hover": {backgroundColor: "#d7d9da"} }}
          >
            Đăng xuất
          </Button>
        </Stack>
      </Popover>

    </Box>
  ) : (
    <Button
      variant={fullWidth ? "outlined" : "contained"}
      color="primary"
      startIcon={<LoginIcon />}
      onClick={goToAuth}
      fullWidth={fullWidth}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        px: 3,
        py: 1,
        fontWeight: "bold",
        boxShadow: fullWidth ? 0 : 3,
        "&:hover": {
          backgroundColor: fullWidth ? "#e0f7fa" : alpha(theme.palette.primary.main, 0.85),
          boxShadow: fullWidth ? 0 : 6,
        },
      }}
    >
      Đăng nhập
    </Button>
  );
}
