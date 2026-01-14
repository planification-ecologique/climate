"use client";

import { useClimateStore } from "@/stores/useClimateStore";
import { LayerControl } from "@/components/data/LayerControl";
import { ClimateProjections } from "@/components/data/ClimateProjections";

export function MapSidebar() {
  const { sidebarOpen, setSidebarOpen } = useClimateStore();

  if (!sidebarOpen) {
    return (
      <button
        onClick={() => setSidebarOpen(true)}
        title="Ouvrir le panneau de configuration"
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
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
        <span className="fr-icon-settings-5-line" aria-hidden="true" />
      </button>
    );
  }

  return (
    <aside 
      aria-label="Configuration de la carte"
      style={{
        position: "absolute",
        top: "16px",
        left: "16px",
        width: "380px",
        maxHeight: "calc(100% - 32px)",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        overflow: "hidden",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        padding: "16px",
        borderBottom: "1px solid #e5e5e5",
        background: "linear-gradient(135deg, #000091 0%, #1212ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "white", margin: 0 }}>
            Impact Climat
          </h2>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", marginTop: "4px" }}>
            Projections climatiques France
          </p>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          title="Réduire le panneau"
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "4px",
            color: "white",
          }}
        >
          <span className="fr-icon-arrow-left-s-line" aria-hidden="true" />
        </button>
      </div>
      
      <div style={{ padding: "16px", overflowY: "auto", flex: 1 }}>
        {/* Climate projections from World Bank CCKP */}
        <ClimateProjections />
        
        {/* Map layer controls */}
        <LayerControl />
      </div>
    </aside>
  );
}
