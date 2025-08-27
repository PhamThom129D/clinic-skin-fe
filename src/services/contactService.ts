// src/services/contactService.ts
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
