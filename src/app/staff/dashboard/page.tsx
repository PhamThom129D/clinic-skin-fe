"use client";

import React from "react";
import DashboardLayout from "@/components/staff/dashboard/layout/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  const DashboardLayoutAny = DashboardLayout as React.ComponentType<{ children?: React.ReactNode }>;
  return <DashboardLayoutAny>{children}</DashboardLayoutAny>;
}
