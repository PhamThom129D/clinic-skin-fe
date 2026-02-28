// types/patient.ts

import { ConsultationStatus } from "./enums";

// --- Tóm tắt Lịch sử Khám ---
export interface AppointmentHistoryItem {
    appointmentId: number;
    recordId: number | null;
    status: string;
    appointmentDateTime: string; // YYYY-MM-DD HH:MM
    appointmentNote: string | null;   // <-- đổi từ symptoms → appointmentNote
    doctorName: string | null;
}

// -- Tóm tắt Hồ sơ Khám --
export interface PatientMedicalHistoryDTO {
    recordId: number;
    sessionId: number;
    symptoms: string;
    diagnosis: string;
    doctorFullName: string;
    sessionDate: string; // dạng: "YYYY-MM-DD HH:MM"
}

export type PatientHistoryList = AppointmentHistoryItem[];

// --- II. Chi tiết Hồ sơ Khám (Dùng cho Detail) ---
// -------------------------------------------------------------------
// AppointmentSummaryDTO
export interface AppointmentSummary {
  appointmentId: number;
  status: ConsultationStatus | string;
  appointmentDateTime: string; // Định dạng "yyyy-MM-dd HH:mm"
  note: string;
}

// AppointmentSummaryDTO
export interface PatientMedicalHistoryDTO {
    recordId: number;
    sessionId: number;
    symptoms: string;
    diagnosis: string;
    doctorFullName: string;
    sessionDate: string; // dạng: "YYYY-MM-DD"
}

// DoctorSummaryDTO
export interface DoctorSummary {
  doctorId: number;
  doctorName: string;
  specialty: string;
}

// ClinicalDetailsDTO
export interface ClinicalDetails {
  symptoms: string | null; // Triệu chứng
  diagnosis: string | null; // Chẩn đoán
  clinicalNotes: string | null; // Ghi chú lâm sàng
}

// TreatmentPlanSummaryDTO
export interface TreatmentPlanSummary {
  planId: number;
  treatmentName: string;
  diseaseName: string; // Tên bệnh liên quan
}

// TreatmentStepDTO
export interface TreatmentStep {
  stepNumber: number;
  stepTypeName: 'LabTest' | 'Procedure' | string; // Loại: Xét nghiệm, Thủ thuật, v.v.
  stepDescription: string; // Tên của Item (tên xét nghiệm/thủ thuật)
  notes: string | null; // Ghi chú của bước
  results: string | null; // Kết quả của bước
}

// MedicalRecordDetailDTO
export interface MedicalRecordDetail {
  // Mục 1: Thông tin Lịch hẹn
  appointmentInfo: AppointmentSummary;

  // Mục 2: Thông tin Bác sĩ
  doctorInfo: DoctorSummary | null;

  // Mục 3: Khám Lâm sàng
  clinicalDetails: ClinicalDetails; 

  // Mục 4: Phác đồ Điều trị
  treatmentPlan: TreatmentPlanSummary | null;

  // Mục 5: Danh sách các Bước
  steps: TreatmentStep[];
}