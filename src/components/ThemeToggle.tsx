"use client";

import { useTheme } from "next-themes";
import { IconButton } from "@mui/material";
import { WbSunny, Brightness2 } from "@mui/icons-material";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      color="inherit"
    >
      {theme === "dark" ? (
        <WbSunny sx={{ color: "#fff" }} /> // mặt trời trắng
      ) : (
        <Brightness2 sx={{ color: "#000" }} /> // mặt trăng đen
      )}
    </IconButton>
  );
}
