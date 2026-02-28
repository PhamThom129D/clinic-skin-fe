import React from "react";
import { Role, roleMenu, menuIcons } from "./menuItem";

export interface MenuItemWithIcon {
  label: string;
  icon: React.ReactNode;
}

export const getCurrentUserRole = (): Role | null => {
  const storedRole =
    sessionStorage.getItem("userRole") || localStorage.getItem("userRole");
  if (storedRole && Object.keys(roleMenu).includes(storedRole)) {
    return storedRole as Role;
  }
  return null;
};


export const getMenuByRole = (role?: Role): MenuItemWithIcon[] => {
  const currentRole = role || getCurrentUserRole() || "ROLE_DOCTOR"; 
  const menus = roleMenu[currentRole] || [];
  return menus.map((label) => ({
    label,
    icon: menuIcons[label] || null,
  }));
};
