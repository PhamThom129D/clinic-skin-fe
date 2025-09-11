import React from "react";
import { Role, roleMenu, menuIcons } from "./menuItem";

// Kiểu trả về mỗi mục menu
export interface MenuItemWithIcon {
  label: string;
  icon: React.ReactNode;
}

/**
 * Lấy role hiện tại từ sessionStorage hoặc localStorage
 * Nếu không có, trả về default Role (ví dụ VISITOR)
 */
export const getCurrentUserRole = (): Role => {
  // ưu tiên sessionStorage
  const storedRole =
    sessionStorage.getItem("userRole") || localStorage.getItem("userRole");

  if (storedRole && Object.keys(roleMenu).includes(storedRole)) {
    return storedRole as Role;
  }

  return "ROLE_PATIENT"; // default nếu không có role
};

/**
 * Lấy danh sách menu kèm icon theo role
 * @param role Role hiện tại
 * @returns Array of { label, icon }
 */
export const getMenuByRole = (role?: Role): MenuItemWithIcon[] => {
  // Nếu không truyền role thì lấy từ storage
  const currentRole = role || getCurrentUserRole();
  const menus = roleMenu[currentRole] || [];
  return menus.map((label) => ({
    label,
    icon: menuIcons[label] || null, // nếu không có icon thì null
  }));
};
// utils/menuHelper.ts
export const pathMap: Record<string, string> = {
  "Khám và điều trị": "/doctor/patients", 
  // thêm các mapping đặc biệt khác nếu cần
};

export const getPathFromLabel = (label: string): string => {
  return pathMap[label] || `/${label.toLowerCase().replace(/\s+/g, "-")}`;
};

