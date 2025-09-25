"use client";

import { Box, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { AuthResponse } from "@/types/auth";
import UserInfo from "@/components/patient/info/layout/UserInfo";
import { useRouter } from "next/navigation";

export default function Page() {
    const { account, setAccount } = useUser();
    const router = useRouter();

    const handleEditClick = () => {
         router.push("/user/info/update-account");
    };

    if (!account) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <Typography>Đang tải thông tin...</Typography>
            </Box>
        );
    }

    return (
        <UserInfo account={account} onEditClick={handleEditClick} />
    );
}