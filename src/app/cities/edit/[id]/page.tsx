"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface City {
  thanhPho: string;
  quocGia: string;
  dienTich?: string;
  danSo?: string;
  gdp?: string;
  moTa?: string;
}

export default function EditCity() {
  const router = useRouter();
  const params = useParams();
  const [city, setCity] = useState<City>({
    thanhPho: "",
    quocGia: "",
    dienTich: "",
    danSo: "",
    gdp: "",
    moTa: ""
  });
  const [loading, setLoading] = useState(true);

  const countries = ["Việt Nam", "Mỹ", "Nhật Bản", "Hàn Quốc", "Pháp", "Anh", "Trung Quốc"];

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/cities/${params.id}`);
        const data = await res.json();
        setCity({
          thanhPho: data.thanhPho ?? "",
          quocGia: data.quocGia ?? "",
          dienTich: data.dienTich?.toString() ?? "",
          danSo: data.danSo?.toString() ?? "",
          gdp: data.gdp?.toString() ?? "",
          moTa: data.moTa ?? ""
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCity();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCity(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...city,
        dienTich: city.dienTich ? Number(city.dienTich) : 0,
        danSo: city.danSo ? Number(city.danSo) : 0,
        gdp: city.gdp ? Number(city.gdp) : 0
      };
      const res = await fetch(`http://localhost:8080/api/cities/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        await Swal.fire({
          title: "Thành công!",
          text: `Thành phố "${city.thanhPho}" đã được cập nhật.`,
          icon: "success",
          showConfirmButton: false,
          timer: 1200,
          confirmButtonColor: "#3b82f6",
          timerProgressBar: true
        });
        setTimeout(() => {
          router.push("/cities");
        }, 500);
      } else {
        Swal.fire({
          title: "Lỗi!",
          text: "Cập nhật thất bại, thử lại sau.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          confirmButtonText: "OK"
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Lỗi!",
        text: "Có lỗi xảy ra, thử lại sau.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "OK"
      });
    }
  };

  if (loading)
    return <div style={{ textAlign: "center", marginTop: "40px", color: "#6b7280" }}>Đang tải...</div>;

  // --- Inline CSS đẹp hơn ---
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
    gap: "10px"
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "750px"
  };

  const titleStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "30px",
    color: "#111827"
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px"
  };

  const fullWidthStyle: React.CSSProperties = { gridColumn: "span 2" };
  const labelStyle: React.CSSProperties = { marginBottom: "6px", fontWeight: 600, color: "#374151" };
  const inputStyle: React.CSSProperties = { padding: "12px", borderRadius: "10px", border: "1px solid #d1d5db", outline: "none", width: "100%", fontSize: "16px" };

  const buttonContainerStyle: React.CSSProperties = { display: "flex", gap: "15px", marginTop: "30px" };
  const saveButtonStyle: React.CSSProperties = { flex: 1, padding: "14px", backgroundColor: "#3b82f6", color: "white", fontWeight: "bold", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "16px" };
  const cancelButtonStyle: React.CSSProperties = { flex: 1, padding: "14px", backgroundColor: "#6b7280", color: "white", fontWeight: "bold", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "16px" };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Sửa Thành Phố</h1>

        <div style={gridStyle}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Thành phố</label>
            <input name="thanhPho" value={city.thanhPho} onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Quốc gia</label>
            <select name="quocGia" value={city.quocGia} onChange={handleChange} style={inputStyle}>
              <option value="">Chọn quốc gia</option>
              {countries.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Diện tích</label>
            <input name="dienTich" type="number" value={city.dienTich} onChange={handleChange} style={inputStyle} placeholder="Diện tích" />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Dân số</label>
            <input name="danSo" type="number" value={city.danSo} onChange={handleChange} style={inputStyle} placeholder="Dân số" />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>GDP</label>
            <input name="gdp" type="number" value={city.gdp} onChange={handleChange} style={inputStyle} placeholder="GDP" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", ...fullWidthStyle }}>
            <label style={labelStyle}>Mô tả</label>
            <textarea name="moTa" value={city.moTa} onChange={handleChange} rows={4} style={{ ...inputStyle, resize: "none" }} />
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
