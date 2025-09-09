"use client";
import {
  Box,
  IconButton,
  Button,
  useTheme,
  alpha,
  Avatar,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LoginIcon from "@mui/icons-material/Login";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { NotificationsDropdown } from "./NotificationsDropdown"; 
import { AccountDropdown } from "./AccountDropdown"; 
import { AuthResponse } from "@/types/auth"; 

export interface AccountInfo extends Pick<AuthResponse, "fullName" | "avatarUrl" | "email"> {}

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
      variant={fullWidth ? "outlined" : "contained"}
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

  const goToAuth = () => router.push("/auth");

  const [avtDropdown, setAvtDropdown] = useState<null | HTMLElement>(null);
  const openAvt = Boolean(avtDropdown);
  const handleAvtOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAvtDropdown(event.currentTarget);
  };
  const handleAvtClose = () => {
    setAvtDropdown(null);
  };

  const [notifDropdown, setNotifDropdown] = useState<null | HTMLElement>(null);
  const openNotif = Boolean(notifDropdown);
  const handleNotifOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotifDropdown(event.currentTarget);
  };
  const handleNotifClose = () => {
    setNotifDropdown(null);
  };

  // set tạm có 3 thông báo chưa đọc
  const [unreadCount, setUnreadCount] = useState(3);

  return isLoggedIn ? (
    <Box display="flex" alignItems="center" gap={2}>
      {/* Notifications Icon */}
      <Badge
        badgeContent={unreadCount}
        color="error"
        invisible={unreadCount === 0}
        sx={{ "& .MuiBadge-badge": { top: 6, right: 6 } }}
      >
        <IconButton
          color="primary"
          onClick={handleNotifOpen}
          sx={{ "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.1) } }}
        >
          <NotificationsIcon fontSize="medium" />
        </IconButton>
      </Badge>
      
      {/* Notifications Dropdown */}
      <NotificationsDropdown 
        anchorEl={notifDropdown} 
        open={openNotif} 
        onClose={handleNotifClose} 
        onUnreadCountChange={setUnreadCount} 
      />

      {/* Avatar Icon */}
      <IconButton onClick={handleAvtOpen} sx={{ p: 0 }}>
        <Avatar alt={account?.fullName} src={account?.avatarUrl || "/images/avatar.png"} />
      </IconButton>

      {/* Account Dropdown */}
      <AccountDropdown anchorEl={avtDropdown} open={openAvt} onClose={handleAvtClose} setIsLoggedIn={setIsLoggedIn} />
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