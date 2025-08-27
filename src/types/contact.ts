// src/types/contact.ts
import { ConsultationStatus } from "./enums";

export interface ContactPayload {
  fullname: string;   // KHÔNG phải fullName
  phone: string;      // KHÔNG phải phoneNumber
  reason: string;     // KHÔNG phải message
}

// DTO để gán tư vấn viên
export interface ConsultationAssignmentDTO {
  contactId: number;
  consultantId: number;
  note?: string;
  status?: ConsultationStatus;
}

// Response khi gán thành công
export interface ConsultationAssignmentResponseDTO {
  assignmentId: number;
  contactId: number;
  contactName: string;
  consultantId: number;
  note?: string;
}
