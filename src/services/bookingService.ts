// src/services/contactService.ts
import { BookingData } from "@/types/screen";
import api from "../api/api";
import {
  ContactPayload,
  ConsultationAssignmentDTO,
  ConsultationAssignmentResponseDTO,
} from "../types/contact";
import { ConsultationStatus } from "../types/enums";

// services/bookingService.ts (hoặc file types.ts riêng)

export interface AppointmentResponse {
  id: number;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:mm
  note?: string;
  status: "PENDING" | "IN_PROGRESS" | "APPROVED" | "REJECTED";
  patient: {
    id: number;
    passportNumber?: string;
    occupation?: string;
    account: {
      id: number;
      fullName: string;
      email: string;
      phoneNumber?: string;
      gender?: "MALE" | "FEMALE" | "OTHER";
      avtPath?: string | null;
      dateOfBirth?: string | null;
      address?: string | null;
      roles?: string[];
      status?: string;
      createdAt?: string;
      updatedAt?: string;
    };
  };
}


export const createContact = (data: ContactPayload) => {
  return api.post("/contacts", data);
};


// ---- Cập nhật assign + note ----
export const assignConsultation = (dto: ConsultationAssignmentDTO) => {
  return api.put<ConsultationAssignmentResponseDTO>(
    "/contacts/consultation-assignment",
    dto
  );
};

// ---- Lấy danh sách yêu cầu tư vấn ----
export const getConsultationAssignments = (status?: ConsultationStatus) => {
  return api.get<ConsultationAssignmentResponseDTO[]>(
    "/contacts/list-assignments",
    { params: status && status !== "ALL" ? { status } : {} }
  );
};

// ---- Tạo lịch khám ----
export const registerAppointment = (data: BookingData) => {
  return api.post("/appointments/register", data);
};

// ---- (Option) Lấy danh sách lịch khám theo user ----
export const getAppointmentsByUser = (email: string) => {
  return api.get("/appointments/by-user", { params: { email } });
};

// ---- (Option) Hủy lịch khám ----
export const cancelAppointment = (id: number) => {
  return api.delete(`/appointments/${id}`);
};



// ---- Lấy danh sách lịch hẹn (tất cả hoặc theo ngày) ----
export const getAppointments = (date?: string) => {
  return api.get("/appointments", {
    params: date ? { date } : {},
  });
};

// ---- Lấy lịch hẹn theo ID ----
export const getAppointmentById = (id: number) => {
  return api.get(`/appointments/${id}`);
};


// ---- Cập nhật lịch hẹn (approve/reject) ----
export const updateAppointment = (id: number, data: Partial<BookingData & {status: string}>) => {
  return api.put(`/appointments/${id}`, data);
};

// ---- Xóa lịch hẹn ----
export const deleteAppointment = (id: number) => {
  return api.delete(`/appointments/${id}`);
};

