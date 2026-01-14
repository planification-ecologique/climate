"use client";

import { useClimateStore } from "@/stores/useClimateStore";
import { getAllLayers } from "@/lib/climate/layers";

// Color scale for temperature anomaly (matches CCKP style)
const TEMP_ANOMALY_COLORS = [
  "#313695", // -2°C cold blue
  "#4575b4",
  "#74add1",
  "#abd9e9",
  "#e0f3f8",
  "#ffffbf", // 0°C neutral
  "#fee090",
  "#fdae61",
  "#f46d43",
  "#d73027",
  "#a50026", // +10°C hot red
];

// Color scale for precipitation anomaly
const PRECIP_ANOMALY_COLORS = [
  "#8c510a", // -50% dry brown
  "#bf812d",
  "#dfc27d",
  "#f6e8c3",
  "#f5f5f5", // 0% neutral
  "#c7eae5",
  "#80cdc1",
  "#35978f",
  "#01665e", // +50% wet teal
];

export function Legend() {
  const { activeLayers, legendVisible, setLegendVisible } = useClimateStore();
  const allLayers = getAllLayers();

  // Find active climate layers with color scales
  const activeTempLayer = allLayers.find(
    l => activeLayers.includes(l.id) && l.id.includes("cmip6-tas")
  );
  const activePrecipLayer = allLayers.find(
    l => activeLayers.includes(l.id) && l.id.includes("cmip6-pr")
  );
  const activeSeaLevelLayer = allLayers.find(
    l => activeLayers.includes(l.id) && l.id.includes("slr-")
  );

  const hasActiveClimateLayers = activeTempLayer || activePrecipLayer || activeSeaLevelLayer;

  if (!legendVisible) {
    return (
      <button
        onClick={() => setLegendVisible(true)}
        title="Afficher la légende"
        style={{
          position: "absolute",
          bottom: "32px",
          right: "16px",
          zIndex: 10,
          width: "44px",
          height: "44px",
          background: "white",
          border: "1px solid #e5e5e5",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <span className="fr-icon-eye-line" aria-hidden="true" />
      </button>
    );
  }

  if (!hasActiveClimateLayers) {
    return (
      <div style={{
        position: "absolute",
        bottom: "32px",
        right: "16px",
        background: "white",
        borderRadius: "8px",
        padding: "12px 16px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <span style={{ fontSize: "12px", color: "#666" }}>Activez une couche climatique</span>
          <button
            onClick={() => setLegendVisible(false)}
            title="Masquer"
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px" }}
          >
            <span className="fr-icon-close-line" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: "absolute",
      bottom: "32px",
      right: "16px",
      background: "white",
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      zIndex: 10,
      minWidth: "220px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <h4 style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>Légende</h4>
        <button
          onClick={() => setLegendVisible(false)}
          title="Masquer la légende"
          style={{ background: "transparent", border: "none", cursor: "pointer", padding: "4px" }}
        >
          <span className="fr-icon-close-line" aria-hidden="true" />
        </button>
      </div>

      {/* Temperature anomaly legend */}
      {activeTempLayer && (
        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, marginBottom: "6px", color: "#333" }}>
            🌡️ Anomalie température
          </p>
          <div style={{
            background: `linear-gradient(to right, ${TEMP_ANOMALY_COLORS.join(", ")})`,
            height: "16px",
            borderRadius: "3px",
            marginBottom: "4px",
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#666" }}>
            <span>{activeTempLayer.colorScaleRange?.[0] ?? -2}°C</span>
            <span>0°C</span>
            <span>+{activeTempLayer.colorScaleRange?.[1] ?? 8}°C</span>
          </div>
        </div>
      )}

      {/* Precipitation anomaly legend */}
      {activePrecipLayer && (
        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, marginBottom: "6px", color: "#333" }}>
            💧 Anomalie précipitations
          </p>
          <div style={{
            background: `linear-gradient(to right, ${PRECIP_ANOMALY_COLORS.join(", ")})`,
            height: "16px",
            borderRadius: "3px",
            marginBottom: "4px",
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#666" }}>
            <span>-50%</span>
            <span>0%</span>
            <span>+50%</span>
          </div>
        </div>
      )}

      {/* Sea level rise legend */}
      {activeSeaLevelLayer && (
        <div>
          <p style={{ fontSize: "11px", fontWeight: 500, marginBottom: "6px", color: "#333" }}>
            🌊 Submersion marine
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "20px",
              height: "16px",
              background: "rgba(0, 100, 200, 0.6)",
              borderRadius: "2px",
            }} />
            <span style={{ fontSize: "10px", color: "#666" }}>
              Zone submergée ({activeSeaLevelLayer.name})
            </span>
          </div>
        </div>
      )}

      <div style={{ 
        fontSize: "9px", 
        color: "#999", 
        marginTop: "12px", 
        paddingTop: "8px", 
        borderTop: "1px solid #eee" 
      }}>
        Source: World Bank CCKP (CMIP6), BRGM
      </div>
    </div>
  );
}
