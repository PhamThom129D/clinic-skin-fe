"use client";
import React, { useRef, useEffect } from "react";
import "@/css/doctor/MedicationTable.css";

export default function MedicationsTable({ medications, setMedications }: any) {
  const medTableRef = useRef<HTMLTableElement>(null);

  // --- Đồng bộ chiều cao các ô trong bảng
  useEffect(() => {
    const table = medTableRef.current;
    if (!table) return;
    const rows = Array.from(table.querySelectorAll("tr"));
    rows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll("td, th"));
      const maxHeight = Math.max(...cells.map((cell) => (cell as HTMLElement).scrollHeight));
      cells.forEach((cell) => ((cell as HTMLElement).style.height = maxHeight + "px"));
    });
  }, [medications]);

  const addMedication = () => {
    setMedications([
      ...medications,
      { name: "Tên thuốc mẫu", dosage: "", unit: "viên", price: 0, quantity: 1 },
    ]);
  };

  const removeMedication = (idx: number) => {
    const newMeds = [...medications];
    newMeds.splice(idx, 1);
    setMedications(newMeds);
  };

  return (
    <div className="med-container">
      <h4 className="med-title">💊 Thuốc kê đơn</h4>
      <button onClick={addMedication} className="med-btn-add">
        ➕ Thêm thuốc
      </button>

      <div className="med-table-wrapper">
        <table className="med-table" ref={medTableRef}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên thuốc</th>
              <th>Liều dùng</th>
              <th style={{ width: "100px" }}>Số lượng</th>
              <th style={{ width: "100px" }}>Đơn vị</th>
              <th style={{ width: "200px" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med: any, idx: number) => (
              <tr key={idx}>
                <td className="med-center">{idx + 1}</td>

                {/* Tên thuốc (readonly) */}
                <td>
                  <span className="med-readonly">{med.name}</span>
                </td>

                {/* Liều dùng (có thể sửa) */}
                <td>
                  <textarea
                    value={med.dosage}
                    className="med-input"
                    onChange={(e) => {
                      const newMeds = [...medications];
                      newMeds[idx].dosage = e.target.value;
                      setMedications(newMeds);
                    }}
                  />
                </td>

                {/* Số lượng (có thể sửa) */}
                <td>
                  <input
                    type="number"
                    min={1}
                    value={med.quantity || 1}
                    className="med-input"
                    onChange={(e) => {
                      const newMeds = [...medications];
                      newMeds[idx].quantity = Number(e.target.value);
                      setMedications(newMeds);
                    }}
                  />
                </td>

                {/* Đơn vị (readonly) */}
                <td>
                  <span className="med-readonly">{med.unit}</span>
                </td>

                <td className="med-center">
                  <button onClick={() => removeMedication(idx)} className="med-btn-del">
                    ❌ Xóa
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
