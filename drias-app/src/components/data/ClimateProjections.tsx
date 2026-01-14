"use client";

import { useState } from "react";
import { 
  getFranceClimateSummary, 
  SSP_SCENARIOS, 
  PROJECTION_PERIODS,
  CLIMATE_VARIABLES,
  type SSPScenario,
  type ProjectionPeriod 
} from "@/lib/climate/cckp-api";

export function ClimateProjections() {
  const [selectedPeriod, setSelectedPeriod] = useState<ProjectionPeriod>('2040-2059');
  const climateSummary = getFranceClimateSummary();
  
  // Filter projections for selected period
  const periodProjections = climateSummary.projections.filter(p => p.period === selectedPeriod);
  
  // Group by variable
  const tempProjections = periodProjections.filter(p => p.variable === 'tas');
  
  return (
    <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #e5e5e5" }}>
      <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
        Projections climatiques France
      </h3>
      <p style={{ fontSize: "11px", color: "#666", marginBottom: "12px" }}>
        Source: <a href="https://climateknowledgeportal.worldbank.org/country/france" target="_blank" rel="noopener" style={{ color: "#000091" }}>
          World Bank CCKP (CMIP6)
        </a>
      </p>
      
      {/* Period selector */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {(Object.entries(PROJECTION_PERIODS) as [ProjectionPeriod, { label: string }][]).map(([period, info]) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            style={{
              padding: "6px 12px",
              fontSize: "12px",
              border: selectedPeriod === period ? "2px solid #000091" : "1px solid #ddd",
              borderRadius: "4px",
              background: selectedPeriod === period ? "#f0f0ff" : "white",
              cursor: "pointer",
              fontWeight: selectedPeriod === period ? 600 : 400,
            }}
          >
            {info.label}
          </button>
        ))}
      </div>
      
      {/* Temperature anomaly by scenario */}
      <div style={{ 
        background: "#f8f9fa", 
        borderRadius: "8px", 
        padding: "12px",
        marginBottom: "12px" 
      }}>
        <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "12px" }}>
          🌡️ Réchauffement prévu ({PROJECTION_PERIODS[selectedPeriod].label})
        </h4>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {tempProjections.map((proj) => {
            const scenarioInfo = SSP_SCENARIOS[proj.scenario];
            const barWidth = Math.min((proj.value / 5) * 100, 100);
            
            return (
              <div key={proj.scenario} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "70px", fontSize: "11px", fontWeight: 500 }}>
                  {scenarioInfo.name}
                </div>
                <div style={{ flex: 1, background: "#e9ecef", borderRadius: "4px", height: "20px", position: "relative" }}>
                  <div 
                    style={{ 
                      width: `${barWidth}%`, 
                      height: "100%", 
                      background: scenarioInfo.color,
                      borderRadius: "4px",
                      transition: "width 0.3s ease"
                    }} 
                  />
                </div>
                <div style={{ width: "50px", fontSize: "13px", fontWeight: 600, color: scenarioInfo.color }}>
                  +{proj.value.toFixed(1)}°C
                </div>
              </div>
            );
          })}
        </div>
        
        <p style={{ fontSize: "10px", color: "#666", marginTop: "8px" }}>
          Anomalie par rapport à 1995-2014 (base: {climateSummary.historicalBaseline.tas}°C)
        </p>
      </div>
      
      {/* Additional indicators for 2100 */}
      {selectedPeriod === '2080-2099' && (
        <div style={{ 
          background: "#fff3cd", 
          borderRadius: "8px", 
          padding: "12px",
          borderLeft: "3px solid #ffc107"
        }}>
          <h4 style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
            ⚠️ Impacts à l'horizon 2100 (SSP5-8.5)
          </h4>
          <ul style={{ fontSize: "12px", margin: 0, paddingLeft: "20px" }}>
            <li><strong>+35 nuits tropicales</strong> (Tmin &gt; 20°C) par an</li>
            <li><strong>+25 jours de canicule</strong> (Tmax &gt; 35°C) par an</li>
            <li>Élévation du niveau de la mer: <strong>+0.5 à 1m</strong></li>
          </ul>
        </div>
      )}
      
      {/* Scenario legend */}
      <details style={{ marginTop: "12px" }}>
        <summary style={{ fontSize: "11px", cursor: "pointer", color: "#666" }}>
          À propos des scénarios SSP
        </summary>
        <div style={{ fontSize: "11px", padding: "8px", background: "#f6f6f6", borderRadius: "4px", marginTop: "4px" }}>
          {(Object.entries(SSP_SCENARIOS) as [SSPScenario, { name: string; description: string; color: string }][]).map(([key, info]) => (
            <div key={key} style={{ marginBottom: "4px" }}>
              <span style={{ color: info.color, fontWeight: 600 }}>{info.name}</span>: {info.description}
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
