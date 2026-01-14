"use client";

import dynamic from "next/dynamic";
import { MapSidebar } from "@/components/map/MapSidebar";
import { Legend } from "@/components/map/Legend";

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

export default function DecouvertePage() {
  return (
    <>
      {/* Breadcrumb */}
      <nav
        role="navigation"
        className="fr-breadcrumb"
        aria-label="vous êtes ici :"
        style={{ padding: "0.5rem 1rem", background: "#f6f6f6" }}
      >
        <button
          className="fr-breadcrumb__button"
          aria-expanded="false"
          aria-controls="breadcrumb"
        >
          Voir le fil d&apos;Ariane
        </button>
        <div className="fr-collapse" id="breadcrumb">
          <ol className="fr-breadcrumb__list">
            <li>
              <a className="fr-breadcrumb__link" href="/">
                Accueil
              </a>
            </li>
            <li>
              <a className="fr-breadcrumb__link" aria-current="page">
                Visualiser
              </a>
            </li>
          </ol>
        </div>
      </nav>

      {/* Map container - uses calc to fill remaining viewport */}
      <div 
        style={{ 
          position: "relative", 
          height: "calc(100vh - 180px)",
          minHeight: "500px",
        }}
      >
        {/* Map fills the container */}
        <ClimateMap />
        
        {/* Sidebar overlays the map */}
        <MapSidebar />
        
        {/* Legend overlays the map */}
        <Legend />
      </div>
    </>
  );
}
