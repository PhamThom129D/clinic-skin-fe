"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import debounce from "lodash.debounce";
import PatientList from "./PatientList";
import TreatmentStepsTable from "./TreatmentStepsTable";
import MedicationsTable from "./MedicationsTable";
import { getLabTestsAndDiseases, getTreatmentForDisease } from "@/services/aiService";
import { getPatientsByDate, Patient } from "@/services/patientList";
import "@/css/doctor/PatientDashboard.css";

// --- Component gõ chữ an toàn
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

// --- Component con: danh sách button xét nghiệm
const LabTestButtons: React.FC<{
  labTests: string[];
  selectedLabTest: string;
  onSelect: (t: string) => void;
}> = React.memo(({ labTests, selectedLabTest, onSelect }) => {
  return (
    <div className="lab-tests-buttons">
      {labTests.map((t) => (
        <button
          key={`lab-${t}`}
          className={`lab-test-btn ${selectedLabTest === t ? "selected" : ""}`}
          onClick={() => onSelect(t)}
        >
          <AiTyping text={t} speed={40} />
        </button>
      ))}
    </div>
  );
});

// --- Component con: danh sách button bệnh
const DiseaseButtons: React.FC<{
  diseases: string[];
  selectedDisease: string;
  onSelect: (d: string) => void;
}> = React.memo(({ diseases, selectedDisease, onSelect }) => {
  return (
    <div className="lab-tests-buttons">
      {diseases.map((d) => (
        <button
          key={`disease-${d}`}
          className={`lab-test-btn ${selectedDisease === d ? "selected" : ""}`}
          onClick={() => onSelect(d)}
        >
          <AiTyping text={d} speed={50} />
        </button>
      ))}
    </div>
  );
});

