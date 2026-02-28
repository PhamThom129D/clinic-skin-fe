// app/user/personal/history/page.tsx
"use client";

import { Box, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect, useCallback } from "react";
import { PatientMedicalHistoryDTO } from "@/types/patient";
import { getMedicalRecordSummary } from "@/services/medicalRecordService";
import History from "@/components/patient/personal/medical-record/layout/History"; 

export default function Page() {
    const { account } = useUser();
        const [historyList, setHistoryList] = useState<PatientMedicalHistoryDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchHistory = useCallback(async () => {
        if (!account) return;
        
        setIsLoading(true);
        setError(null);

        try {
            const data = await getMedicalRecordSummary();
            console.log("Lịch sử khám bệnh nhận được:", data);
            setHistoryList(data);
        } catch (err: any) {
            console.error("Lỗi khi tải lịch sử khám bệnh:", err);
            setError("Không thể tải lịch sử khám bệnh. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    }, [account]);
    
    useEffect(() => {
        if (account) {
            fetchHistory();
        }
    }, [account, fetchHistory]);

    if (!account) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <Typography>Đang tải thông tin...</Typography>
            </Box>
        );
    }
    
    return (
        <History 
            historyList={historyList}
            isLoading={isLoading}
            error={error}
        />
    );
}