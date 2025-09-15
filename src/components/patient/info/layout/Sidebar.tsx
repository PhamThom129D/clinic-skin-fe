// components/Sidebar.tsx
"use client";

import React from "react";
import { Box, Avatar, Typography, Divider, useTheme, List, ListItem, ListItemButton, ListItemIcon, ListItemText, hexToRgb } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockResetIcon from '@mui/icons-material/LockReset';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import SidebarSection from '../section/SidebarSection';
import { useUser } from "@/hooks/useUser";
import Link from 'next/link';
import { useRouter } from "next/navigation";

// Dữ liệu mẫu cho sidebar
const sidebarSections = [
  {
    title: "Thông tin cá nhân",
    mainIcon: <PersonIcon />,
    href: "/user/info",
    items: [
      { text: "Cập nhật thông tin tài khoản", icon: <AccountCircleIcon />, href: "/user/info/update-account" },
      { text: "Đổi mật khẩu", icon: <LockResetIcon />, href: "/user/info/change-password" },
      { text: "Quên mật khẩu", icon: <VpnKeyIcon />, href: "/user/info/forgot-password" },
    ],
  },
  {
    title: "Hồ sơ khám",
    mainIcon: <MedicalInformationIcon />,
    href: "/user/info/medical-records",
    items: [
      { text: "Hồ sơ khám", icon: <MedicalInformationIcon />, href: "/user/info/medical-records" },
    ],
  },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { account, logout } = useUser();
  const router = useRouter();

  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(
    sidebarSections.reduce((acc, section) => ({ ...acc, [section.title]: true }), {})
  );

  const handleToggle = (title: string, href?: string) => {
    setOpenSections(prev => {
    const newState = { ...prev, [title]: !prev[title] };
    if (href) {
      setTimeout(() => {
        router.push(href);
      }, 100); 
    }

    return newState;
  });
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
          cursor: "pointer",
        }}
        onClick={() => router.push('/user/info')}
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
              onClick={() => handleToggle(section.title, section.href)}
            />
            <Divider sx={{ my: 2 }} />
          </React.Fragment>
        ))}

        <ListItem disablePadding>
          <ListItemButton sx={{ borderRadius: 1, "&:hover": { backgroundColor: theme.palette.action.hover } }}>
            <ListItemIcon sx={{ color: theme.palette.error.main }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText onClick={logout} primary={<Typography fontWeight="medium" color="error">Đăng xuất</Typography>} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;