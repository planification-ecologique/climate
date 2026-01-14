"use client";

import { useClimateStore } from "@/stores/useClimateStore";
import { getAllIndicators } from "@/lib/climate/indicators";

export function IndicatorSelector() {
  const { indicator, setIndicator } = useClimateStore();
  const indicators = getAllIndicators();

  // Group indicators by category
  const temperatureIndicators = indicators.filter((i) =>
    ["tas", "tasmax", "tasmin"].includes(i.code)
  );
  const extremeIndicators = indicators.filter((i) =>
    ["fd", "tr", "su", "hwdi"].includes(i.code)
  );
  const otherIndicators = indicators.filter((i) =>
    ["pr", "fwi"].includes(i.code)
  );

  const cardStyle: React.CSSProperties = {
    background: "#f6f6f6",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
  };

  const chipStyle = (isActive: boolean): React.CSSProperties => ({
    padding: "8px 12px",
    border: `1px solid ${isActive ? "#000091" : "#e5e5e5"}`,
    borderRadius: "4px",
    background: isActive ? "#e3e3fd" : "#fff",
    cursor: "pointer",
    fontSize: "13px",
    textAlign: "center",
    transition: "all 0.2s",
    fontWeight: isActive ? 500 : 400,
  });

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "8px",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 500,
    color: "#666",
    marginBottom: "8px",
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
        Indicateur climatique
      </h3>
      
      <div style={{ marginBottom: "12px" }}>
        <p style={labelStyle}>Température</p>
        <div style={gridStyle}>
          {temperatureIndicators.map((ind) => (
            <button
              key={ind.code}
              style={chipStyle(indicator === ind.code)}
              onClick={() => setIndicator(ind.code)}
              title={ind.description}
            >
              {ind.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <p style={labelStyle}>Événements extrêmes</p>
        <div style={gridStyle}>
          {extremeIndicators.map((ind) => (
            <button
              key={ind.code}
              style={chipStyle(indicator === ind.code)}
              onClick={() => setIndicator(ind.code)}
              title={ind.description}
            >
              {ind.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p style={labelStyle}>Autres</p>
        <div style={gridStyle}>
          {otherIndicators.map((ind) => (
            <button
              key={ind.code}
              style={chipStyle(indicator === ind.code)}
              onClick={() => setIndicator(ind.code)}
              title={ind.description}
            >
              {ind.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
