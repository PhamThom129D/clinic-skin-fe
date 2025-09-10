"use client";

import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function LayoutDashboard({ children }: LayoutProps) {
  const [open, setOpen] = useState(true);

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "#f9fafb", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar open={open} />

      {/* Nội dung chính */}
      <Box sx={{ flexGrow: 1 }}>
        <Header onToggleSidebar={handleToggleSidebar} />

        {/* Toolbar để tránh header đè nội dung */}
        <Toolbar />
        <Content selectedMenu="Dashboard" />
        {children}
      </Box>
    </Box>
  );
}
