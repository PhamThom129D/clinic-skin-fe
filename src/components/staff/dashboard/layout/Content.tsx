import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import DashboardCards from "../components/DashboardCards";
import ChartSection from "../components/ChartSection";
import ScheduleCalendar from "../components/ScheduleCalendar";

interface ContentProps {
  selectedMenu: string;
  darkMode: boolean; // nhận prop darkMode
}

const contentTopOffset = 64; 

const Content: React.FC<ContentProps> = ({ selectedMenu, darkMode }) => {
  return (
    <Box
      component="main"
      flex={1}
      p={6}
      mt={`${contentTopOffset}px`}
      overflow="auto"
      minHeight={`calc(100vh - ${contentTopOffset}px)`}
      bgcolor={darkMode ? "#1e1e2f" : "#f5f6fa"} // nền tùy theme
      color={darkMode ? "#f0f0f0" : "inherit"} // text màu sáng khi dark
    >
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        {selectedMenu || "Chọn menu"}
      </Typography>

      <Divider sx={{ mb: 3, borderColor: darkMode ? "#444" : "rgba(0,0,0,0.12)" }} />

      {/* Dashboard Cards Section */}
      <Box sx={{ mb: 6, width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Tổng quan
        </Typography>
        <DashboardCards  />
      </Box>

      <Box sx={{ mb: 6, width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Thống kê chi tiết
        </Typography>
        <ChartSection title="Thống kê số liệu tuần này" />
      </Box>

      <Box sx={{ mb: 6, width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Lịch làm việc
        </Typography>
        <ScheduleCalendar title="Lịch làm việc tuần này" />
      </Box>
    </Box>
  );
};

export default Content;
