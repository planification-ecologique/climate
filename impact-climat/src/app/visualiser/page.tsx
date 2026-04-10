"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { MapSidebar } from "@/components/map/MapSidebar";
import { Legend } from "@/components/map/Legend";
import { useLayerUrlSync } from "@/hooks/useLayerUrlSync";

// Dynamic import for map to avoid SSR issues with MapLibre
const ClimateMap = dynamic(
  () => import("@/components/map/ClimateMap").then((mod) => mod.ClimateMap),
  {
    ssr: false,
    loading: () => (
      <div 
        style={{ 
          position: "absolute",
          inset: 0,
          background: "#e8f4f8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div 
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #e5e5e5",
              borderTopColor: "#000091",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px"
            }}
          />
          <p>Chargement de la carte...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    ),
  }
);

function VisualiserContent() {
  useLayerUrlSync();

  return (
    <div
      style={{
        position: "relative",
        height: "calc(100vh - 120px)", // Full viewport minus header
        minHeight: "85vh",
      }}
    >
      {/* Map fills the container */}
      <ClimateMap />

      {/* Sidebar overlays the map */}
      <MapSidebar />

      {/* Legend overlays the map */}
      <Legend />
    </div>
  );
}

export default function VisualiserPage() {
  return (
    <Suspense>
      <VisualiserContent />
    </Suspense>
  );
}
