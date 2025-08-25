'use client';
import { useState } from "react";
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton } from "@mui/material";
import { Menu as MenuIcon, Close } from "@mui/icons-material";
import { theme } from "@/theme";
import Image from "next/image";

const menuItems = [
  { id: "banner", label: "Trang Chủ" },
  { id: "offers", label: "Ưu Đãi" },
  { id: "doctor-team", label: "Bác Sĩ" },
  { id: "contact-booking", label: "Liên Hệ" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: theme.palette.background.paper }} elevation={0}>
        <Toolbar sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",   // quan trọng: toolbar chiếm full width
          px: { xs: 1, sm: 2, md: 8 },
        }}>
          {/* Logo */}
          <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexShrink: 0, // không bị co nhỏ
          }}>
            <Image src="/images/logo.png" alt="Logo" height={40} width={100} style={{ objectFit: "contain" }} />
            <Box
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                fontSize: { xs: "0.7rem", sm: "0.9rem", md: "1.1rem" },
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: { xs: "none", sm: "block" } // ẩn text trên mobile
              }}
            >
              Phòng khám da liễu Codegym
            </Box>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
            {menuItems.map(item => (
              <Button key={item.id} sx={{ fontWeight: "bold", color: theme.palette.primary.main }} onClick={() => handleScroll(item.id)}>
                {item.label}
              </Button>
            ))}
            <Button variant="outlined" sx={{ borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}>Đăng nhập</Button>
          </Box>

          {/* Mobile Hamburger */}
          <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "flex-end", flex: 1 }}>
            <IconButton onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: "100vw", maxWidth: 300, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => setMobileOpen(false)}><Close /></IconButton>
          </Box>
          <List>
            {menuItems.map(item => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => handleScroll(item.id)}>{item.label}</ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton>Đăng nhập</ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Toolbar /> {/* Spacer */}
    </>
  );
}
