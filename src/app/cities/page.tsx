"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

interface City {
  id: number;
  thanhPho: string;
  quocGia: string;
  dienTich?: number;
  danSo?: number;
  gdp?: number;
  moTa?: string;
}

export default function CityList() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCities = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/cities");
      const data = await res.json();
      setCities(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    const result = await Swal.fire({
      title: `Xóa thành phố "${name}"?`,
      text: `Bạn có chắc muốn xóa thành phố "${name}" không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy"
    });
    


    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:8080/api/cities/${id}`, {
          method: "DELETE"
        });
        setCities(cities.filter(c => c.id !== id));
         Swal.fire({
      title: "Đã xóa!",
      text: `Thành phố "${name}" đã được xóa.`,
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
      timerProgressBar: true
    });
      } catch (error) {
        console.error(error);
        Swal.fire("Lỗi", "Xóa thất bại.", "error");
      }
    }
  };


  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "40px", color: "#6b7280" }}>
        Đang tải...
      </div>
    );

  const containerStyle: React.CSSProperties = {
    padding: "24px",
    backgroundColor: "#f9fafb",
    minHeight: "100vh"
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#111827"
  };

  const buttonStyle = (bg: string, hoverBg: string): React.CSSProperties => ({
    backgroundColor: bg,
    color: "white",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s",
    fontWeight: 500
  });

  const tableStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "white",
    borderCollapse: "collapse",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden"
  };

  const thStyle: React.CSSProperties = {
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    fontWeight: 600
  };

  const tdStyle: React.CSSProperties = {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "middle"
  };

  const rowHoverStyle: React.CSSProperties = {
    transition: "background-color 0.2s"
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Danh sách Thành Phố</h1>

      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "flex-end" }}>
        <Link href="/cities/add">
          <button
            style={buttonStyle("#16a34a", "#15803d")}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = "#15803d")}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = "#16a34a")}
          >
            Thêm Thành Phố
          </button>
        </Link>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Thành phố</th>
              <th style={thStyle}>Quốc gia</th>
              <th style={thStyle}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, index) => (
              <tr
                key={city.id}
                style={rowHoverStyle}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = "#f9fafb")}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = "white")}
              >
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{city.thanhPho}</td>
                <td style={tdStyle}>{city.quocGia}</td>
                <td style={{ ...tdStyle, display: "flex", gap: "8px" }}>
                  <Link href={`/cities/edit/${city.id}`}>
                    <button
                      style={buttonStyle("#f59e0b", "#d97706")}
                      onMouseOver={e => (e.currentTarget.style.backgroundColor = "#d97706")}
                      onMouseOut={e => (e.currentTarget.style.backgroundColor = "#f59e0b")}
                    >
                      Sửa
                    </button>
                  </Link>
                  <Link href={`/cities/detail/${city.id}`}>
                    <button
                      style={buttonStyle("#3b82f6", "#2563eb")}
                      onMouseOver={e => (e.currentTarget.style.backgroundColor = "#2563eb")}
                      onMouseOut={e => (e.currentTarget.style.backgroundColor = "#3b82f6")}
                    >
                      Xem
                    </button>
                  </Link>
                  <button
                    style={buttonStyle("#ef4444", "#b91c1c")}
                    onMouseOver={e => (e.currentTarget.style.backgroundColor = "#b91c1c")}
                    onMouseOut={e => (e.currentTarget.style.backgroundColor = "#ef4444")}
                    onClick={() => handleDelete(city.id, city.thanhPho)}
                  >
                    Xóa
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
