import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentIcon from "@mui/icons-material/Payment";
import DescriptionIcon from "@mui/icons-material/Description";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ScienceIcon from "@mui/icons-material/Science";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InventoryIcon from "@mui/icons-material/Inventory";

// 🔹 Định nghĩa Role
export type Role =
  | "ROLE_RECEPTIONIST"
  | "ROLE_DOCTOR"
  | "ROLE_LAB_STAFF"
  | "ROLE_CONSULTANT"
  | "ROLE_CASHIER"
  | "ROLE_ADMIN";

// 🔹 Menu theo từng Role
export const roleMenu: Record<Role, string[]> = {
  ROLE_RECEPTIONIST: [
    "Lịch hẹn",
    "Check-in",
    "Quản lý hồ sơ",
    "In phiếu khám",
    "Nhắc trễ hẹn",
  ],
  ROLE_DOCTOR: [
    "Trang chủ",
    "Hồ sơ bệnh nhân",
    "Khám & điều trị",
    "Phác đồ",
    "Kê đơn",
    "Xét nghiệm",
    "AI hỗ trợ",
  ],
  ROLE_LAB_STAFF: ["Lịch hẹn", "Thông tin bệnh nhân", "Cập nhật mẫu/xét nghiệm", "Báo cáo"],
  ROLE_CONSULTANT: ["Tư vấn trực tuyến", "Hồ sơ điều trị", "Hướng dẫn bệnh nhân", "Nhắc trễ hẹn"],
  ROLE_CASHIER: ["Thanh toán", "Cập nhật trạng thái", "In hóa đơn", "Hoàn tiền"],
  ROLE_ADMIN: ["Trang chủ","Hồ sơ bệnh nhân", "Quản lý tài khoản", "Dịch vụ & thuốc", "Vật tư & tồn kho", "Báo cáo", "Cấu hình"],
};

// 🔹 Icon cho từng menu
export const menuIcons: Record<string, React.ReactNode> = {
  "Trang chủ": <DashboardIcon />,

  "Lịch hẹn": <EventNoteIcon />,
  "Check-in": <PeopleIcon />,
  "Quản lý hồ sơ": <DescriptionIcon />,
  "In phiếu khám": <ReceiptIcon />,
  "Nhắc trễ hẹn": <NotificationsIcon />,

  "Hồ sơ bệnh nhân": <DescriptionIcon />,
  "Khám & điều trị": <LocalHospitalIcon />,
  "Phác đồ": <AssignmentIcon />,
  "Kê đơn": <ReceiptIcon />,
  "Xét nghiệm": <ScienceIcon />,
  "AI hỗ trợ": <ChatIcon />,

  "Thông tin bệnh nhân": <DescriptionIcon />,
  "Cập nhật mẫu/xét nghiệm": <ScienceIcon />,
  "Báo cáo": <AssignmentIcon />,

  "Tư vấn trực tuyến": <ChatIcon />,
  "Hồ sơ điều trị": <DescriptionIcon />,
  "Hướng dẫn bệnh nhân": <AssignmentIcon />,

  "Thanh toán": <PaymentIcon />,
  "Cập nhật trạng thái": <AssignmentIcon />,
  "In hóa đơn": <ReceiptIcon />,
  "Hoàn tiền": <PaymentIcon />,

  "Quản lý tài khoản": <PeopleIcon />,
  "Dịch vụ & thuốc": <LocalHospitalIcon />,
  "Vật tư & tồn kho": <InventoryIcon />,
  "Cấu hình": <SettingsIcon />,
};
