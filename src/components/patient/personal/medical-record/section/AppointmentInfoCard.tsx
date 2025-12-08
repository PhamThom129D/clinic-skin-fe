// src/components/records/AppointmentInfoCard.tsx

import React from 'react';
import { AppointmentSummary } from '@/types/patient';
import { Box, Typography } from '@mui/material';
import { formatDate } from 'date-fns';
import { formatDateTimeForDisplay } from '@/utils/validation/validators';

interface AppointmentInfoProps {
    info: AppointmentSummary;
}

const AppointmentInfoCard: React.FC<{ info: AppointmentSummary }> = ({ info }) => {

    const getStatusStyle = (status: string) => {
        if (status === "COMPLETED") {
            return { 
                text: "Hoàn thành", 
                bgcolor: '#dcfce7', // bg-green-100
                color: '#16a34a', // text-green-700
                borderColor: '#bbf7d0' // border-green-200
            }; 
        }
        return { 
            text: "Đang tiến hành", 
            bgcolor: '#eff6ff', // bg-blue-100
            color: '#2563eb', // text-blue-700
            borderColor: '#bfdbfe' // border-blue-200
        };
    };
    
    const status = getStatusStyle(info.status);

    return (
        <Box sx={{
            mb: 4, 
            p: 2, 
            bgcolor: '#f0f9ff',
            borderRadius: '0.5rem', 
            borderLeft: '4px solid #3b82f6'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                
                {/* Ngày giờ */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1e3a8a', mr: 1 }}>
                        Ngày giờ:
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#1f2937', fontWeight: 'medium' }}>
                        {formatDateTimeForDisplay(info.appointmentDateTime)}
                    </Typography>
                </Box>
                
                {/* Trạng thái */}
                <Box
                    component="span"
                    sx={{
                        fontSize: '0.875rem', 
                        fontWeight: 'bold',
                        px: 1.5, 
                        py: 0.5, 
                        borderRadius: '0.5rem', 
                        border: '1px solid',
                        whiteSpace: 'nowrap',
                        bgcolor: status.bgcolor,
                        color: status.color,
                        borderColor: status.borderColor,
                    }}
                >
                    {status.text}
                </Box>
            </Box>
            
            {info.note && (
                <Box>
                    <Typography variant="body2" sx={{ color: '#4b5563', mt: 1, borderTop: '1px dashed #bfdbfe', pt: 1 }}>
                        <Typography component="span" sx={{ fontWeight: 'semibold', mr: 0.5 }}>Ghi chú:</Typography>
                        {info.note}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};
export default AppointmentInfoCard;