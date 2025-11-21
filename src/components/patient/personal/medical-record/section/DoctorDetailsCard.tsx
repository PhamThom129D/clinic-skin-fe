// src/components/records/DoctorDetailsCard.tsx
import React from 'react';
import { DoctorSummary } from '@/types/patient';
import { Box, Typography, Divider } from '@mui/material'; // Thêm Box, Typography, Divider

const DoctorDetailsCard: React.FC<{ info: DoctorSummary }> = ({ info }) => {
    return (
        <Box sx={{ mb: 4 }}> {/* Thay thế div và thêm margin-bottom */}
            <Typography variant="h6" sx={{ color: '#6b7280', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                🧑‍⚕️ Bác sĩ phụ trách
            </Typography>
            <Divider sx={{ mb: 1.5 }} />
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>{info.doctorName}</Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>Chuyên môn: {info.specialty}</Typography>
            </Box>
        </Box>
    );
};
export default DoctorDetailsCard;