"use client";
import React, { useRef, useEffect } from "react";
import "@/css/doctor/MedicationTable.css";

export default function MedicationsTable({ medications, setMedications }: any) {
    const medTableRef = useRef<HTMLTableElement>(null);

    // Đồng bộ chiều cao các ô trong bảng
    useEffect(() => {
        const table = medTableRef.current;
        if (!table) return;
        const rows = Array.from(table.querySelectorAll("tr"));
        rows.forEach((row) => {
            const cells = Array.from(row.querySelectorAll("td, th"));
            let maxHeight = 0;
            cells.forEach((cell) => {
                if (cell.scrollHeight > maxHeight) maxHeight = cell.scrollHeight;
            });
            cells.forEach((cell) => (cell.style.height = maxHeight + "px"));
        });
    }, [medications]);

    // Thêm thuốc mới
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

    const totalPrice = medications.reduce(
        (acc: number, m: any) => acc + m.price * m.quantity,
        0
    );

    const formatPrice = (value: number) => new Intl.NumberFormat("vi-VN").format(value) + " ₫";

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
                            <th>HDSD</th>
                            <th>Giá</th>
                            <th style={{ width: "60px" }}>Số lượng</th>
                            <th>Thành tiền</th>
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
                                    <textarea
                                        value={med.usageInstructions}
                                        className="med-input"
                                        onChange={(e) => {
                                            const newMeds = [...medications];
                                            newMeds[idx].usageInstructions = e.target.value;
                                            setMedications(newMeds);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        min={0}
                                        value={med.price}
                                        className="med-input"
                                        onChange={(e) => {
                                            const newMeds = [...medications];
                                            newMeds[idx].price = Number(e.target.value);
                                            setMedications(newMeds);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        min={1}
                                        value={med.quantity}
                                        className="med-input"
                                        onChange={(e) => {
                                            const newMeds = [...medications];
                                            newMeds[idx].quantity = Number(e.target.value);
                                            setMedications(newMeds);
                                        }}
                                    />
                                </td>
                                <td className="med-center">{formatPrice(med.price * med.quantity)}</td>
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
                            <td colSpan={6} style={{ color: 'red', fontSize: '1.2em' }}>
                                <b> Tổng tiền</b>
                            </td>

                            <td className="med-total"><b>{formatPrice(totalPrice)}</b> </td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
