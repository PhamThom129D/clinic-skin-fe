"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  Mail,
  Notifications,
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  Home,
  Logout,
  AccountCircle,
  Settings,
  CalendarToday,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

import MessageDropdown from "../components/MessageDropdown";
import NotificationDropdown from "../components/NotificationDropdown";

interface User {
  fullName: string;
  avatarUrl: string;
  roles: string[];
  [key: string]: any;
}

interface HeaderProps {
  onToggleSidebar: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const ringAnimation = {
  "@keyframes ring": {
    "0%": { transform: "rotate(0)" },
    "15%": { transform: "rotate(8deg)" },
    "30%": { transform: "rotate(-8deg)" },
    "45%": { transform: "rotate(6deg)" },
    "60%": { transform: "rotate(-6deg)" },
    "75%": { transform: "rotate(3deg)" },
    "100%": { transform: "rotate(0)" },
  },
};

const formatDateTime = (date: Date) => {
  const days = ["Chủ Nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"];
  const dayName = days[date.getDay()];
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${dayName}, ${d}/${m}/${y} - ${h}:${min}:${s}`;
};

export default function Header({ onToggleSidebar, darkMode, onToggleDarkMode }: HeaderProps) {
  const router = useRouter();
  const [messageAnchor, setMessageAnchor] = useState<HTMLElement | null>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<HTMLElement | null>(null);
  const [accountAnchor, setAccountAnchor] = useState<HTMLElement | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user, setUser] = useState<User | null>(null);

  // Đồng hồ
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);



  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/auth");
  };

  return (
    <AppBar position="fixed" color="inherit" elevation={1} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ position: "relative", minHeight: 128 }}>
        <IconButton edge="start" color="inherit" onClick={onToggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon sx={{ fontSize: 40 }} />
        </IconButton>

        <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f3b70" }}>
          ClinicSkin
        </Typography>

        <Box sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontWeight: 500, color: "#0f3b70", fontSize: { xs: "0.85rem", sm: "1rem", md: "1.1rem" } }}>
          {formatDateTime(currentTime)}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
          <IconButton color="inherit" sx={{ mx: 1.5 }}>
            <Home sx={{ fontSize: 40, color: "#0f3b70" }} />
          </IconButton>

          {/* Toggle dark mode */}
          <IconButton color="inherit" sx={{ mx: 1.5 }} onClick={onToggleDarkMode}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton color="inherit" sx={{ mx: 1.5 }} onClick={() => router.push("/schedule-register")}>
            <CalendarToday sx={{ fontSize: 36, color: "#0f3b70" }} />
          </IconButton>

          <IconButton sx={{ mx: 1.5 }} onClick={(e) => setMessageAnchor(e.currentTarget)}>
            <Badge badgeContent={3} color="error"><Mail sx={{ fontSize: 36 }} /></Badge>
          </IconButton>
          <MessageDropdown anchorEl={messageAnchor} onClose={() => setMessageAnchor(null)} />

          <IconButton sx={{ mx: 1.5 }} onClick={(e) => setNotificationAnchor(e.currentTarget)}>
            <Badge badgeContent={7} color="error"><Notifications sx={{ fontSize: 36 }} /></Badge>
          </IconButton>
          <NotificationDropdown anchorEl={notificationAnchor} onClose={() => setNotificationAnchor(null)} />

          <IconButton onClick={(e) => setAccountAnchor(e.currentTarget)} sx={{ ml: 2 }}>
            <Avatar alt={user?.fullName || "User"} src={user?.avatarUrl || "/avatar.png"} sx={{ width: 50, height: 50 }} />
          </IconButton>

          <Menu anchorEl={accountAnchor} open={Boolean(accountAnchor)} onClose={() => setAccountAnchor(null)} PaperProps={{ sx: { mt: 1, width: 220, borderRadius: 2 } }} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }}>
            {user && (
              <Box sx={{ px: 2, py: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="subtitle1" fontWeight="bold">{user.fullName}</Typography>
                <Typography variant="body2" color="text.secondary">{user.roles.join(", ")}</Typography>
              </Box>
            )}
            <Divider />
            <MenuItem onClick={() => console.log("Profile")}><ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon> Hồ sơ cá nhân</MenuItem>
            <MenuItem onClick={() => console.log("Settings")}><ListItemIcon><Settings fontSize="small" /></ListItemIcon> Cài đặt</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <ListItemIcon><Logout fontSize="small" sx={{ color: "error.main" }} /></ListItemIcon> Đăng xuất
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
