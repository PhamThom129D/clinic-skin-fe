"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface City {
  thanhPho: string;
  quocGia: string;
  dienTich?: string;
  danSo?: string;
  gdp?: string;
  moTa?: string;
}

export default function AddCity() {
  const router = useRouter();
  const [city, setCity] = useState<City>({
    thanhPho: "",
    quocGia: "",
    dienTich: "",
    danSo: "",
    gdp: "",
    moTa: "",
  });

  const countries = ["Việt Nam", "Mỹ", "Nhật Bản", "Hàn Quốc", "Pháp", "Anh", "Trung Quốc"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCity(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...city,
        dienTich: city.dienTich ? Number(city.dienTich) : 0,
        danSo: city.danSo ? Number(city.danSo) : 0,
        gdp: city.gdp ? Number(city.gdp) : 0,
      };

      const res = await fetch("http://localhost:8080/api/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await Swal.fire({
          title: "Thành công!",
          text: `Thành phố "${city.thanhPho}" đã được thêm.`,
          icon: "success",
          timer: 1000, 
          showConfirmButton: false,
          position: "center",
             timerProgressBar: true
        });
        setTimeout(() => {
          router.push("/cities");
        }, 1000); 
      } else {
        Swal.fire({
          title: "Lỗi!",
          text: "Thêm thành phố thất bại, thử lại sau.",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Lỗi!",
        text: "Có lỗi xảy ra, thử lại sau.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // --- phần giao diện giữ nguyên ---
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
    padding: "20px"
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "800px"
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  };

  const fullWidthStyle: React.CSSProperties = {
    gridColumn: "span 2"
  };

  const labelStyle: React.CSSProperties = {
    marginBottom: "5px",
    fontWeight: 500,
    color: "#333"
  };

  const inputStyle: React.CSSProperties = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    width: "100%",
    boxSizing: "border-box"
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "15px",
    marginTop: "20px"
  };

  const saveButtonStyle: React.CSSProperties = {
    flex: 1,
    padding: "12px",
    backgroundColor: "#1d4ed8",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  };

  const cancelButtonStyle: React.CSSProperties = {
    flex: 1,
    padding: "12px",
    backgroundColor: "#6b7280",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Thêm Thành Phố</h1>

        <div style={gridStyle}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Thành phố</label>
            <input
              name="thanhPho"
              value={city.thanhPho}
              onChange={handleChange}
              placeholder="Thành phố"
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Quốc gia</label>
            <select
              name="quocGia"
              value={city.quocGia}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Chọn quốc gia</option>
              {countries.map((country, idx) => (
                <option key={idx} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Diện tích</label>
            <input
              name="dienTich"
              type="number"
              value={city.dienTich}
              onChange={handleChange}
              placeholder="Diện tích"
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Dân số</label>
            <input
              name="danSo"
              type="number"
              value={city.danSo}
              onChange={handleChange}
              placeholder="Dân số"
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>GDP</label>
            <input
              name="gdp"
              type="number"
              value={city.gdp}
              onChange={handleChange}
              placeholder="GDP"
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", ...fullWidthStyle }}>
            <label style={labelStyle}>Mô tả</label>
            <textarea
              name="moTa"
              value={city.moTa}
              onChange={handleChange}
              placeholder="Mô tả"
              rows={4}
              style={{ ...inputStyle, resize: "none" }}
            />
          </div>
        </div>

        <div style={buttonContainerStyle}>
          <button onClick={handleSubmit} style={saveButtonStyle}>Lưu</button>
          <button onClick={() => router.push("/cities")} style={cancelButtonStyle}>Thoát</button>
        </div>
      </div>
    </div>
  );
}
