// src/services/medicalRecordService.ts
import { AppointmentHistoryItem, MedicalRecordDetail } from "@/types/patient";
import api from "../api/api";

// --- I. Chức năng Lấy Danh sách Lịch sử Khám Tóm tắt (Endpoint /appointments/patient-history) ---
export const getPatientAppointmentHistory = async (): Promise<AppointmentHistoryItem[]> => {
    try {
        console.log("Đang tải danh sách lịch sử khám bệnh...");
        const response = await api.get<AppointmentHistoryItem[]>("/appointments/patient-history");
        console.log("Lịch sử khám bệnh tải thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy lịch sử khám bệnh:", error);
        throw new Error("Không thể tải danh sách lịch sử khám bệnh.");
    }
};

// // --- II. Chức năng Lấy Chi tiết Hồ sơ Khám (Endpoint /medical-records/{recordId}) ---
// export const getMedicalRecordDetail = async (recordId: number): Promise<MedicalRecordDetail> => {
//     try {
//         console.log(`Đang tải chi tiết hồ sơ khám có ID: ${recordId}`);
//         const response = await api.get<MedicalRecordDetail>(
//             `/medical-records/${recordId}`
//         );
//         return response.data;
//     } catch (error) {
//         console.error(`Lỗi khi tải chi tiết hồ sơ khám ID ${recordId}:`, error);
//         throw new Error("Không thể tải chi tiết Hồ sơ khám bệnh.");
//     }
// };