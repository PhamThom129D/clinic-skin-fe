// components/Sidebar.tsx
"use client";

import React from "react";
import { Box, Avatar, Typography, Divider, useTheme, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockResetIcon from '@mui/icons-material/LockReset';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SidebarSection from './SidebarSection';
import { logoutClient } from "@/services/authService";
import { AuthResponse } from "@/types/auth"; 

export interface AccountInfo extends Pick<AuthResponse, "fullName" | "avatarUrl" | "phoneNumber"> {}

interface AccountDropdownProps {
  setIsLoggedIn: (val: boolean) => void;
  account?: AccountInfo | null;
}

// Dữ liệu mẫu cho sidebar
const sidebarSections = [
  {
    title: "Thông tin cá nhân",
    mainIcon: <PersonIcon />,
    items: [
      { text: "Thông tin cá nhân", icon: <AccountCircleIcon />, href: "/patient/info/update-account" },
      { text: "Cập nhật thông tin tài khoản", icon: <AccountCircleIcon />, href: "/patient/info/update-account" },
      { text: "Đổi mật khẩu", icon: <LockResetIcon />, href: "/patient/info/change-password" },
      { text: "Quên mật khẩu", icon: <VpnKeyIcon />, href: "/patient/info/forgot-password" },
    ],
  },
  {
    title: "Lịch sử dịch vụ",
    mainIcon: <HistoryIcon />,
    items: [
      { text: "Dịch vụ đã mua", icon: <HistoryIcon />, href: "/patient/info/purchased-services" },
    ],
  },
  {
    title: "Hồ sơ khám",
    mainIcon: <MedicalInformationIcon />,
    items: [
      { text: "Hồ sơ khám", icon: <MedicalInformationIcon />, href: "/patient/info/medical-records" },
    ],
  },
];

const Sidebar: React.FC<AccountDropdownProps> = ({ setIsLoggedIn, account }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleLogout = () => {
    logoutClient();
    setIsLoggedIn(false);
  };

  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(
    sidebarSections.reduce((acc, section) => ({ ...acc, [section.title]: true }), {})
  );

  const handleToggle = (title: string) => {
    setOpenSections(prevState => ({
      ...prevState,
      [title]: !prevState[title]
    }));
  };

  const user = account || {
    avatarUrl: "/images/avatar.png",
    fullName: "Khách",
    phoneNumber: ""
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: isDark ? theme.palette.background.paper : theme.palette.common.white,
        p: 2,
        color: isDark ? theme.palette.text.primary : theme.palette.text.secondary,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          mb: 2,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Avatar src={user.avatarUrl} alt={user.fullName} sx={{ width: 80, height: 80, mb: 1.5, border: `2px solid ${theme.palette.common.white}` }} />
        <Typography variant="h6" fontWeight="bold">{user.fullName}</Typography>
        <Typography variant="body2">{user.phoneNumber}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <List>
        {sidebarSections.map((section) => (
          <React.Fragment key={section.title}>
            <SidebarSection
              title={section.title}
              mainIcon={section.mainIcon}
              items={section.items}
              isOpen={openSections[section.title]}
              onClick={() => handleToggle(section.title)}
            />
            <Divider sx={{ my: 2 }} />
          </React.Fragment>
        ))}

        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 1, "&:hover": { backgroundColor: theme.palette.action.hover } }}>
            <ListItemIcon sx={{ color: theme.palette.error.main }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText onClick={handleLogout} primary={<Typography fontWeight="medium" color="error">Đăng xuất</Typography>} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;