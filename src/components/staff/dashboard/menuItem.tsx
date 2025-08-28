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
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";

// 🔹 Định nghĩa Role
export type Role =
  | "Visitor"
  | "Patient"
  | "Receptionist"
  | "Doctor"
  | "LabStaff"
  | "Consultant"
  | "Cashier"
  | "Admin";

// 🔹 Menu theo từng Role
export const roleMenu: Record<Role, string[]> = {
  Visitor: ["Thông tin phòng khám", "Dịch vụ & chi phí", "Đặt lịch", "Tư vấn"],
  Patient: ["Hồ sơ cá nhân", "Lịch sử khám", "Tải tài liệu", "Thanh toán", "Thông báo"],
  Receptionist: ["Lịch hẹn", "Check-in", "Quản lý hồ sơ", "In phiếu khám", "Nhắc trễ hẹn"],
  Doctor: ["Hồ sơ bệnh nhân", "Khám & điều trị", "Phác đồ", "Kê đơn", "Xét nghiệm", "AI hỗ trợ"],
  LabStaff: ["Lịch hẹn", "Thông tin bệnh nhân", "Cập nhật mẫu/xét nghiệm", "Báo cáo"],
  Consultant: ["Tư vấn trực tuyến", "Hồ sơ điều trị", "Hướng dẫn bệnh nhân", "Nhắc trễ hẹn"],
  Cashier: ["Thanh toán", "Cập nhật trạng thái", "In hóa đơn", "Hoàn tiền"],
  Admin: ["Hồ sơ bệnh nhân", "Quản lý nhân sự", "Dịch vụ & thuốc", "Vật tư & tồn kho", "Báo cáo", "Cấu hình"]
};

// 🔹 Icon cho từng menu
export const menuIcons: { [key: string]: React.ReactNode } = {
  "Thông tin phòng khám": <DashboardIcon />,
  "Dịch vụ & chi phí": <AssignmentIcon />,
  "Đặt lịch": <EventNoteIcon />,
  "Tư vấn": <ChatIcon />,

  "Hồ sơ cá nhân": <DescriptionIcon />,
  "Lịch sử khám": <LocalHospitalIcon />,
  "Tải tài liệu": <DescriptionIcon />,
  "Thanh toán": <PaymentIcon />,
  "Thông báo": <NotificationsIcon />,

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

  "Cập nhật trạng thái": <AssignmentIcon />,
  "In hóa đơn": <ReceiptIcon />,
  "Hoàn tiền": <PaymentIcon />,

  "Quản lý nhân sự": <PeopleIcon />,
  "Dịch vụ & thuốc": <LocalHospitalIcon />,
  "Vật tư & tồn kho": <InventoryIcon />,
  "Cấu hình": <SettingsIcon />
};
