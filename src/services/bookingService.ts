// src/services/contactService.ts
import { BookingData } from "@/types/screen";
import api from "../api/api";
import {
  ContactPayload,
  ConsultationAssignmentDTO,
  ConsultationAssignmentResponseDTO,
} from "../types/contact";
import { ConsultationStatus } from "../types/enums";



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
