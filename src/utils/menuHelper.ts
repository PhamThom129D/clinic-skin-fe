import React from "react";
import { Role, roleMenu, menuIcons } from "./menuItem";

// Kiểu trả về mỗi mục menu
export interface MenuItemWithIcon {
  label: string;
  icon: React.ReactNode;
}

/**
 * Lấy role hiện tại từ sessionStorage hoặc localStorage
 */
export const getCurrentUserRole = (): Role | null => {
  const storedRole =
    sessionStorage.getItem("userRole") || localStorage.getItem("userRole");
  if (storedRole && Object.keys(roleMenu).includes(storedRole)) {
    return storedRole as Role;
  }
  return null;
};

/**
 * Lấy danh sách menu kèm icon theo role
 */
export const getMenuByRole = (role?: Role): MenuItemWithIcon[] => {
  const currentRole = role || getCurrentUserRole() || "ROLE_DOCTOR"; // default ROLE_DOCTOR
  const menus = roleMenu[currentRole] || [];
  return menus.map((label) => ({
    label,
    icon: menuIcons[label] || null,
  }));
};
