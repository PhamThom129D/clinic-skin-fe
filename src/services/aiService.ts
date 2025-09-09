export interface SuggestionResponse {
  possibleLabTests: string[];
  possibleDiseases: string[];
  labTest?: string;    
  labResult?: string;  
}

export const getLabTestsAndDiseases = async (
  symptoms: string,
  labTest?: string | null,
  labResult?: string | null
): Promise<SuggestionResponse> => {
  try {
    const res = await fetch(
      "http://localhost:1209/api/ai-suggest/suggest-lab-test-and-treatment",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, labTest: labTest || null, labResult: labResult || null }),
      }
    );

    if (!res.ok) throw new Error("API error: " + res.status);

    const data = await res.json();
    return {
      possibleLabTests: data.possibleLabTests?.filter(Boolean).map((t: string) => t.trim()) || [],
      possibleDiseases: data.possibleDiseases?.filter(Boolean).map((d: string) => d.trim()) || [],
      labTest: data.labTest || labTest || undefined,
      labResult: data.labResult || labResult || undefined,
    };
  } catch (err) {
    console.error("❌ Lỗi gọi API getLabTestsAndDiseases:", err);
    throw err;
  }
};

// Lấy phác đồ + thuốc dựa trên chẩn đoán
export const getTreatmentForDisease = async (diagnosis: string): Promise<any> => {
  try {
    const res = await fetch(
      "http://localhost:1209/api/ai-suggest/suggest-lab-test-and-treatment",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ diagnosis }),
      }
    );

    if (!res.ok) throw new Error("API error: " + res.status);

    return await res.json();
  } catch (err) {
    console.error("❌ Lỗi gọi API getTreatmentForDisease:", err);
    throw err;
  }
};
