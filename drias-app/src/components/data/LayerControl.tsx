"use client";

import { useClimateStore } from "@/stores/useClimateStore";
import { getAllLayers } from "@/lib/climate/layers";
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { WMSLayerConfig } from "@/types/climate";

export function LayerControl() {
  const { activeLayers, toggleLayer, layerOpacity, setLayerOpacity } = useClimateStore();

  const allLayers = getAllLayers();
  const climateLayers = allLayers.filter(l => l.category === 'climate');
  const riskLayers = allLayers.filter(l => l.category === 'risk');
  const referenceLayers = allLayers.filter(l => l.category === 'reference');

  // Group climate layers by type
  const temperatureLayers = climateLayers.filter(l => l.id.includes('cmip6-tas'));
  const precipLayers = climateLayers.filter(l => l.id.includes('cmip6-pr'));
  const seaLevelLayers = climateLayers.filter(l => l.id.includes('slr-'));

  const renderLayerItem = (layer: WMSLayerConfig) => (
    <div key={layer.id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0" }}>
      <Checkbox
        options={[
          {
            label: layer.name,
            nativeInputProps: {
              checked: activeLayers.includes(layer.id),
              onChange: () => toggleLayer(layer.id),
            },
          },
        ]}
        small
      />
      {activeLayers.includes(layer.id) && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={layerOpacity[layer.id] ?? 0.7}
          onChange={(e) => setLayerOpacity(layer.id, parseFloat(e.target.value))}
          style={{ width: "50px" }}
          title="Opacité"
        />
      )}
    </div>
  );

  return (
    <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #e5e5e5" }}>
      <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>Couches de données</h3>
      
      {/* CMIP6 Temperature Projections */}
      <Accordion
        label={`🌡️ Température (${temperatureLayers.length})`}
        defaultExpanded={true}
      >
        <p style={{ fontSize: "10px", color: "#666", marginBottom: "8px", padding: "6px", background: "#fee2e2", borderRadius: "4px" }}>
          Anomalies de température par rapport à la période 1995-2014 (CMIP6)
        </p>
        {temperatureLayers.length > 0 ? (
          temperatureLayers.map(renderLayerItem)
        ) : (
          <p style={{ fontSize: "12px", color: "#666" }}>Aucune couche disponible</p>
        )}
      </Accordion>

      {/* CMIP6 Precipitation Projections */}
      <Accordion
        label={`💧 Précipitations (${precipLayers.length})`}
        defaultExpanded={false}
      >
        <p style={{ fontSize: "10px", color: "#666", marginBottom: "8px", padding: "6px", background: "#dbeafe", borderRadius: "4px" }}>
          Anomalies de précipitations par rapport à la période 1995-2014 (CMIP6)
        </p>
        {precipLayers.length > 0 ? (
          precipLayers.map(renderLayerItem)
        ) : (
          <p style={{ fontSize: "12px", color: "#666" }}>Aucune couche disponible</p>
        )}
      </Accordion>

      {/* Sea Level Rise Projections */}
      <Accordion
        label={`🌊 Élévation marine (${seaLevelLayers.length})`}
        defaultExpanded={false}
      >
        <p style={{ fontSize: "10px", color: "#666", marginBottom: "8px", padding: "6px", background: "#e0f2fe", borderRadius: "4px" }}>
          Projections de submersion côtière (BRGM)
        </p>
        {seaLevelLayers.length > 0 ? (
          seaLevelLayers.map(renderLayerItem)
        ) : (
          <p style={{ fontSize: "12px", color: "#666" }}>Aucune couche disponible</p>
        )}
      </Accordion>

      {/* Current flood risk */}
      <Accordion
        label={`📍 Risques actuels (${riskLayers.length})`}
        defaultExpanded={false}
      >
        <p style={{ fontSize: "10px", color: "#666", marginBottom: "8px", padding: "6px", background: "#fef3c7", borderRadius: "4px" }}>
          Cartographie des zones inondables (Géorisques)
        </p>
        {riskLayers.length > 0 ? (
          riskLayers.map(renderLayerItem)
        ) : (
          <p style={{ fontSize: "12px", color: "#666" }}>Aucune couche disponible</p>
        )}
      </Accordion>

      {/* Reference layers */}
      {referenceLayers.length > 0 && (
        <Accordion
          label={`🗺️ Référence (${referenceLayers.length})`}
          defaultExpanded={false}
        >
          {referenceLayers.map(renderLayerItem)}
        </Accordion>
      )}

      <div style={{ 
        fontSize: "10px", 
        color: "#666", 
        marginTop: "12px", 
        padding: "8px", 
        background: "#f0fdf4", 
        borderRadius: "4px",
        borderLeft: "3px solid #22c55e"
      }}>
        <strong>Source:</strong> World Bank Climate Change Knowledge Portal (CMIP6), BRGM, Géorisques
      </div>
    </div>
  );
}
