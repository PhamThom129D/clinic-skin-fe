"use client";
import React from "react";
import "@/css/doctor/PatientList.css";
import { Patient } from "@/services/patientList";


interface PatientListProps {
  patients: Patient[];
  onSelect: (patient: Patient) => void;
}

export default function PatientList({ patients, onSelect }: PatientListProps) {
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
                  {p.symptoms.join(", ")}
                </td>
                <td>
                  <button
                    className="patient-btn-exam"
                    onClick={() => onSelect(p)}
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
