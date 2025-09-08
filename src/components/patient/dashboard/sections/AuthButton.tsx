"use client";
import { Button, useTheme, alpha } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useRouter } from "next/navigation";
import { logoutClient } from "@/services/authService";

interface AuthButtonProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  fullWidth?: boolean;
}

export function BookingButton({ onClick, fullWidth = false }: { onClick: () => void; fullWidth?: boolean }) {
  const theme = useTheme();
  return (
    <Button
      variant={fullWidth ? "contained" : "contained"}
      color="error"
      startIcon={<EventAvailableIcon />}
      onClick={onClick}
      fullWidth={fullWidth}
      sx={{
        textTransform: "none",
        borderRadius: 3,
        px: 4,
        py: 1.5,
        fontWeight: "bold",
        fontSize: { xs: "0.875rem", sm: "1rem" },
        background: `linear-gradient(135deg, ${theme.palette.error.light}, ${theme.palette.error.main})`,
        color: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        "&:hover": {
          background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
          transform: "translateY(-2px) scale(1.02)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        },
      }}
    >
      Đặt lịch ngay
    </Button>
  );
}

export default function AuthButton({ isLoggedIn, setIsLoggedIn, fullWidth = false }: AuthButtonProps) {
  const theme = useTheme();
  const router = useRouter();

  const goToAuth = () => router.push("/auth");

  const handleLogout = () => {
    logoutClient();
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <Button
      variant={fullWidth ? "text" : "contained"}
      color="error"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      fullWidth={fullWidth}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        px: 3,
        py: 1,
        fontWeight: "bold",
        boxShadow: fullWidth ? 0 : 3,
        "&:hover": {
          backgroundColor: fullWidth ? "#ffeaea" : alpha("#d32f2f", 0.9),
          boxShadow: fullWidth ? 0 : 6,
        },
      }}
    >
      Đăng xuất
    </Button>
  ) : (
    <Button
      variant={fullWidth ? "outlined" : "contained"}
      color="primary"
      startIcon={<LoginIcon />}
      onClick={goToAuth}
      fullWidth={fullWidth}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        px: 3,
        py: 1,
        fontWeight: "bold",
        boxShadow: fullWidth ? 0 : 3,
        "&:hover": {
          backgroundColor: fullWidth ? "#e0f7fa" : alpha(theme.palette.primary.main, 0.85),
          boxShadow: fullWidth ? 0 : 6,
        },
      }}
    >
      Đăng nhập
    </Button>
  );
}
