"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function GlobalLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const stop = () => setLoading(false);

    window.addEventListener("globalLoadingStart", start);
    window.addEventListener("globalLoadingStop", stop);

    return () => {
      window.removeEventListener("globalLoadingStart", start);
      window.removeEventListener("globalLoadingStop", stop);
    };
  }, []);

  useEffect(() => {
    if (!pathname) return;
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!loading) return null;

  const generateECGPath = () => {
    let d = "M 0 200 ";
    const totalLength = 3000;
    let x = 0;

    while (x < totalLength) {
      // P wave
      d += `L ${x + 10} ${180 + Math.random() * 40} `;
      d += `L ${x + 20} 200 `;
      // QRS
      const q = 130 + Math.random() * 40;
      const r = 270 + Math.random() * 40;
      const s = 180 - Math.random() * 40;
      d += `L ${x + 40} ${q} L ${x + 50} ${r} L ${x + 60} ${s} `;
      // T wave
      d += `L ${x + 80} ${200 + Math.random() * 60} L ${x + 90} 200 `;
      x += 140 + Math.random() * 80; // giãn nhịp
    }

    return d;
  };

  return (
    <div className="ecg-overlay">
      <svg
        className="ecg-svg"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* Baseline ECG nhạt */}
        <line x1="0" y1="200" x2="10000" y2="200" stroke="#a8ff5a" strokeWidth="2" />
        {/* Sóng ECG nổi bật với glow */}
        <path
          className="ecg-wave"
          d={generateECGPath()}
          fill="none"
          stroke="#d0ff3c"
          strokeWidth="3"  // mảnh hơn
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <style>{`
        .ecg-overlay {
          position: fixed;
          inset: 0;
          background: #0a1f1c; /* nền tối tông xanh rêu */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000; 
        }

        .ecg-svg {
          width: 1040px;
          height: 400px;
        }

        .ecg-wave {
          stroke-dasharray: 4000;
          stroke-dashoffset: 4000;
          animation: drawWave 1.5s linear infinite;
          filter: drop-shadow(0 0 8px #d0ff3c) drop-shadow(0 0 4px #d0ff3c);
        }

        @keyframes drawWave {
          0% {
            stroke-dashoffset: 4000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
