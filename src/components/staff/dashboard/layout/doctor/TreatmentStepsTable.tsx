// "use client";
// import React, { useEffect, useRef } from "react";
// import "@/css/doctor/TreatmentStepsTable.css";

// export default function TreatmentStepsTable({ steps, setSteps }: any) {
//   const tableRef = useRef<HTMLTableElement>(null);

//   // --- Thêm bước
//   const addStep = () => {
//     const newStep = {
//       stepNumber: steps.length + 1,
//       stepDesc: "",
//       stepTypeName: "care_instructions",
//       notes: "",
//       itemDetails: { details: [] },
//     };
//     setSteps([...steps, newStep]);
//   };

//   // --- Xóa bước
//   const removeStep = (idx: number) => {
//     const newSteps = [...steps];
//     newSteps.splice(idx, 1);
//     newSteps.forEach((s, i) => (s.stepNumber = i + 1));
//     setSteps(newSteps);
//   };

//   // --- Cập nhật field của step
//   const updateStepField = (idx: number, field: string, value: any) => {
//     const newSteps = [...steps];
//     newSteps[idx][field] = value;
//     setSteps(newSteps);
//   };

//   // --- Cập nhật field của thuốc trong step
//   const updateMedicationField = (stepIdx: number, medIdx: number, field: string, value: any) => {
//     const newSteps = [...steps];
//     const med = newSteps[stepIdx].itemDetails.details[medIdx];
//     med[field] = value;
//     setSteps(newSteps);
//   };

//   // --- Đồng bộ chiều cao các ô
//   useEffect(() => {
//     const table = tableRef.current;
//     if (!table) return;
//     const rows = Array.from(table.querySelectorAll("tr"));
//     rows.forEach((row) => {
//       const cells = Array.from(row.querySelectorAll("td, th"));
//       const maxHeight = Math.max(...cells.map(cell => (cell as HTMLElement).scrollHeight));
//       cells.forEach(cell => ((cell as HTMLElement).style.height = maxHeight + "px"));
//     });
//   }, [steps]);

//   return (
//     <div className="ts-container">
//       <h4 className="ts-title">📝 Bước điều trị</h4>
//       <button onClick={addStep} className="ts-btn-add">➕ Thêm bước</button>

//       <div className="ts-table-wrapper">
//         <table className="ts-table" ref={tableRef}>
//           <thead>
//             <tr>
//               <th>STT</th>
//               <th>Loại</th>
//               <th>Mô tả</th>
//               <th>Ghi chú</th>
//               <th>Hành động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {steps.map((step: any, stepIdx: number) => (
//               <tr key={stepIdx}>
//                 <td>{step.stepNumber}</td>

//                 <td>
//                   <select
//                     className="ts-input"
//                     value={step.stepTypeName}
//                     onChange={(e) => updateStepField(stepIdx, "stepTypeName", e.target.value)}
//                   >
//                     <option value="Medication">Medication</option>
//                     <option value="Procedure">Procedure</option>
//                     <option value="LabTest">LabTest</option>
//                     <option value="care_instructions">Hướng dẫn</option>
//                   </select>
//                 </td>

//                 <td>
//                   {step.stepTypeName === "Medication" && step.itemDetails?.details?.length > 0
//                     ? step.itemDetails.details.map((m: any, medIdx: number) => (
//                         <div key={m.id} style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "6px" }}>
//                           <input
//                             className="ts-input"
//                             type="text"
//                             value={m.medicationName}
//                             placeholder="Tên thuốc"
//                             onChange={(e) => updateMedicationField(stepIdx, medIdx, "medicationName", e.target.value)}
//                           />
//                           <input
//                             className="ts-input"
//                             type="text"
//                             value={m.dosage}
//                             placeholder="Liều dùng"
//                             onChange={(e) => updateMedicationField(stepIdx, medIdx, "dosage", e.target.value)}
//                           />
//                           <input
//                             className="ts-input"
//                             type="number"
//                             value={m.quantity}
//                             placeholder="SL"
//                             onChange={(e) => updateMedicationField(stepIdx, medIdx, "quantity", Number(e.target.value))}
//                           />
//                           <input
//                             className="ts-input"
//                             type="text"
//                             value={m.unit}
//                             placeholder="Đơn vị"
//                             onChange={(e) => updateMedicationField(stepIdx, medIdx, "unit", e.target.value)}
//                           />
//                         </div>
//                       ))
//                     : (
//                       <textarea
//                         className="ts-input"
//                         value={step.stepDesc}
//                         rows={2}
//                         placeholder="Mô tả bước"
//                         onChange={(e) => updateStepField(stepIdx, "stepDesc", e.target.value)}
//                       />
//                     )}
//                 </td>

//                 <td>
//                   <textarea
//                     className="ts-input"
//                     value={step.notes || ""}
//                     rows={2}
//                     placeholder="Ghi chú"
//                     onChange={(e) => updateStepField(stepIdx, "notes", e.target.value)}
//                   />
//                 </td>

//                 <td>
//                   <button onClick={() => removeStep(stepIdx)} className="ts-btn-del">❌ Xóa</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
