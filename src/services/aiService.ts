// services/aiService.ts

// --- Bước 1: AI gợi ý các bệnh khả năng cao
export const checkPossibleDiseases = async (symptoms: string): Promise<string[]> => {
  try {
    const res = await fetch("http://localhost:1209/api/ai/check-disease", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: symptoms }),
    });

    if (!res.ok) {
      throw new Error("API error: " + res.status);
    }

    const data = await res.json();
    return data.possibleDiseases || [];
  } catch (err) {
    console.error("❌ Lỗi gọi API checkPossibleDiseases:", err);
    throw err;
  }
};

// --- Bước 2: AI lấy phác đồ + thuốc dựa trên bệnh xác nhận
export const getTreatmentForDisease = async (diagnosis: string): Promise<any> => {
  try {
    const res = await fetch("http://localhost:1209/api/ai/treatment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ diagnosis }), // sửa từ status -> diagnosis
    });

    if (!res.ok) {
      throw new Error("API error: " + res.status);
    }

    return await res.json(); // { diagnosis, treatmentTemplate, steps }
  } catch (err) {
    console.error("❌ Lỗi gọi API getTreatmentForDisease:", err);
    throw err;
  }
};