export default function PatientDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [doctorConclusion, setDoctorConclusion] = useState("");
  const [labResult, setLabResult] = useState("");
  const [labTests, setLabTests] = useState<string[]>([]);
  const [displayedLabTests, setDisplayedLabTests] = useState<string[]>([]);
  const [diseases, setDiseases] = useState<string[]>([]);
  const [displayedDiseases, setDisplayedDiseases] = useState<string[]>([]);
  const [selectedLabTest, setSelectedLabTest] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");

  const [treatmentSteps, setTreatmentSteps] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingPatients, setLoadingPatients] = useState(false);

  // --- Lấy danh sách bệnh nhân
  useEffect(() => {
    let isMounted = true;
    const fetchPatients = async () => {
      setLoadingPatients(true);
      try {
        const data = await getPatientsByDate("2025-09-01");
        if (isMounted) setPatients(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoadingPatients(false);
      }
    };
    fetchPatients();
    return () => { isMounted = false; };
  }, []);

  // --- Effect gợi ý labTest + bệnh khi nhập triệu chứng
  const fetchSuggestionsBySymptoms = useCallback(
    debounce(async (symptoms: string) => {
      if (!symptoms.trim()) return;
      setLoading(true);
      try {
        const response = await getLabTestsAndDiseases(symptoms);

        if (!selectedLabTest) {
          setLabTests(response.possibleLabTests || []);
          setDisplayedLabTests(response.possibleLabTests || []);
        }

        if (!labResult.trim()) {
          setDiseases(response.possibleDiseases || []);
          setDisplayedDiseases(response.possibleDiseases || []);
          setSelectedDisease(response.possibleDiseases?.[0] || "");
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
    fetchSuggestionsBySymptoms(doctorConclusion);
  }, [doctorConclusion, fetchSuggestionsBySymptoms]);

  // --- Effect gợi ý bệnh khi nhập kết quả xét nghiệm
  const fetchSuggestionsByLabResult = useCallback(
    debounce(async (labTest: string, result: string) => {
      if (!labTest || !result.trim()) return;

      setLoading(true);
      setDiseases([]);
      setSelectedDisease("");

      try {
        const response = await getLabTestsAndDiseases(doctorConclusion, labTest, result);

        if (response.possibleDiseases?.length > 0) {
          setDiseases(response.possibleDiseases);
          setDisplayedDiseases(response.possibleDiseases);
          setSelectedDisease(response.possibleDiseases[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500),
    [doctorConclusion]
  );

  useEffect(() => {
    fetchSuggestionsByLabResult(selectedLabTest, labResult);
  }, [selectedLabTest, labResult, fetchSuggestionsByLabResult]);

  // --- Reset phác đồ khi labResult thay đổi
  useEffect(() => {
    setTreatmentSteps([]);
    setMedications([]);
  }, [labResult]);

  // --- Khi chọn bệnh
  const handleSelectDisease = useCallback(async (d: string) => {
    setSelectedDisease(d);
    setLoading(true);
    try {
      const data = await getTreatmentForDisease(d);
      setTreatmentSteps(data.possibleTreatments?.steps || []);
      const medsFromSteps = data.possibleTreatments?.steps?.flatMap((s: any) => s.medications || []);
      setMedications(medsFromSteps?.map((m: any) => ({ ...m, quantity: 1 })) || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSave = () => {
    const dataToSave = {
      patient: selectedPatient,
      conclusion: doctorConclusion,
      selectedLabTest,
      labResult,
      selectedDisease,
      steps: treatmentSteps,
      medications,
    };
    console.log("Dữ liệu lưu:", dataToSave);
    alert("✅ Đã lưu thành công!");
  };

  // --- JSX
  return (
    <div className="dashboard-container">
      {!selectedPatient ? (
        loadingPatients ? <p>⏳ Đang tải danh sách bệnh nhân...</p> :
          <PatientList
            patients={patients}
            onSelect={(p) => {
              setSelectedPatient(p);
              setDoctorConclusion("");
              setLabTests([]);
              setDiseases([]);
              setDisplayedLabTests([]);
              setDisplayedDiseases([]);
              setSelectedLabTest("");
              setSelectedDisease("");
              setLabResult("");
              setTreatmentSteps([]);
              setMedications([]);
            }}
          />
      ) : (
        <div className="dashboard-card">
          <button className="dashboard-btn dashboard-btn-back" onClick={() => setSelectedPatient(null)}>⬅ Quay lại danh sách</button>

          <div className="dashboard-info-box">
            <h2 className="dashboard-title">📋 Thông tin bệnh nhân</h2>
            <p><b>👤 Họ tên:</b> {selectedPatient.name}</p>
            <p><b>👨‍⚕️ Bác sĩ:</b> {selectedPatient.doctorName}</p>
          </div>

          <div className="dashboard-card">
            <h3>📝 Triệu chứng</h3>
            <textarea
              className="dashboard-textarea"
              rows={3}
              value={doctorConclusion}
              onChange={(e) => setDoctorConclusion(e.target.value)}
              placeholder="Nhập triệu chứng..."
            />
          </div>

          {displayedLabTests.length > 0 && (
            <>
              <h3>🧪 Xét nghiệm gợi ý:</h3>
              <LabTestButtons
                labTests={displayedLabTests}
                selectedLabTest={selectedLabTest}
                onSelect={setSelectedLabTest}
              />
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
          )}

          {displayedDiseases.length > 0 && (
            <>
              <h3>🦠 Bệnh gợi ý:</h3>
              <DiseaseButtons
                diseases={displayedDiseases}
                selectedDisease={selectedDisease}
                onSelect={handleSelectDisease}
              />
            </>
          )}
        </div>
      )}

      {treatmentSteps.length > 0 && (
        <div className="medications-wrapper">
          <TreatmentStepsTable steps={treatmentSteps} setSteps={setTreatmentSteps} />
          <MedicationsTable medications={medications} setMedications={setMedications} />
          <div className="save-btn-wrapper">
            <button className="dashboard-btn dashboard-btn-save" onClick={handleSave}>💾 Lưu hồ sơ</button>
          </div>
        </div>
      )}
    </div>
  );
}
