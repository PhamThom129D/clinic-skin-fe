"use client";

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { getMenuByRole, MenuItemWithIcon } from "@/utils/menuHelper";
import { Role } from "@/utils/menuItem";


interface SidebarProps {
  open: boolean;
  role: Role;
  onMenuSelect: (menu: string) => void; 
}
import { useTheme } from "@mui/material/styles";

export default function Sidebar({ open, role, onMenuSelect }: SidebarProps) {
  const router = useRouter();
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/auth");
  };

  const menuItems: MenuItemWithIcon[] = getMenuByRole(role);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 360 : 72,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? 360 : 72,
          boxSizing: "border-box",
          transition: "width 0.3s",
          pt: 10,
          overflowX: "hidden",
          borderRight: "none",
          background: theme.palette.background.paper, 
          boxShadow: "2px 0 6px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          {menuItems.map((item, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemButton
                onClick={() => onMenuSelect(item.label)}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  my: 1,
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 3,
                  color: theme.palette.text.secondary, 
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "light"
                        ? "rgba(100,206,130,0.1)"
                        : "rgba(100,206,130,0.15)", 
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: 26, fontWeight: 500 }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 2,
              justifyContent: open ? "initial" : "center",
              px: 2,
              color: theme.palette.error.main, 
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "light"
                    ? "rgba(244,67,54,0.1)"
                    : "rgba(244,67,54,0.2)", 
                color: theme.palette.error.dark,
              },
            }}
            onClick={handleLogout}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : "auto",
                justifyContent: "center",
                color: "inherit",
              }}
            >
              <Logout />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Đăng xuất"
                primaryTypographyProps={{ fontSize: 28, fontWeight: 600 }}
              />
            )}
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
}
