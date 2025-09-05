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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  // Theo dõi scroll để thay đổi header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const goToAuth = () => {
    router.push("/auth");
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
          {/* Logo với hiệu ứng hover đẹp */}
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
              }
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Box
              sx={{
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: -2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  borderRadius: "50%",
                  opacity: 0.2,
                  animation: "pulse 2s ease-in-out infinite",
                },
              }}
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
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              <Box
                sx={{
                  fontWeight: "800",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { sm: "1rem", md: "1.2rem" },
                  letterSpacing: "0.5px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Thu Cúc Clinic
              </Box>
              <Box
                sx={{
                  fontSize: "0.75rem",
                  color: alpha(theme.palette.text.secondary, 0.8),
                  fontWeight: 500,
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

          {/* Desktop Menu với hiệu ứng hover sang trọng */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                sx={{ 
                  fontWeight: "600",
                  color: theme.palette.text.primary,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
                    transition: "left 0.5s ease",
                  },
                  "&:hover": {
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.secondary.main, 0.08)})`,
                    transform: "translateY(-1px)",
                    color: theme.palette.primary.main,
                    "&::before": {
                      left: "100%",
                    }
                  }
                }}
                onClick={() => handleScroll(item.id)}
              >
                {item.label}
              </Button>
            ))}

            {/* Theme Toggle với animation */}
            <Box sx={{ mx: 1 }}>
              <ThemeToggle />
            </Box>

            {/* Booking Button với gradient và glow effect */}
            <Button 
              variant="contained" 
              sx={{ 
                ml: 1,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: "white",
                fontWeight: "600",
                px: 3,
                py: 1.2,
                borderRadius: 3,
                boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
                  transform: "translateY(-2px)",
                  boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
                }
              }} 
              onClick={() => setBookingOpen(true)}
            >
              Đặt lịch ngay
            </Button>

            {/* Login Button với outline gradient */}
            <Button
              variant="outlined"
              sx={{ 
                ml: 1,
                borderWidth: 2,
                borderStyle: "solid",
                borderImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}) 1`,
                color: theme.palette.primary.main,
                fontWeight: "600",
                px: 3,
                py: 1,
                borderRadius: 3,
                background: "transparent",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.secondary.main, 0.08)})`,
                  transform: "translateY(-1px)",
                  boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.2)}`,
                }
              }}
              onClick={goToAuth}
            >
              Đăng nhập
            </Button>
          </Box>

          {/* Mobile Menu với animation */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
            <ThemeToggle />
            <IconButton 
              onClick={() => setMobileOpen(true)}
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
                  transform: "scale(1.05)",
                }
              }}
            >
              <MenuIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer với thiết kế đẹp */}
      <Drawer 
        anchor="right" 
        open={mobileOpen} 
        onClose={() => setMobileOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            background: isDark 
              ? `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)`
              : `linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)`,
            backdropFilter: "blur(20px)",
            borderLeft: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }
        }}
      >
        <Box sx={{ width: "100vw", maxWidth: 320, p: 3 }}>
          {/* Header của drawer */}
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            mb: 3,
            pb: 2,
            borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}>
            <Box
              sx={{
                fontWeight: "700",
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.1rem",
              }}
            >
              Menu
            </Box>
            <IconButton 
              onClick={() => setMobileOpen(false)}
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
                }
              }}
            >
              <Close />
            </IconButton>
          </Box>

          <List sx={{ p: 0 }}>
            {menuItems.map((item, index) => (
              <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  onClick={() => handleScroll(item.id)}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.secondary.main, 0.08)})`,
                      transform: "translateX(8px)",
                    }
                  }}
                >
                  <Box
                    sx={{
                      fontWeight: "500",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {item.label}
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
            
            {/* Booking button trong mobile */}
            <ListItem disablePadding sx={{ mt: 2, mb: 1 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => setBookingOpen(true)}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "600",
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
                  }
                }}
              >
                Đặt lịch ngay
              </Button>
            </ListItem>
            
            {/* Login button trong mobile */}
            <ListItem disablePadding>
              <Button
                fullWidth
                variant="outlined"
                onClick={goToAuth}
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "600",
                  "&:hover": {
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.secondary.main, 0.08)})`,
                  }
                }}
              >
                Đăng nhập
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Spacer với animation */}
      <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }} />
      
      {/* Booking Modal */}
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      
      {/* CSS cho animation */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  );
}
