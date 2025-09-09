"use client";
import React, { useRef, useEffect, useMemo } from "react";
import '@/css/doctor/MedicationTable.css';

export default function MedicationsTable({ medications, setMedications }: any) {
    const medTableRef = useRef<HTMLTableElement>(null);

    // Đồng bộ chiều cao các ô trong bảng
    useEffect(() => {
        const table = medTableRef.current;
        if (!table) return;
        const rows = Array.from(table.querySelectorAll("tr"));
        rows.forEach((row) => {
            const cells = Array.from(row.querySelectorAll("td, th"));
            const maxHeight = Math.max(...cells.map(cell => (cell as HTMLElement).scrollHeight));
            cells.forEach(cell => ((cell as HTMLElement).style.height = maxHeight + "px"));
        });
    }, [medications]);

    const addMedication = () => {
        setMedications([
            ...medications,
            { name: "", dosage: "", usageInstructions: "", price: 0, quantity: 1 },
        ]);
    };

    const removeMedication = (idx: number) => {
        const newMeds = [...medications];
        newMeds.splice(idx, 1);
        setMedications(newMeds);
    };

    // Tổng tiền
    const totalPrice = useMemo(() => {
        return medications.reduce((acc: number, m: any) => acc + Number(m.price) * Number(m.quantity), 0);
    }, [medications]);

    // Format số sang dạng 12.000 ₫
    const formatPrice = (value: number) =>
        new Intl.NumberFormat("vi-VN").format(value) + " ₫";

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
                            <th style={{ width: "120px" }}>Giá</th>
                            <th style={{ width: "60px" }}>Số lượng</th>
                            <th style={{ width: "200px" }}>Thành tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medications.map((med: any, idx: number) => (
                            <tr key={idx}>
                                <td className="med-center">{idx + 1}</td>
                                <td>
                                    <textarea
                                        value={med.name}
                                        className="med-input"
                                        onChange={(e) => {
                                            const newMeds = [...medications];
                                            newMeds[idx].name = e.target.value;
                                            setMedications(newMeds);
                                        }}
                                    />
                                </td>
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
                                
                                <td>
                                    <input
                                        type="text"
                                        value={formatPrice(Number(med.price))}
                                        className="med-input"
                                        onChange={(e) => {
                                            const newMeds = [...medications];
                                            // Bỏ dấu . và ₫, lấy số nguyên
                                            const raw = Number(e.target.value.replace(/\D/g, ""));
                                            newMeds[idx].price = raw;
                                            setMedications(newMeds);
                                        }}
                                    />
                                </td>
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
                                <td className="med-center">{formatPrice(Number(med.price) * Number(med.quantity))}</td>
                                <td className="med-center">
                                    <button
                                        onClick={() => removeMedication(idx)}
                                        className="med-btn-del"
                                    >
                                        ❌ Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6} style={{ textAlign: 'right', color: 'red', fontWeight: 'bold' }}>
                                Tổng tiền
                            </td>
                            <td className="med-total" style={{ color: 'red', fontWeight: 'bold' }}>
                                {formatPrice(totalPrice)}
                            </td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
