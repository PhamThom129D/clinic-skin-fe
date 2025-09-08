"use client";
import { useState, useEffect } from "react";
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
  alpha,
} from "@mui/material";
import { Menu as MenuIcon, Close, AutoAwesome } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ThemeToggle from "@/components/ThemeToggle";
import BookingModal from "../sections/BookingModal";
import menuItems from "@/components/common/menuItems";
import { logoutClient } from "@/services/authService";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const theme = useTheme();
  const router = useRouter();

  // Theo dõi scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };


    checkAuth(); 

    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, []);


  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const goToAuth = () => {
    router.push("/auth");
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logoutClient(); // Gọi hàm từ authService
    setIsLoggedIn(false);
    setMobileOpen(false);
  };

  const isDark = theme.palette.mode === "dark";

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled
            ? isDark
              ? `linear-gradient(135deg, 
                  ${alpha("#1a1a1a", 0.95)} 0%, 
                  ${alpha("#2d2d2d", 0.95)} 100%)`
              : `linear-gradient(135deg, 
                  ${alpha("#ffffff", 0.95)} 0%, 
                  ${alpha("#f8f9fa", 0.95)} 100%)`
            : isDark
              ? `linear-gradient(135deg, 
                ${alpha("#64ce82", 0.1)} 0%, 
                ${alpha("#52c0d3", 0.1)} 50%, 
                ${alpha("#ee9f37", 0.1)} 100%)`
              : `linear-gradient(135deg, 
                ${alpha("#64ce82", 0.08)} 0%, 
                ${alpha("#52c0d3", 0.08)} 50%, 
                ${alpha("#ee9f37", 0.08)} 100%)`,
          backdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            : "none",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: scrolled
            ? `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`
            : "none",
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            px: { xs: 2, sm: 4, md: 8 },
            py: { xs: 1, sm: 1.5 },
            minHeight: { xs: 64, sm: 70 },
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexShrink: 0,
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Image
              src="/images/logo.png"
              alt="Thu Cúc Clinic Logo"
              height={48}
              width={120}
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))",
              }}
            />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Box
                sx={{
                  fontWeight: "800",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { sm: "1rem", md: "1.2rem" },
                }}
              >
                Thu Cúc Clinic
              </Box>
              <Box
                sx={{
                  fontSize: "0.75rem",
                  color: alpha(theme.palette.text.secondary, 0.8),
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <AutoAwesome sx={{ fontSize: "0.8rem" }} />
                Chăm sóc da chuyên nghiệp
              </Box>
            </Box>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
            {menuItems.map((item) => (
              <Button key={item.id} onClick={() => handleScroll(item.id)}>
                {item.label}
              </Button>
            ))}

            <Box sx={{ mx: 1 }}>
              <ThemeToggle />
            </Box>

            <Button variant="contained" onClick={() => setBookingOpen(true)}>
              Đặt lịch ngay
            </Button>

            {isLoggedIn ? (
              <Button variant="outlined" color="error" onClick={handleLogout}>
                Đăng xuất
              </Button>
            ) : (
              <Button variant="outlined" onClick={goToAuth}>
                Đăng nhập
              </Button>
            )}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ThemeToggle />
            <IconButton onClick={() => setMobileOpen(true)}>
              <MenuIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: "100vw", maxWidth: 320, p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Box sx={{ fontWeight: "700" }}>Menu</Box>
            <IconButton onClick={() => setMobileOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <List>
            {menuItems.map((item) => (
              <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton onClick={() => handleScroll(item.id)}>
                  {item.label}
                </ListItemButton>
              </ListItem>
            ))}

            <ListItem disablePadding sx={{ mt: 2 }}>
              <Button fullWidth variant="contained" onClick={() => setBookingOpen(true)}>
                Đặt lịch ngay
              </Button>
            </ListItem>

            <ListItem disablePadding sx={{ mt: 1 }}>
              {isLoggedIn ? (
                <Button fullWidth variant="outlined" color="error" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              ) : (
                <Button fullWidth variant="outlined" onClick={goToAuth}>
                  Đăng nhập
                </Button>
              )}
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
