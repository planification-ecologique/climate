"use client";

import { useClimateStore } from "@/stores/useClimateStore";
import { getAllScenarios, getScenarioInfo } from "@/lib/climate/indicators";

export function ScenarioSelector() {
  const { scenario, setScenario } = useClimateStore();
  const scenarios = getAllScenarios();

  const cardStyle: React.CSSProperties = {
    background: "#f6f6f6",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
  };

  const buttonStyle = (isActive: boolean, color: string): React.CSSProperties => ({
    flex: 1,
    padding: "8px",
    border: `2px solid ${isActive ? color : "transparent"}`,
    borderRadius: "4px",
    background: isActive ? "#e3e3fd" : "#fff",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "14px",
    transition: "all 0.2s",
  });

  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
        Scénario climatique
      </h3>
      <div style={{ display: "flex", gap: "8px" }}>
        {scenarios.map((s) => (
          <button
            key={s.code}
            style={buttonStyle(scenario === s.code, s.color)}
            onClick={() => setScenario(s.code)}
            title={s.description}
          >
            <div style={{ fontWeight: 500 }}>{s.name}</div>
            <div style={{ fontSize: "11px", opacity: 0.75 }}>{s.warmingRange}</div>
          </button>
        ))}
      </div>
      <p style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
        {getScenarioInfo(scenario).description}
      </p>
    </div>
  );
}
