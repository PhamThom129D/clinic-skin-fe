"use client";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  useTheme,
  alpha,
} from "@mui/material";
import { Menu as MenuIcon, Close, AutoAwesome } from "@mui/icons-material";
import Image from "next/image";

import ThemeToggle from "@/components/ThemeToggle";
import BookingModal from "../sections/BookingModal";
import menuItems from "@/components/common/menuItems";
import MenuButton from "@/components/common/MenuButton";
import AuthButton, { BookingButton } from "../sections/AuthButton";
import { useRouter } from "next/navigation";


export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState<any>(null);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const router = useRouter();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check auth
  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };
    checkAuth();
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, []);

  // Get account info
  useEffect(() => {
    const accInfo = localStorage.getItem("account") || sessionStorage.getItem("account");
    if (accInfo) {
      try {
        const acc = JSON.parse(accInfo);
        setAccount(acc);
        setIsLoggedIn(true);
      } catch {
        setAccount(null);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: isDark
            ? `linear-gradient(135deg, ${alpha("#a02626ff", 0.05)} 0%, ${alpha(
                "#395335ff",
                0.95
              )} 95%, ${alpha("#ee9f37", 0.1)} 100%)`
            : `linear-gradient(135deg, ${alpha("#64ce82", 0.08)} 0%, ${alpha(
                "#52c0d3",
                0.08
              )} 50%, ${alpha("#ee9f37", 0.1)} 100%)`,
          backdropFilter: "blur(20px)",
          borderBottom: "none",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "none",
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
              "&:hover": { transform: "scale(1.02)" },
            }}
            onClick={() => router.push('/user/dashboard')}
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
                Clinic Skin
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
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {menuItems.map((item) => (
              <MenuButton
                key={item.id}
                label={item.label}
                onClick={() => handleScroll(item.id)}
                fullWidth={false}
                sx={{ fontSize: { sm: "1rem", md: "1.2rem" }, fontWeight: 500 }}
              />
            ))}

            <ThemeToggle />

        
            <BookingButton onClick={() => setBookingOpen(true)} />

    
            <AuthButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} account={account}/>
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
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
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
                <MenuButton
                  label={item.label}
                  onClick={() => handleScroll(item.id)}
                  fullWidth
                />
              </ListItem>
            ))}

            {/* Booking Button Mobile */}
            <ListItem disablePadding sx={{ mt: 2 }}>
              <BookingButton
                onClick={() => setBookingOpen(true)}
                fullWidth
              />
            </ListItem>

            {/* AuthButton Mobile */}
            <ListItem disablePadding sx={{ mt: 1 }}>
              <AuthButton
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                account={account}
                fullWidth
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
