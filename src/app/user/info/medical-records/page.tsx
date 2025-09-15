"use client";

import { Box, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { AuthResponse } from "@/types/auth";
import { EmergencyContact } from "@/types/userinfo";
import UserInfoUpdate from "@/components/patient/info/layout/UserInfoUpdate";
import { useRouter } from "next/navigation";

export default function Page() {
    return <Typography variant="h6">Trang Hồ sơ khám</Typography>;
}