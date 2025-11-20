// types/patient.ts

// --- Tóm tắt Lịch sử Khám ---
export interface AppointmentHistoryItem {
    appointmentId: number;
    recordId: number | null;
    status: string;
    appointmentDateTime: string; // YYYY-MM-DD HH:MM
    appointmentNote: string | null;   // <-- đổi từ symptoms → appointmentNote
    doctorName: string | null;
}

export type PatientHistoryList = AppointmentHistoryItem[];

// --- II. Interface Chi tiết Hồ sơ Khám (Dùng cho Detail) ---

export interface PrescriptionItem {
    drugName: string;
    dosage: string; // Liều lượng
    instructions: string; // Hướng dẫn sử dụng
}

export interface TestResultItem {
    testName: string;
    result: string;
    unit: string;
    referenceRange: string;
}

// -- Chi tiết Hồ sơ khám bệnh -- /
export interface MedicalRecordDetail {
    recordId: number;
    patientName: string;
    doctorName: string;
    visitDate: string; // Ngày khám
    
    // Thông tin chi tiết hồ sơ
    diagnosis: string; // Chẩn đoán của bác sĩ
    treatment: string; // Kế hoạch điều trị

    // Các thành phần phức tạp khác
    prescriptions: PrescriptionItem[];
    testResults: TestResultItem[];
    
    // Tóm tắt từ AI (nếu có)
    summary?: string; 
}