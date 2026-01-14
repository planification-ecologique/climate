"use client";

import { useClimateStore } from "@/stores/useClimateStore";
import { getAllPeriods } from "@/lib/climate/indicators";

export function PeriodSelector() {
  const { period, setPeriod } = useClimateStore();
  const periods = getAllPeriods();

  const cardStyle: React.CSSProperties = {
    background: "#f6f6f6",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
  };

  const buttonStyle = (isActive: boolean): React.CSSProperties => ({
    fontSize: "12px",
    textAlign: "center",
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: "4px",
    background: isActive ? "#e3e3fd" : "transparent",
    border: "none",
    fontWeight: isActive ? 600 : 400,
    transition: "background 0.2s",
  });

  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
        Horizon temporel
      </h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {periods.map((p) => (
          <button
            key={p.code}
            style={buttonStyle(period === p.code)}
            onClick={() => setPeriod(p.code)}
          >
            <div style={{ fontWeight: 500, fontSize: "13px" }}>{p.name}</div>
            <div style={{ fontSize: "11px", opacity: 0.75 }}>{p.years}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
