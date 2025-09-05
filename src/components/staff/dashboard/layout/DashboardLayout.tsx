"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Content from "./Content";
import { Role } from "../menuItem";
import { Box } from "@mui/material";
import PatientDashboard from "./doctor/PatientDashboard";

interface DashboardLayoutProps {
  username: string;
  role: Role;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ username, role }) => {
  const [selectedMenu, setSelectedMenu] = useState("");

  return (
    <Box display="flex">
      <Sidebar role={role} selectedMenu={selectedMenu} onSelectMenu={setSelectedMenu} />
      <Box display="flex" flexDirection="column" flex={1}>
        <Topbar username={username} role={role} />
        <PatientDashboard/>
        {/* <Content selectedMenu={selectedMenu} /> */}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
