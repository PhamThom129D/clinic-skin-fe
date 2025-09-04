"use client";
import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import PatientList from "./PatientList";
import TreatmentStepsTable from "./TreatmentStepsTable";
import MedicationsTable from "./MedicationsTable";
import { checkPossibleDiseases, getTreatmentForDisease } from "@/services/aiService";
import "@/css/doctor/PatientDashboard.css";

// Component hiển thị AI đang gõ từng ký tự
const AiTyping: React.FC<{ text: string; speed?: number }> = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    setDisplayedText("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval); // kết thúc khi hết text
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span>{displayedText}</span>;
};


export default function PatientDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [doctorConclusion, setDoctorConclusion] = useState("");
  const [aiSuggestedDiseases, setAiSuggestedDiseases] = useState<string[]>([]);
  const [displayedDiseases, setDisplayedDiseases] = useState<string[]>([]);
  const [confirmedDiagnosis, setConfirmedDiagnosis] = useState<string>("");
  const [treatmentSteps, setTreatmentSteps] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const patients = [
    { id: 1, name: "Nguyễn Văn A", age: 25, gender: "Nam", symptoms: ["Đỏ nhiều"] },
    { id: 2, name: "Trần Thị B", age: 40, gender: "Nữ", symptoms: ["Đau đầu", "Chóng mặt"] },
    { id: 3, name: "Lê Văn C", age: 32, gender: "Nam", symptoms: ["Đau họng", "Khàn tiếng"] },
  ];

  const diseasesRef = useRef<HTMLDivElement>(null);

  // --- Auto AI gợi ý bệnh khi nhập kết luận sơ bộ
  // --- Auto AI gợi ý bệnh khi nhập kết luận sơ bộ
  useEffect(() => {
    if (!doctorConclusion) {
      setAiSuggestedDiseases([]);
      setDisplayedDiseases([]);
      setConfirmedDiagnosis("");
      setTreatmentSteps([]);
      setMedications([]);
      return;
    }

    const debouncedCheck = debounce(async () => {
      setLoading(true);
      try {
        const diseases = await checkPossibleDiseases(doctorConclusion);
        setAiSuggestedDiseases(diseases);
        setDisplayedDiseases([]);
        setConfirmedDiagnosis("");
        setTreatmentSteps([]);
        setMedications([]);

        // Hiển thị từng bệnh dần dần
        let index = 0;
        const interval = setInterval(() => {
          setDisplayedDiseases((prev) => [...prev, diseases[index]]);
          index++;
          if (index >= diseases.length) clearInterval(interval);

          // scroll xuống tự động
          if (diseasesRef.current) {
            diseasesRef.current.scrollTop = diseasesRef.current.scrollHeight;
          }
        }, 600);
      } catch (err) {
        console.error("❌ Lỗi AI gợi ý bệnh:", err);
      } finally {
        setLoading(false);
      }
    }, 5000); // ⬅ sau 5s không nhập nữa mới gọi API

    debouncedCheck();
    return () => debouncedCheck.cancel();
  }, [doctorConclusion]);


  // --- Khi bác sĩ xác nhận bệnh, lấy phác đồ & thuốc
  const handleConfirmDiagnosis = async () => {
    if (!confirmedDiagnosis) return;
    setLoading(true);
    try {
      const data = await getTreatmentForDisease(confirmedDiagnosis);
      setTreatmentSteps(data.steps || []);
      const medsFromSteps = data.steps?.flatMap((s: any) => s.medications || []);
      setMedications(medsFromSteps?.map((m: any) => ({ ...m, quantity: 1 })) || []);
    } catch (err) {
      console.error("❌ Lỗi gọi API phác đồ:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- Lưu hồ sơ bệnh nhân
  const handleSave = () => {
    const dataToSave = {
      patient: selectedPatient,
      conclusion: doctorConclusion,
      confirmedDiagnosis,
      steps: treatmentSteps,
      medications,
    };
    console.log("Dữ liệu lưu:", dataToSave);
    alert("✅ Đã lưu thành công!");
  };

  return (
    <div className="dashboard-container">
      {!selectedPatient ? (
        <PatientList
          patients={patients}
          onSelect={(p: any) => {
            setSelectedPatient(p);
            setDoctorConclusion("");
            setAiSuggestedDiseases([]);
            setDisplayedDiseases([]);
            setConfirmedDiagnosis("");
            setTreatmentSteps([]);
            setMedications([]);
          }}
        />
      ) : (
        <div className="dashboard-card">
          <button
            className="dashboard-btn dashboard-btn-back"
            onClick={() => setSelectedPatient(null)}
          >
            ⬅ Quay lại danh sách
          </button>

          {/* Thông tin bệnh nhân */}
          <div className="dashboard-info-box">
            <h2 className="dashboard-title">📋 Thông tin bệnh nhân</h2>
            <p><b>Họ tên:</b> {selectedPatient.name}</p>
            <p><b>Tuổi:</b> {selectedPatient.age}</p>
            <p><b>Giới tính:</b> {selectedPatient.gender}</p>
            <div className="dashboard-symptoms">
              <b>Triệu chứng:</b>
              <ul>
                {selectedPatient.symptoms.map((sym: string, i: number) => (
                  <li key={i}>{sym}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Kết luận sơ bộ */}
          <div className="dashboard-card">
            <h3>📝 Kết luận sơ bộ của bác sĩ</h3>
            <textarea
              className="dashboard-textarea"
              rows={3}
              value={doctorConclusion}
              onChange={(e) => setDoctorConclusion(e.target.value)}
              placeholder="Nhập triệu chứng hoặc kết luận sơ bộ..."
            />
          </div>

          {/* Danh sách bệnh AI gợi ý */}
          {displayedDiseases.length > 0 && (
            <div className="dashboard-ai-box" ref={diseasesRef}>
              <h3>🤖 AI gợi ý các bệnh khả năng cao:</h3>
              <ul>
                {displayedDiseases.map((d, i) => (
                  <li key={i} className="ai-disease-item">
                    <AiTyping text={d} speed={40} />
                    <button
                      type="button"
                      className="add-disease-btn"
                      onClick={() => setConfirmedDiagnosis(d)}
                    >

                    </button>
                  </li>
                ))}
              </ul>
              {/* Xác nhận bệnh */}
              <div style={{ marginTop: "10px" }}>
                <label>✅ Chọn hoặc nhập bệnh xác nhận:</label>
                <input
                  type="text"
                  value={confirmedDiagnosis}
                  onChange={(e) => setConfirmedDiagnosis(e.target.value)}
                  placeholder="Nhập tên bệnh cuối cùng"
                  list="aiDiseasesList"
                  style={{ marginLeft: "8px", padding: "4px", width: "200px" }}
                />
                <datalist id="aiDiseasesList">
                  {aiSuggestedDiseases.map((d: string, i: number) => (
                    <option key={i} value={d} />
                  ))}
                </datalist>
                <button
                  className="dashboard-btn dashboard-btn-ai"
                  onClick={handleConfirmDiagnosis}
                  disabled={loading || !confirmedDiagnosis}
                  style={{ marginLeft: "8px" }}
                >
                  {loading ? "⏳ Đang lấy phác đồ..." : "✅ Lấy phác đồ & thuốc"}
                </button>
              </div>
            </div>
          )}

          {/* Phác đồ điều trị + thuốc + nút lưu */}
          {treatmentSteps.length > 0 && (
            <div className="medications-wrapper">
              <TreatmentStepsTable steps={treatmentSteps} setSteps={setTreatmentSteps} />
              <MedicationsTable medications={medications} setMedications={setMedications} />
              <div className="save-btn-wrapper">
                <button className="dashboard-btn dashboard-btn-save" onClick={handleSave}>
                  💾 Lưu hồ sơ
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
