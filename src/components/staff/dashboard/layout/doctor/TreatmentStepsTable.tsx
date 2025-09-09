"use client";
import React from "react";
import "@/css/doctor/TreatmentStepsTable.css";

export default function TreatmentStepsTable({ steps, setSteps }: any) {
  const addStep = () => {
    const newStep = {
      stepNumber: steps.length + 1,
      stepDesc: "",
      stepTypeName: "care_instructions",
      notes: "",
      itemDetails: null,
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (idx: number) => {
    const newSteps = [...steps];
    newSteps.splice(idx, 1);
    newSteps.forEach((s, i) => (s.stepNumber = i + 1));
    setSteps(newSteps);
  };

  return (
    <div className="ts-container">
      <h4 className="ts-title">📝 Bước điều trị</h4>
      <button onClick={addStep} className="ts-btn-add">
        ➕ Thêm bước
      </button>

      <div className="ts-table-wrapper">
        <table className="ts-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mô tả</th>
              <th>Loại</th>
              <th>Ghi chú</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step: any, idx: number) => (
              <tr key={idx}>
                <td className="ts-center">{step.stepNumber}</td>
                <td>
                  {step.stepTypeName === "Medication" && step.itemDetails?.details
                    ? step.itemDetails.details.map((m: any) => (
                        <div key={m.id}>
                          {m.medicationName} - {m.dosage} ({m.quantity} {m.unit})
                        </div>
                      ))
                    : step.stepDesc || step.notes || "-"}
                </td>
                <td>{step.stepTypeName}</td>
                <td>{step.notes || "-"}</td>
                <td className="ts-center">
                  <button onClick={() => removeStep(idx)} className="ts-btn-del">
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
