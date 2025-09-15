"use client";

import React, { useState, useEffect } from "react";
import "@/css/doctor/PatientList.css";

export default function Page() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 👇 gọi API backend (Spring Boot) để lấy danh sách bệnh nhân
    const fetchPatients = async () => {
      try {
        const res = await fetch("http://localhost:1209/api/patients"); 
        const data = await res.json();
        setPatients(data);
      } catch (error) {
        console.error("Lỗi khi tải bệnh nhân:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSelect = (patient: any) => {
    console.log("Khám bệnh nhân:", patient);
    // 👉 chuyển hướng sang trang khám chi tiết, ví dụ:
    // router.push(`/staff/doctor/${patient.id}`)
  };

  if (loading) {
    return <div>⏳ Đang tải danh sách bệnh nhân...</div>;
  }

  return (
    <div className="patient-list-container">
      <div className="patient-list-wrapper">
        <h2 className="patient-list-title">
          📋 Quản lý bệnh nhân đến khám
        </h2>

        <table className="patient-list-table">
          <thead>
            <tr>
              <th className="patient-col-stt">STT</th>
              <th className="patient-col-name">Họ tên</th>
              <th className="patient-col-date">Ngày khám</th>
              <th className="patient-col-symptoms">Triệu chứng</th>
              <th className="patient-col-action">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td className="patient-col-name">{p.name}</td>
                <td>{p.visitDate || "N/A"}</td>
                <td className="patient-col-symptoms">
                  {Array.isArray(p.symptoms) ? p.symptoms.join(", ") : p.symptoms}
                </td>
                <td>
                  <button
                    className="patient-btn-exam"
                    onClick={() => handleSelect(p)}
                  >
                    🩺 Khám
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
