"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import { Patient } from "@/services/patientList";
import { getLabTestsAndDiseases, getTreatmentForDisease } from "@/services/aiService";
import MedicationsTable from "./MedicationsTable";

import "@/css/doctor/PatientDashboard.css";

// ---------------- AiTyping
const AiTyping: React.FC<{ text: string; speed?: number }> = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayedText("");
    indexRef.current = 0;
    const chars = Array.from(text);
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (indexRef.current < chars.length) {
        setDisplayedText(chars.slice(0, indexRef.current + 1).join(""));
        indexRef.current++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

// LabTestButtons
const LabTestButtonsComponent: React.FC<{
  labTests: string[];
  selectedLabTest: string;
  onSelect: (t: string) => void;
}> = ({ labTests, selectedLabTest, onSelect }) => (
  <div className="lab-tests-buttons">
    {labTests.map((t) => (
      <button
        key={t}
        className={`lab-test-btn ${selectedLabTest === t ? "selected" : ""}`}
        onClick={() => onSelect(t)}
      >
        <AiTyping text={t} speed={40} />
      </button>
    ))}
  </div>
);
export const LabTestButtons = React.memo(LabTestButtonsComponent);

// DiseaseButtons
const DiseaseButtonsComponent: React.FC<{
  diseases: string[];
  selectedDisease: string;
  onSelect: (d: string) => void;
}> = ({ diseases, selectedDisease, onSelect }) => (
  <div className="lab-tests-buttons">
    {diseases.map((d) => (
      <button
        key={d}
        className={`lab-test-btn ${selectedDisease === d ? "selected" : ""}`}
        onClick={() => onSelect(d)}
      >
        <AiTyping text={d} speed={50} />
      </button>
    ))}
  </div>
);
export const DiseaseButtons = React.memo(DiseaseButtonsComponent);


// ---------------- PatientInfo
const PatientInfo: React.FC<{ patient: Patient; visitHistory: string }> = ({ patient, visitHistory }) => (
  <div className="dashboard-info-box">
    <h2 className="dashboard-title">📋 Thông tin bệnh nhân</h2>
    <p><b>👤 Họ tên:</b> {patient.name}</p>
    <p><b>👨‍⚕️ Bác sĩ:</b> {patient.doctorName}</p>
    {visitHistory && (
      <div className="visit-history-box">
        <div className="visit-history-title">Ghi chú các lần khám trước</div>
        <ul className="visit-history-list">
          {visitHistory.split(";").map((item, idx) => (
            <li key={idx}>{item.trim()}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

// ---------------- SymptomsInput
const SymptomsInput: React.FC<{ symptoms: string; setSymptoms: (val: string) => void }> = ({ symptoms, setSymptoms }) => (
  <div className="dashboard-card">
    <h3>📝 Triệu chứng</h3>
    <textarea
      className="dashboard-textarea"
      rows={3}
      value={symptoms}
      onChange={(e) => setSymptoms(e.target.value)}
      placeholder="Nhập triệu chứng..."
    />
  </div>
);

// ---------------- LabTestSection
const LabTestSection: React.FC<{
  labTests: string[];
  selectedLabTest: string;
  onSelectLabTest: (t: string) => void;
  labResult: string;
  setLabResult: (r: string) => void;
}> = ({ labTests, selectedLabTest, onSelectLabTest, labResult, setLabResult }) => {
  if (!labTests.length) return null;
  return (
    <>
      <h3>🧪 Xét nghiệm:</h3>
      <LabTestButtons labTests={labTests} selectedLabTest={selectedLabTest} onSelect={onSelectLabTest} />
      {selectedLabTest && (
        <div className="exam-result-form">
          <label>📋 Kết quả xét nghiệm</label>
          <input
            type="text"
            className="exam-result-input"
            placeholder="Nhập kết quả..."
            value={labResult}
            onChange={(e) => setLabResult(e.target.value)}
          />
        </div>
      )}
    </>
  );
};

// ---------------- DiseaseSection
const DiseaseSection: React.FC<{
  diseases: string[];
  selectedDisease: string;
  onSelectDisease: (d: string) => void;
}> = ({ diseases, selectedDisease, onSelectDisease }) => {
  if (!diseases.length) return null;
  return (
    <>
      <h3>🦠 Bệnh chuẩn đoán:</h3>
      <DiseaseButtons diseases={diseases} selectedDisease={selectedDisease} onSelect={onSelectDisease} />
    </>
  );
};

// ---------------- TreatmentSection
const TreatmentSection: React.FC<{
  treatmentSteps: any[];
  medications: any[];
  setMedications: (m: any[]) => void;
  onSave: () => void;
}> = ({ treatmentSteps, medications, setMedications, onSave }) => {
  if (!treatmentSteps.length) return null;
  return (
    <div className="medications-wrapper">
      <MedicationsTable medications={medications} setMedications={setMedications} />
      <div className="save-btn-wrapper">
        <button className="dashboard-btn dashboard-btn-save" onClick={onSave}>
          💾 Lưu hồ sơ
        </button>
      </div>
    </div>
  );
};

// ---------------- DoctorExam Main
interface DoctorExamProps {
  patient: Patient;
  darkMode?: boolean;
  onBack: () => void;
}

export default function DoctorExam({ patient, darkMode = false, onBack }: DoctorExamProps) {
  // Bác sĩ có thể sửa triệu chứng
  const [symptoms, setSymptoms] = useState(patient.symptoms?.join(", ") || "");
  const [labResult, setLabResult] = useState("");
  const [displayedLabTests, setDisplayedLabTests] = useState<string[]>([]);
  const [displayedDiseases, setDisplayedDiseases] = useState<string[]>([]);
  const [selectedLabTest, setSelectedLabTest] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");
  const [treatmentSteps, setTreatmentSteps] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);
  const [visitHistory, setVisitHistory] = useState<string>("");

  const [loading, setLoading] = useState(false);

  // ---------------- fetch visit history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await import("@/services/patientList").then(m => m.getVisitHistory(patient.id));
        setVisitHistory(history?.superShort || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, [patient]);

  // ---------------- fetch lab/disease suggestions
  const fetchSuggestionsBySymptoms = useCallback(
    debounce(async (s: string) => {
      if (!s.trim()) return;
      setLoading(true);
      try {
        const resp = await getLabTestsAndDiseases(s);
        if (!selectedLabTest) setDisplayedLabTests(resp.possibleLabTests || []);
        if (!labResult.trim()) {
          setDisplayedDiseases(resp.possibleDiseases || []);
          setSelectedDisease(resp.possibleDiseases?.[0] || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 1000),
    [selectedLabTest, labResult]
  );

  useEffect(() => {
    fetchSuggestionsBySymptoms(symptoms);
  }, [symptoms, fetchSuggestionsBySymptoms]);

  // ---------------- disease from labResult
  const fetchSuggestionsByLabResult = useCallback(
    debounce(async (labTest: string, result: string) => {
      if (!labTest || !result.trim()) return;
      setLoading(true);
      setDisplayedDiseases([]);
      setSelectedDisease("");
      try {
        const resp = await getLabTestsAndDiseases(symptoms, labTest, result);
        if (resp.possibleDiseases?.length > 0) {
          setDisplayedDiseases(resp.possibleDiseases);
          setSelectedDisease(resp.possibleDiseases[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500),
    [symptoms]
  );

  useEffect(() => {
    fetchSuggestionsByLabResult(selectedLabTest, labResult);
  }, [selectedLabTest, labResult, fetchSuggestionsByLabResult]);

  // ---------------- reset treatment on lab/disease change
  useEffect(() => {
    setTreatmentSteps([]);
    setMedications([]);
  }, [labResult, selectedDisease]);

  const handleSelectDisease = useCallback(async (d: string) => {
    setSelectedDisease(d);
    setLoading(true);
    try {
      const data = await getTreatmentForDisease(d);
      const steps = data.steps || [];
      setTreatmentSteps(steps);

      const meds = steps
        .filter((s: any) => s.stepTypeName === "Medication")
        .flatMap((s: any) => s.itemDetails?.details || [])
        .map((m: any) => ({
          id: m.id,
          name: m.medicationName,
          dosage: m.dosage,
          unit: m.unit,
          usageInstructions: m.instructions || "-",
          price: parseFloat(m.price),
          quantity: Number(m.quantity),
        }));
      setMedications(meds);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSave = () => {
    console.log({ patient, symptoms, selectedLabTest, labResult, selectedDisease, treatmentSteps, medications });
    alert("✅ Đã lưu thành công!");
  };

  return (
    <div
      className={`dashboard-container ${darkMode ? "dark" : ""}`}
      style={{ backgroundColor: darkMode ? "#1e1e2f" : "#fff", color: darkMode ? "#f0f0f0" : "inherit", minHeight: "100vh" }}
    >
      <button className="dashboard-btn dashboard-btn-back" onClick={onBack}>
        ⬅ Quay lại danh sách
      </button>

      <PatientInfo patient={patient} visitHistory={visitHistory} />
      <SymptomsInput symptoms={symptoms} setSymptoms={setSymptoms} />
      <LabTestSection
        labTests={displayedLabTests}
        selectedLabTest={selectedLabTest}
        onSelectLabTest={setSelectedLabTest}
        labResult={labResult}
        setLabResult={setLabResult}
      />
      <DiseaseSection
        diseases={displayedDiseases}
        selectedDisease={selectedDisease}
        onSelectDisease={handleSelectDisease}
      />
      <TreatmentSection
        treatmentSteps={treatmentSteps}
        medications={medications}
        setMedications={setMedications}
        onSave={handleSave}
      />
    </div>
  );
}
