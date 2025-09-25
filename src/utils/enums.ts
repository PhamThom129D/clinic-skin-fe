// utils/enums.ts

// --- Gender ---
export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export const genderLabels: Record<GenderEnum, string> = {
  [GenderEnum.MALE]: "Nam",
  [GenderEnum.FEMALE]: "Nữ",
  [GenderEnum.OTHER]: "Khác",
};

// --- Status ---
export enum StatusEnum {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  BANNED = "Banned",
}

export const statusLabels: Record<StatusEnum, string> = {
  [StatusEnum.ACTIVE]: "Hoạt động",
  [StatusEnum.INACTIVE]: "Không hoạt động",
  [StatusEnum.BANNED]: "Bị khóa",
};

// --- Role ---
export enum RoleEnum {
  ADMIN = "ROLE_ADMIN",
  DOCTOR = "ROLE_DOCTOR",
  PATIENT = "ROLE_PATIENT",
  RECEPTIONIST = "ROLE_RECEPTIONIST",
  CONSULTANT = "ROLE_CONSULTANT",
  CASHIER = "ROLE_CASHIER",
  LAB_STAFF = "ROLE_LAB_STAFF",
}

export const roleLabels: Record<RoleEnum, string> = {
  [RoleEnum.ADMIN]: "Quản trị viên",
  [RoleEnum.DOCTOR]: "Bác sĩ",
  [RoleEnum.PATIENT]: "Bệnh nhân",
  [RoleEnum.RECEPTIONIST]: "Lễ tân",
  [RoleEnum.CONSULTANT]: "Tư vấn viên",
  [RoleEnum.CASHIER]: "Thu ngân",
  [RoleEnum.LAB_STAFF]: "Kỹ thuật viên xét nghiệm",
};
