// services/patientService.ts

export interface Patient {
  id: number;
  name: string;
  age?: number | string;
  gender?: string;
  doctorName?: string;
  symptoms: string[];
  treatmentPlan?: any;
}

export interface VisitSummary {
  superShort: string;
}

const API_BASE = "http://localhost:1209/api";

const getToken = (): string | null => {
  // Ưu tiên lấy trực tiếp
  const token = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");
  if (token) return token;


  return null;
};


const getAuthHeaders = () => {
  const token = getToken();
  console.log("Token gửi đi:", token);

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};


// --- Lấy danh sách bệnh nhân theo ngày
export const getPatientsByDate = async (date: string): Promise<Patient[]> => {
  try {
    const res = await fetch(`${API_BASE}/visit-sessions/list-session-date?date=${date}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("API error: " + res.status);
    }

    const data = await res.json();

    return data.map((s: any) => ({
      id: s.sessionId,
      name: s.patientName,
      doctorName: s.doctorName,
      visitDate: s.sessionDate
        ? new Date(s.sessionDate).toLocaleDateString("vi-VN")
        : "N/A",
      symptoms: s.symptoms ? s.symptoms.split(",") : [],
      treatmentPlan: s.treatmentPlan,
    }));
  } catch (err) {
    console.error("❌ Lỗi gọi API getPatientsByDate:", err);
    throw err;
  }
};

// --- Chi tiết bệnh nhân
export const getPatientDetail = async (sessionId: number): Promise<Patient | null> => {
  try {
    const res = await fetch(`${API_BASE}/visit-sessions/${sessionId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("API error: " + res.status);
    }

    const s = await res.json();

    return {
      id: s.sessionId,
      name: s.patientName,
      age: s.age ?? "N/A",
      gender: s.gender ?? "N/A",
      symptoms: s.symptoms ? s.symptoms.split(",") : [],
      treatmentPlan: s.treatmentPlan,
    };
  } catch (err) {
    console.error("❌ Lỗi gọi API getPatientDetail:", err);
    return null;
  }
};

// --- Lịch sử khám (AI summary)
export const getVisitHistory = async (recordId: number): Promise<VisitSummary | null> => {
  try {
    const res = await fetch(
      `${API_BASE}/ai-suggest/suggest-visit-summary?recordId=${recordId}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    if (!res.ok) {
      throw new Error("API error: " + res.status);
    }

    const data = await res.json();
    return {
      superShort: data.superShort || "Không có dữ liệu",
    };
  } catch (err) {
    console.error("❌ Lỗi gọi API getVisitHistory:", err);
    return null;
  }
};
