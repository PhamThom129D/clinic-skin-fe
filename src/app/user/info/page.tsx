"use client";

import { Box, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect } from "react";
import { AuthResponse } from "@/types/auth";
import { EmergencyContact } from "@/types/userinfo";
import UserInfo from "@/components/patient/info/layout/UserInfo";

export default function Page() {
    const { account, setAccount } = useUser();
    const [emergencyContact, setEmergencyContact] = useState<EmergencyContact | null>(null);
    useEffect(() => {
        if (account) {
            const dummyEmergencyContact: EmergencyContact = {
                emergency_id: 1,
                contact_name: "Phạm T",
                contact_phone: "0397464805",
                patient_id: 101,
            };
            setEmergencyContact(dummyEmergencyContact);
        }
    }, [account]);

    const handleEditClick = () => {
        window.location.href = "/user/info/update-account";
    };

    if (!account) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <Typography>Đang tải thông tin...</Typography>
            </Box>
        );
    }

    return (
        <UserInfo
            account={account}
            emergencyContact={emergencyContact}
            onEditClick={handleEditClick}
        />
    );
}