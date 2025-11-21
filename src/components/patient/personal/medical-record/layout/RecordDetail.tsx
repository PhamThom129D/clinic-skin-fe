// src/components/patient/personal/medical-record/RecordDetail.tsx

import React from 'react';
import { MedicalRecordDetail } from '@/types/patient';
import { Box, IconButton } from '@mui/material'; // Thêm Box và IconButton từ MUI
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import icon quay lại

import AppointmentInfoCard from '@/components/patient/personal/medical-record/section/AppointmentInfoCard';
import DoctorDetailsCard from '@/components/patient/personal/medical-record/section/DoctorDetailsCard';
import ClinicalDetailsCard from '@/components/patient/personal/medical-record/section/ClinicalDetailsCard';
import TreatmentPlanSection from '@/components/patient/personal/medical-record/section/TreatmentPlanSection';

import StyledPaper from '../../../../../../common/StyledPaper';

interface RecordDetailProps {
    data: MedicalRecordDetail;
    recordId: number | null;
    // THÊM: Hàm xử lý khi nhấn nút back
    onBack: () => void; 
}

// Thêm onBack vào props
const RecordDetail: React.FC<RecordDetailProps> = ({ data, onBack }) => {
    
    if (!data) return <div>Không có dữ liệu</div>;

    return (
        <StyledPaper>
            <div className="container mx-auto p-4 md:p-6 space-y-4 font-sans text-slate-700">
                
                {/* 1. KHU VỰC NÚT BACK */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3, // Thêm margin-bottom để tách khỏi phần thông tin
                }}>
                    <IconButton 
                        onClick={onBack} 
                        aria-label="Quay lại lịch sử khám"
                        sx={{
                            color: 'primary.main', // Màu xanh chính của theme
                            p: 0.5,
                            borderRadius: '50%',
                            '&:hover': {
                                bgcolor: 'primary.light', // Màu nền khi hover
                                color: 'white', 
                            }
                        }}
                    >
                        <ArrowBackIcon sx={{ fontSize: '1.75rem' }} /> 
                    </IconButton>
                    <span 
                        onClick={onBack} 
                        style={{ cursor: 'pointer', fontWeight: 'bold', color: '#1f2937', marginLeft: '8px' }}
                    >
                        Lịch sử khám
                    </span>
                </Box>
                
                {/* Các component thông tin khác giữ nguyên */}
                {data.appointmentInfo && <AppointmentInfoCard info={data.appointmentInfo} />}
                {data.doctorInfo && <DoctorDetailsCard info={data.doctorInfo} />}
                {data.clinicalDetails && <ClinicalDetailsCard details={data.clinicalDetails} />}
                {data.treatmentPlan ? (
                    <TreatmentPlanSection
                        plan={data.treatmentPlan}
                        steps={data.steps || []}
                    />
                ) : (
                    <div className="text-center" style={{ padding: '1.5rem', borderRadius: '0.5rem', border: '1px dashed #ccc', backgroundColor: '#f9fafb', color: '#6b7280' }}>
                        Chưa có phác đồ điều trị cho lần khám này.
                    </div>
                )}
            </div>
        </StyledPaper>
    );
};

export default RecordDetail;