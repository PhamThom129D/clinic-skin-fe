"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon, Close } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ThemeToggle from "@/components/ThemeToggle";
import BookingModal from "../sections/BookingModal";
import menuItems from "@/components/common/menuItems";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const goToAuth = () => {
    router.push("/auth");
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ bgcolor: theme.palette.background.paper }}
        elevation={0}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            px: { xs: 1, sm: 2, md: 8 },
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              height={40}
              width={100}
              style={{ objectFit: "contain" }}
            />
            <Box
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                fontSize: { xs: "0.7rem", sm: "0.9rem", md: "1.1rem" },
                display: { xs: "none", sm: "block" },
              }}
            >
              Phòng khám da liễu Codegym
            </Box>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
                onClick={() => handleScroll(item.id)}
              >
                {item.label}
              </Button>
            ))}

            <Button variant="contained" sx={{ ml: 1 }} onClick={() => setBookingOpen(true)}>
              Đặt lịch
            </Button>

            <Button
              variant="outlined"
              sx={{ borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}
              onClick={goToAuth} // redirect
            >
              Đăng nhập
            </Button>
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
            <IconButton onClick={() => setMobileOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => handleScroll(item.id)}>
                  {item.label}
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setBookingOpen(true)}>Đặt lịch</ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={goToAuth}>Đăng nhập</ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ThemeToggle />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Toolbar /> {/* Spacer */}
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
