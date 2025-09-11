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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMenuByRole, MenuItemWithIcon } from "@/utils/menuHelper";
import { Role } from "@/utils/menuItem";
import { useRouter } from "next/navigation";




interface SidebarProps {
  open: boolean;
  role: Role; 
}

export default function Sidebar({ open, role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

const handleLogout = () => {
  localStorage.clear();
  sessionStorage.clear();
  
  router.push("/auth");
};

  // Lấy menu dựa trên role
  const menuItems: MenuItemWithIcon[] = getMenuByRole(role);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 280 : 72,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: open ? 280 : 72,
          boxSizing: "border-box",
          transition: "width 0.3s",
          pt: 10,
          overflowX: "hidden",
          borderRight: "none",
          background: "linear-gradient(180deg, #e6f7f9 0%, #ffffff 100%)",
          boxShadow: "2px 0 6px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Nội dung sidebar */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          {menuItems.map((item, idx) => {
            const isActive = pathname.includes(item.label.toLowerCase().replace(/\s+/g, "-")); // optional mapping path
            return (
              <ListItem key={idx} disablePadding>
              <Link
  href={getPathFromLabel(item.label)} 
  style={{ width: "100%", textDecoration: "none" }}
>
                  <ListItemButton
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      my: 0.5,
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2,
                      bgcolor: isActive ? "#e6f0f9" : "transparent",
                      color: isActive ? "#1976d2" : "#6b7280",
                      "&:hover": {
                        bgcolor: "#e6f0f9",
                        color: "#1976d2",
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
                        primaryTypographyProps={{ fontSize: 24, fontWeight: 500 }}
                      />
                    )}
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Nút Logout luôn nằm cuối */}
      <Box sx={{ p: 2 }}>
        <ListItem disablePadding>
     <ListItemButton
  sx={{
    borderRadius: 2,
    justifyContent: open ? "initial" : "center",
    px: 2,
    color: "#dc2626",
    "&:hover": {
      bgcolor: "#fee2e2",
      color: "#b91c1c",
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
      primary="Logout"
      primaryTypographyProps={{ fontSize: 24, fontWeight: 600 }}
    />
  )}
</ListItemButton>

        </ListItem>
      </Box>
    </Drawer>
  );
}
