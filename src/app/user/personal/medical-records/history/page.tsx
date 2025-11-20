// app/user/personal/history/page.tsx
"use client";

import { Box, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useState, useEffect, useCallback } from "react";
import { AppointmentHistoryItem } from "@/types/patient";
import { getPatientAppointmentHistory } from "@/services/medicalRecordService";
import History from "@/components/patient/personal/medical-record/History"; 

export default function Page() {
    const { account } = useUser();
    
    // Khai báo các trạng thái để quản lý dữ liệu, tải và lỗi
    const [historyList, setHistoryList] = useState<AppointmentHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // Hàm gọi API
    const fetchHistory = useCallback(async () => {
        if (!account) return;
        
        setIsLoading(true);
        setError(null);

        try {
            const data = await getPatientAppointmentHistory();
            console.log("Lịch sử khám bệnh nhận được:", data);
            setHistoryList(data);
        } catch (err: any) {
            console.error("Lỗi khi tải lịch sử khám bệnh:", err);
            setError("Không thể tải lịch sử khám bệnh. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    }, [account]); // Dependency: account
    
    // useEffect để kích hoạt hàm gọi API khi component được mount
    useEffect(() => {
        if (account) {
            fetchHistory();
        }
    }, [account, fetchHistory]);

    // Logic kiểm tra tài khoản (Giống như các Page khác của bạn)
    if (!account) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <Typography>Đang tải thông tin...</Typography>
            </Box>
        );
    }
    
    // Truyền dữ liệu và trạng thái xuống component con
    return (
        <History 
            historyList={historyList}
            isLoading={isLoading}
            error={error}
        />
    );
}