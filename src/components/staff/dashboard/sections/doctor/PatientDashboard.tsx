"use client";
import React, { useState, useEffect } from "react";
import { getPatientsByDate, Patient } from "@/services/patientList";
import PatientList from "./PatientList";

import { RoleEnum } from "@/utils/enums";
import { getCurrentUserRole } from "@/utils/menuHelper";

import "@/css/doctor/PatientDashboard.css";
import DoctorExam from "./DoctorExamPage";

interface PatientDashboardProps {
  darkMode: boolean;
}

export default function PatientDashboard({ darkMode }: PatientDashboardProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [role, setRole] = useState<RoleEnum | null>(null);

  // --- Lấy role hiện tại
  useEffect(() => {
    const userRole = getCurrentUserRole();
    if (userRole) setRole(userRole as RoleEnum);
  }, []);

  // --- Format ngày local
  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

  // --- Lấy danh sách bệnh nhân theo ngày
  useEffect(() => {
    let isMounted = true;

    const fetchPatients = async () => {
      setLoadingPatients(true);
      try {
        const today = formatDate(new Date());
        const data = await getPatientsByDate(today);
        if (isMounted) setPatients(data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách bệnh nhân:", err);
      } finally {
        if (isMounted) setLoadingPatients(false);
      }
    };

    fetchPatients();

    return () => {
      isMounted = false;
    };
  }, []);

  // --- JSX
  return (
    <div
      className={`dashboard-container ${darkMode ? "dark" : ""}`}
      style={{
        backgroundColor: darkMode ? "#1e1e2f" : "#fff",
        color: darkMode ? "#f0f0f0" : "inherit",
        minHeight: "100vh",
        padding: 16,
      }}
    >
      {!selectedPatient ? (
        loadingPatients ? (
          <p>⏳ Đang tải danh sách bệnh nhân...</p>
        ) : (
          role && (
            <PatientList
              patients={patients}
              role={role}
              onViewDetails={(p) => setSelectedPatient(p)}
              onExam={role === RoleEnum.DOCTOR ? (p) => setSelectedPatient(p) : undefined}
              onApprove={role === RoleEnum.RECEPTIONIST ? (p) => console.log("Duyệt", p) : undefined}
            />
          )
        )
      ) : (
        <DoctorExam
          patient={selectedPatient}
          darkMode={darkMode}
          onBack={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
}
