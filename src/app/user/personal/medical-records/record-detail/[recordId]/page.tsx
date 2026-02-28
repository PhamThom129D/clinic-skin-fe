// src/app/patients/records/page.tsx

'use client'; 

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { getMedicalRecordDetails } from '@/services/medicalRecordService';
import { MedicalRecordDetail } from '@/types/patient';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

// Import component hiển thị mới
import RecordDetail from '@/components/patient/personal/medical-record/layout/RecordDetail'; 
import { Router } from 'next/router';

const MedicalRecordDetailPage: React.FC = () => {
    const params = useParams();
    const recordId = params.recordId ? Number(params.recordId) : null; 
    const router = useRouter();

    const [data, setData] = useState<MedicalRecordDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!recordId) {
            setError("ID hồ sơ không hợp lệ.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const result = await getMedicalRecordDetails(recordId);
            setData(result);
            setError(null);
        } catch (err) {
            const axiosError = err as AxiosError;
            // Xử lý lỗi
            const errorMessage = axiosError.response && axiosError.response.status === 404
                ? `Không tìm thấy hồ sơ y tế #${recordId}.`
                : `Lỗi khi tải dữ liệu: ${axiosError.message}`;
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [recordId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // 1. TRẠNG THÁI TẢI
    if (loading) {
        return <div className="p-8 text-center text-blue-500 text-lg">Đang tải chi tiết hồ sơ...</div>;
    }

    // 2. TRẠNG THÁI LỖI
    if (error) {
        return <div className="p-8 text-center bg-red-100 text-red-700 border border-red-300 rounded-lg font-bold">{error}</div>;
    }

    // 3. TRẠNG THÁI DỮ LIỆU RỖNG HOẶC KHÔNG HỢP LỆ
    if (!data) {
        return <div className="p-8 text-center text-gray-500">Dữ liệu hồ sơ không khả dụng.</div>;
    }

    // 4. TRẠNG THÁI THÀNH CÔNG: CHUYỂN DỮ LIỆU CHO COMPONENT HIỂN THỊ
    return (
        <RecordDetail onBack={() => router.back()} data={data} recordId={recordId} />
    );
};

export default MedicalRecordDetailPage;