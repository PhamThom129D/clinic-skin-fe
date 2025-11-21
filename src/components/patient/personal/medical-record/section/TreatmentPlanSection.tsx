// src/components/records/TreatmentPlanSection.tsx

import React from 'react';
import { TreatmentPlanSummary, TreatmentStep } from '@/types/patient';
// Import Box, Table, TableHead, TableBody, TableRow, TableCell từ MUI để tận dụng styling MUI
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

interface TreatmentPlanProps {
    plan: TreatmentPlanSummary;
    steps: TreatmentStep[];
}

const TreatmentPlanSection: React.FC<{ plan: TreatmentPlanSummary; steps: TreatmentStep[] }> = ({ plan, steps }) => {
    // Logic getTypeBadgeStyle cần được ánh xạ sang style object hoặc sx prop
    const getBadgeStyle = (type: string) => {
        const t = type.toLowerCase();
        if (t.includes('medication') || t.includes('thuốc'))
            return { backgroundColor: '#e0f2fe', color: '#0369a1', borderColor: '#bae6fd' }; // bg-blue-100, text-blue-700, border-blue-200
        if (t.includes('procedure') || t.includes('thủ thuật') || t.includes('peel'))
            return { backgroundColor: '#fff7ed', color: '#c2410c', borderColor: '#fed7aa' }; // bg-orange-100, text-orange-700, border-orange-200
        if (t.includes('lab') || t.includes('xét nghiệm'))
            return { backgroundColor: '#fce7f6', color: '#be185d', borderColor: '#fbcfe8' }; // bg-pink-100, text-pink-700, border-pink-200
        return { backgroundColor: '#f3f4f6', color: '#4b5563', borderColor: '#e5e7eb' }; // bg-gray-100, text-gray-700, border-gray-200
    };

    const formatType = (type: string) => {
        // ... (giữ nguyên)
        if (type === 'Medication') return 'Thuốc';
        if (type === 'Procedure') return 'Thủ thuật';
        if (type === 'LabTest') return 'Xét nghiệm';
        return type;
    };

    return (
        <Box
            // Thay thế Tailwind classes bằng sx prop
            sx={{
                bgcolor: 'white',
                borderRadius: '0.75rem', // rounded-xl
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // shadow-sm
                border: '1px solid #e5e7eb', // border border-gray-200
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden',
                mb: 4 // margin-bottom
            }}
        >
            {/* Header */}
            <Box sx={{ p: 2.5, borderBottom: '1px solid #e5e7eb', bgcolor: '#f9fafb' }}> {/* p-5, border-b, bg-gray-50 */}
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#0f766e', display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    🧪 Phác đồ điều trị
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { sm: 'space-between' }, alignItems: { sm: 'center' }, gap: 1, fontSize: '0.875rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontWeight: 'semibold', color: '#6b7280' }}>Tên phác đồ:</Typography>
                        <Typography sx={{ fontWeight: 'bold', color: '#1f2937' }}>{plan.treatmentName}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#f0fdfa', px: 1.5, py: 0.5, borderRadius: '9999px', border: '1px solid #ccfbf1' }}>
                        <Typography sx={{ fontWeight: 'semibold', color: '#0d9488' }}>Bệnh lý:</Typography>
                        <Typography sx={{ color: '#115e59' }}>{plan.diseaseName}</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Table */}
            <Box sx={{ overflowX: 'auto' }}>
                <Table size="small" sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <TableRow>
                            <TableCell sx={{ px: 2, py: 1.5, width: '48px', textAlign: 'center', color: '#4b5563', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em', border: 'none' }}>#</TableCell>
                            <TableCell sx={{ px: 2, py: 1.5, width: '128px', color: '#4b5563', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em', border: 'none' }}>Loại bước</TableCell>
                            <TableCell sx={{ px: 2, py: 1.5, color: '#4b5563', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em', border: 'none' }}>Nội dung & Hướng dẫn</TableCell>
                            <TableCell sx={{ px: 2, py: 1.5, width: '33%', color: '#4b5563', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em', border: 'none' }}>Kết quả / Ghi chú</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {steps.length > 0 ? (
                            steps
                                .sort((a, b) => a.stepNumber - b.stepNumber)
                                .map((step) => (
                                    <TableRow key={step.stepNumber} sx={{ '&:hover': { bgcolor: '#f8fafc' }, borderBottom: '1px solid #f3f4f6' }}>
                                        <TableCell sx={{ px: 2, py: 2, textAlign: 'center', fontWeight: 'bold', color: '#9ca3af', border: 'none' }}>
                                            {step.stepNumber}
                                        </TableCell>
                                        <TableCell sx={{ px: 2, py: 2, verticalAlign: 'top', border: 'none' }}>
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: 'inline-block',
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: '0.25rem',
                                                    border: '1px solid',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'semibold',
                                                    whiteSpace: 'nowrap',
                                                    ...getBadgeStyle(step.stepTypeName)
                                                }}
                                            >
                                                {formatType(step.stepTypeName)}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ px: 2, py: 2, verticalAlign: 'top', border: 'none' }}>
                                            <Typography sx={{ fontWeight: 'medium', color: '#1f2937', fontSize: '1rem', mb: 0.5 }}>
                                                {step.stepDescription}
                                            </Typography>
                                            {step.notes && (
                                                <Typography sx={{ color: '#6b7280', fontSize: '0.75rem', fontStyle: 'italic' }}>
                                                    Lưu ý: {step.notes}
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell sx={{ px: 2, py: 2, verticalAlign: 'top', border: 'none' }}>
                                            {step.results ? (
                                                <Box sx={{ color: '#374151', bgcolor: '#f0fdf4', px: 1.5, py: 1, borderRadius: '0.25rem', border: '1px solid #dcfce7' }}>
                                                    <Box component="span" sx={{ color: '#16a34a', fontWeight: 'bold', mr: 0.5 }}>✓</Box>
                                                    {step.results}
                                                </Box>
                                            ) : (
                                                <Box component="span" sx={{ color: '#9ca3af', fontStyle: 'italic', px: 1 }}>Chưa có kết quả</Box>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} sx={{ px: 2, py: 4, textAlign: 'center', color: '#6b7280', fontStyle: 'italic', border: 'none' }}>
                                    Không có bước điều trị nào được ghi nhận.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default TreatmentPlanSection;