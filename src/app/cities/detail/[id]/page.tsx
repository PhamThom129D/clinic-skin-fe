"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface City {
  id: number;
  thanhPho: string;
  quocGia: string;
  dienTich?: number;
  danSo?: number;
  gdp?: number;
  moTa?: string;
}

export default function CityDetail() {
  const router = useRouter();
  const params = useParams(); // lấy id từ route
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/cities/${params.id}`);
        const data = await res.json();
        setCity(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCity();
  }, [params.id]);

  if (loading)
    return <div style={{ textAlign: "center", marginTop: "40px", color: "#6b7280" }}>Đang tải...</div>;

  if (!city)
    return <div style={{ textAlign: "center", marginTop: "40px", color: "#ef4444" }}>Không tìm thấy thành phố</div>;

  const containerStyle: React.CSSProperties = {
    padding: "24px",
    backgroundColor: "#f9fafb",
    minHeight: "100vh"
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    margin: "0 auto"
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#111827",
    textAlign: "center"
  };

  const labelStyle: React.CSSProperties = {
    fontWeight: 500,
    color: "#374151",
    marginBottom: "4px"
  };

  const valueStyle: React.CSSProperties = {
    marginBottom: "16px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb"
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Chi Tiết Thành Phố</h1>

        <div>
          <div>
            <div style={labelStyle}>Thành phố</div>
            <div style={valueStyle}>{city.thanhPho}</div>
          </div>

          <div>
            <div style={labelStyle}>Quốc gia</div>
            <div style={valueStyle}>{city.quocGia}</div>
          </div>

          <div>
            <div style={labelStyle}>Diện tích</div>
            <div style={valueStyle}>{city.dienTich ?? "-"}</div>
          </div>

          <div>
            <div style={labelStyle}>Dân số</div>
            <div style={valueStyle}>{city.danSo ?? "-"}</div>
          </div>

          <div>
            <div style={labelStyle}>GDP</div>
            <div style={valueStyle}>{city.gdp ?? "-"}</div>
          </div>

          <div>
            <div style={labelStyle}>Mô tả</div>
            <div style={valueStyle}>{city.moTa ?? "-"}</div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button style={buttonStyle} onClick={() => router.back()}>
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
