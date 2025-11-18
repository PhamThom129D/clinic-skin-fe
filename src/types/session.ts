export interface ItemDetails {
  id: number;
  name: string;
  description?: string;
  price?: number;
  unit?: string;
  active?: boolean;
}

export interface Step {
  id: number;
  stepNumber: number;
  stepTypeName: string;
  stepDesc: string;
  notes: string;
  itemDetails: ItemDetails;
  results?: string;
}

export interface TreatmentPlan {
  id: number;
  name: string;
  description?: string;
  steps?: Step[];
}

export interface Session {
  sessionId: number;
  recordId: number;
  patientName: string;
  doctorId?: number | null;
  doctorName?: string | null;
  sessionDate: string;
  symptoms: string;
  diagnosis?: string | null;
  clinicalNotes?: string;
  treatmentPlan?: TreatmentPlan | null;
  createdAt: string;
  updatedAt: string;
}