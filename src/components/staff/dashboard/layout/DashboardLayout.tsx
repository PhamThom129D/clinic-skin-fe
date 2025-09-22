"use client";

import { useState, useEffect } from "react";
import { Box, Toolbar } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import PatientDashboard from "../sections/doctor/PatientDashboard";
import { getCurrentUserRole, Role } from "@/utils/menuHelper";
import StaffChatInbox from "../components/consultant/ListUser";

export default function LayoutDashboard() {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [role, setRole] = useState<Role | null>(null);


  useEffect(() => {
    const userRole = getCurrentUserRole();
    setRole(userRole);
  }, []);

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "Dashboard":
        return <Content selectedMenu="Dashboard" />;
      case "Lịch hẹn":
        return <div>Lịch hẹn</div>;
      case "Check-in":
        return <div>Check-in</div>;
      case "Quản lý hồ sơ":
        return <div>Quản lý hồ sơ</div>;
      case "In phiếu khám":
        return <div>In phiếu khám</div>;
      case "Nhắc trễ hẹn":
        return <div>Nhắc trễ hẹn</div>;

      case "Hồ sơ bệnh nhân":
        return <div>Hồ sơ bệnh nhân</div>;
      case "Khám & điều trị":
        return <PatientDashboard />;
      case "Phác đồ":
        return <div>Phác đồ</div>;
      case "Kê đơn":
        return <div>Kê đơn</div>;
      case "Xét nghiệm":
        return <div>Xét nghiệm</div>;
      case "AI hỗ trợ":
        return <div>AI hỗ trợ</div>;

      case "Thông tin bệnh nhân":
        return <div>Thông tin bệnh nhân</div>;
      case "Cập nhật mẫu/xét nghiệm":
        return <div>Cập nhật mẫu/xét nghiệm</div>;
      case "Báo cáo":
        return <div>Báo cáo</div>;

      case "Tư vấn trực tuyến":
        // return <div>Tư vấn trực tuyến gdhgs</div>;
        return <StaffChatInbox/>
      case "Hồ sơ điều trị":
        return <div>Hồ sơ điều trị</div>;
      case "Hướng dẫn bệnh nhân":
        return <div>Hướng dẫn bệnh nhân</div>;

      case "Thanh toán":
        return <div>Thanh toán</div>;
      case "Cập nhật trạng thái":
        return <div>Cập nhật trạng thái</div>;
      case "In hóa đơn":
        return <div>In hóa đơn</div>;
      case "Hoàn tiền":
        return <div>Hoàn tiền</div>;

      case "Quản lý nhân sự":
        return <div>Quản lý nhân sự</div>;
      case "Dịch vụ & thuốc":
        return <div>Dịch vụ & thuốc</div>;
      case "Vật tư & tồn kho":
        return <div>Vật tư & tồn kho</div>;
      case "Cấu hình":
        return <div>Cấu hình</div>;

      default:
        return <Content selectedMenu="Dashboard" />;
    }
  };

  // 🔹 Nếu chưa load xong role thì có thể show loading
  if (!role) return <div>Đang tải...</div>;

  return (
    <Box sx={{ display: "flex", bgcolor: "#f9fafb", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar open={open} role={role} onMenuSelect={setSelectedMenu} />

      {/* Nội dung chính */}
      <Box sx={{ flexGrow: 1 }}>
        <Header onToggleSidebar={handleToggleSidebar} />
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}
