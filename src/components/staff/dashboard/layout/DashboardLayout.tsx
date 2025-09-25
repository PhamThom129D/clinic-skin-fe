"use client";

import { useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import PatientDashboard from "../sections/doctor/PatientDashboard";
import StaffChatInbox from "../components/consultant/ListUser";

import { getCurrentUserRole, Role } from "@/utils/menuHelper";
import { lightTheme, darkTheme } from "../../../../theme"; // import 2 theme
import ManageAccount from "../sections/admin/manage-account/ManageAccount"; // gọi tới component mới
import Footer from "./Footer";

export default function LayoutDashboard() {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [role, setRole] = useState<Role | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load role và darkMode khi mount
  useEffect(() => {
    setRole(getCurrentUserRole());
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) setDarkMode(savedTheme === "true");
  }, []);

  const handleToggleSidebar = () => setOpen(!open);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "Dashboard":
        return <Content selectedMenu="Dashboard" darkMode={darkMode} />;
      case "Khám & điều trị":
        return <PatientDashboard darkMode={darkMode} />;
      case "Tư vấn trực tuyến":
        return <StaffChatInbox darkMode={darkMode} />;
      case "Quản lý tài khoản":
        return <ManageAccount darkMode={darkMode} />; 
      default:
        return <Content selectedMenu="Dashboard" darkMode={darkMode} />;
    }
  };

  if (!role) return <div>Đang tải...</div>;

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        <Sidebar open={open} role={role} onMenuSelect={setSelectedMenu} />
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Header
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
            onToggleSidebar={handleToggleSidebar}
          />
          <Box sx={{ flex: 1, overflow: "auto", pt: "64px", px: 2 }}>
            {renderContent()}
          </Box>
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
