// src/components/patient/personal/history/HistoryTableContainer.tsx
"use client";

import React from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { AppointmentHistoryItem } from '@/types/patient';
import StyledPaper from "../../../../../../common/StyledPaper";
import HistoryTable from '../section/HistoryTable';
import { useRouter } from 'next/navigation';
interface HistoryTableContainerProps {
    historyList: AppointmentHistoryItem[];
    isLoading: boolean;
    error: string | null;
}

const History: React.FC<HistoryTableContainerProps> = ({ 
    historyList, 
    isLoading, 
    error 
}) => {
    const router = useRouter();

    const handleViewDetail = (appointmentId: number, recordId: number | null) => {
        if (recordId) {
            router.push(`/patient/history/${recordId}`);
        }
    };

    if (isLoading) {
        return (
            <StyledPaper>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 5 }}>
                    <CircularProgress color="primary" size={30} />
                    <Typography variant="body1" sx={{ ml: 2 }}>Đang tải lịch sử khám bệnh...</Typography>
                </Box>
            </StyledPaper>
        );
    }

    if (error) {
        return (
            <StyledPaper>
                <Alert severity="error">
                    {error}
                </Alert>
            </StyledPaper>
        );
    }
    
    return (
        <StyledPaper>
            <Typography variant="h5" component="h1" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
                Lịch sử khám bệnh
            </Typography>
            
            {historyList.length > 0 ? (
                <HistoryTable data={historyList}/>
            ) : (
                <Alert severity="info">
                    Bạn chưa có lịch sử khám bệnh nào được ghi nhận.
                </Alert>
            )}
        </StyledPaper>
    );
};

export default History;
