// src/components/records/ClinicalDetailsCard.tsx

import React from 'react';
import { ClinicalDetails } from '@/types/patient';
import { Box, Typography, Divider } from '@mui/material';

interface ClinicalDetailsProps {
    details: ClinicalDetails;
}

const ClinicalDetailsCard: React.FC<{ details: ClinicalDetails }> = ({ details }) => {
    
    // Style cho các phần thông tin (chẩn đoán, triệu chứng)
    const detailBoxStyle = {
        mb: 2, 
        p: 1.5,
        bgcolor: '#f7f7f7', // Màu nền nhẹ
        borderRadius: '0.375rem', // Bo góc
    };

    // Style cho phần Ghi chú bác sĩ (đặc biệt)
    const noteBoxStyle = {
        p: 2, 
        bgcolor: '#fffbe0', // Màu vàng nhạt (như trong ảnh)
        borderRadius: '0.5rem', 
        borderLeft: '4px solid #facc15', // Đường viền vàng
        mt: 3,
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#059669', display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                🩺 Thông tin khám lâm sàng
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box>
                {/* Chẩn đoán */}
                <Box sx={detailBoxStyle}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#374151', mb: 0.5 }}>Chẩn đoán</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#1f2937' }}>
                        <Typography component="span" sx={{ color: '#3b82f6', mr: 1, fontSize: '1.25rem' }}>◆</Typography>
                        <Typography variant="body1">{details.diagnosis || 'Chưa có kết luận'}</Typography>
                    </Box>
                </Box>

                {/* Triệu chứng */}
                <Box sx={detailBoxStyle}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#374151', mb: 0.5 }}>Triệu chứng</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#1f2937' }}>
                        <Typography component="span" sx={{ color: '#3b82f6', mr: 1, fontSize: '1.25rem' }}>◆</Typography>
                        <Typography variant="body1">{details.symptoms || 'Không ghi nhận'}</Typography>
                    </Box>
                </Box>
                
                {/* Ghi chú bác sĩ */}
                <Box sx={noteBoxStyle}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#d97706', mb: 0.5 }}>
                        📝 Ghi chú bác sĩ:
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#4b5563' }}>
                        {details.clinicalNotes || 'Không có ghi chú thêm.'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
export default ClinicalDetailsCard;