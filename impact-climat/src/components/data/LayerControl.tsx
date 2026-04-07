"use client";

import { useClimateStore, PERCENTILE_OPTIONS } from "@/stores/useClimateStore";
import { getAllLayers, getAllWMTSLayers } from "@/lib/climate/layers";
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { SegmentedControl } from "@codegouvfr/react-dsfr/SegmentedControl";
import { WMSLayerConfig, WMTSLayerConfig } from "@/types/climate";

export function LayerControl() {
  const { activeLayers, toggleLayer, layerOpacity, setLayerOpacity, percentile, setPercentile } = useClimateStore();

  const allLayers = getAllLayers();
  const allWMTSLayers = getAllWMTSLayers();
  
  const climateLayers = allLayers.filter(l => l.category === 'climate');
  const riskLayers = allLayers.filter(l => l.category === 'risk');
  const referenceLayers = allLayers.filter(l => l.category === 'reference');
  const environmentLayers = allLayers.filter(l => l.category === 'environment');
  const exposureLayers = allLayers.filter(l => l.category === 'exposure');
  
  // WMTS layers by category
  const wmtsExposureLayers = allWMTSLayers.filter(l => l.category === 'exposure');

  // Group climate layers by type
  const temperatureLayers = climateLayers.filter(l => l.id.includes('cmip6-tas'));
  const precipLayers = climateLayers.filter(l => l.id.includes('cmip6-pr'));
  const seaLevelLayers = climateLayers.filter(l => l.id.includes('slr-'));

  // Group environment layers
  const znieffLayers = environmentLayers.filter(l => l.id.includes('znieff'));
  const forestLayers = environmentLayers.filter(l => l.id.includes('bdforet'));

  // Group risk layers
  const floodLayers = riskLayers.filter(l => l.id.includes('flood'));
  const geologicalLayers = riskLayers.filter(l => l.id.includes('rga') || l.id.includes('cavite'));

  const renderLayerItem = (layer: WMSLayerConfig | WMTSLayerConfig) => (
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
    <div style={{}}>
      <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>Couches de données</h3>
      {/* CMIP6 Temperature Projections */}
      <Accordion
        label={`🌡️ Température (${temperatureLayers.length})`}
        defaultExpanded={true}
      >
        <p style={{ fontSize: "10px", color: "#666", marginBottom: "8px", padding: "6px", background: "#fee2e2", borderRadius: "4px" }}>
          Anomalies de température par rapport à la période 1995-2014 (CMIP6)
        </p>
              {/* Percentile selector for World Bank CMIP6 data */}
      <div style={{ marginBottom: "0px", padding: "12px", background: "#f0f9ff", borderRadius: "8px", border: "1px solid #bfdbfe" }}>
        <label style={{ fontSize: "12px", fontWeight: 600, color: "#1e40af", marginBottom: "8px", display: "block" }}>
          📊 Percentile (Banque Mondiale CMIP6)
        </label>
        <SegmentedControl
          small
          hideLegend
          segments={[
            {
              label: "P10",
              nativeInputProps: {
                checked: percentile === "p10",
                onChange: () => setPercentile("p10"),
              },
            },
            {
              label: "P50",
              nativeInputProps: {
                checked: percentile === "p50",
                onChange: () => setPercentile("p50"),
              },
            },
            {
              label: "P90",
              nativeInputProps: {
                checked: percentile === "p90",
                onChange: () => setPercentile("p90"),
              },
            },
          ]}
        />
        <p style={{ fontSize: "10px", color: "#6b7280", marginTop: "6px", marginBottom: "0px" }}>
          {PERCENTILE_OPTIONS[percentile].description}
        </p>
      </div>
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

      {/* Flood risk */}
      <Accordion
        label={`🌊 Inondations (${floodLayers.length})`}
        defaultExpanded={false}
      >
        <p style={{ fontSize: "10px", color: "#666", marginBottom: "8px", padding: "6px", background: "#fef3c7", borderRadius: "4px" }}>
          Cartographie des zones inondables (Géorisques)
        </p>
        {floodLayers.length > 0 ? (
          floodLayers.map(renderLayerItem)
        ) : (
          <p style={{ fontSize: "12px", color: "#666" }}>Aucune couche disponible</p>
        )}
      </Accordion>

      {/* Geological risks */}
      <Accordion
        label={`⛰️ Risques géologiques (${geologicalLayers.length})`}
        defaultExpanded={false}
      >
        <p style={{ fontSize: "10px", color: "#666", marginBottom: "8px", padding: "6px", background: "#fef3c7", borderRadius: "4px" }}>
          Retrait-gonflement des argiles et cavités (Géorisques, BRGM)
        </p>
        <p style={{ fontSize: "9px", color: "#92400e", marginBottom: "8px", padding: "4px 6px", background: "#fef9c3", borderRadius: "4px" }}>
          ℹ️ RGA : données disponibles uniquement dans les zones étudiées
        </p>
        {geologicalLayers.length > 0 ? (
          geologicalLayers.map(renderLayerItem)
        ) : (
          <p style={{ fontSize: "12px", color: "#666" }}>Aucune couche disponible</p>
        )}
      </Accordion>

      {/* Protected natural areas - ZNIEFF */}
      <Accordion
        label={`🌿 Espaces naturels protégés (${znieffLayers.length})`}
        defaultExpanded={false}
      >
        <p style={{ fontSize: "10px", color: "#666", marginBottom: "8px", padding: "6px", background: "#dcfce7", borderRadius: "4px" }}>
          Zones naturelles d&apos;intérêt écologique (INPN/MNHN)
        </p>
        {znieffLayers.length > 0 ? (
          znieffLayers.map(renderLayerItem)
        ) : (
          <p style={{ fontSize: "12px", color: "#666" }}>Aucune couche disponible</p>
        )}
      </Accordion>

      {/* Forest inventory */}
      <Accordion
        label={`🌲 Forêts (${forestLayers.length})`}
        defaultExpanded={false}
      >
        <p style={{ fontSize: "10px", color: "#666", marginBottom: "8px", padding: "6px", background: "#dcfce7", borderRadius: "4px" }}>
          Inventaire forestier national (IGN BD Forêt)
        </p>
        <p style={{ fontSize: "9px", color: "#b45309", marginBottom: "8px", padding: "4px 6px", background: "#fef3c7", borderRadius: "4px" }}>
          🐢 Chargement lent - le serveur IGN limite les requêtes
        </p>
        {forestLayers.length > 0 ? (
          forestLayers.map(renderLayerItem)
        ) : (
          <p style={{ fontSize: "12px", color: "#666" }}>Aucune couche disponible</p>
        )}
      </Accordion>

      {/* Land use and exposure */}
      <Accordion
        label={`🏘️ Occupation du sol (${exposureLayers.length + wmtsExposureLayers.length})`}
        defaultExpanded={false}
      >
        {/* OCS GE - fast WMTS tiles */}
        {wmtsExposureLayers.length > 0 && (
          <>
            <p style={{ fontSize: "10px", color: "#666", marginBottom: "8px", padding: "6px", background: "#e0e7ff", borderRadius: "4px" }}>
              🗺️ OCS GE - Occupation du sol grande échelle (IGN)
            </p>
            <p style={{ fontSize: "9px", color: "#059669", marginBottom: "8px", padding: "4px 6px", background: "#d1fae5", borderRadius: "4px" }}>
              ✅ Zoom 6-16 · Données disponibles sur certains départements
            </p>
            {wmtsExposureLayers.map(renderLayerItem)}
          </>
        )}
        
        {/* RPG Agriculture - rate-limited WMS */}
        {exposureLayers.length > 0 && (
          <>
            <p style={{ fontSize: "10px", color: "#666", marginTop: "12px", marginBottom: "8px", padding: "6px", background: "#fef3c7", borderRadius: "4px" }}>
              🌾 Parcelles agricoles (IGN RPG)
            </p>
            <p style={{ fontSize: "9px", color: "#b45309", marginBottom: "8px", padding: "4px 6px", background: "#fef9c3", borderRadius: "4px" }}>
              🐢 Chargement lent - le serveur IGN limite les requêtes
            </p>
            {exposureLayers.map(renderLayerItem)}
          </>
        )}
        
        {exposureLayers.length === 0 && wmtsExposureLayers.length === 0 && (
          <p style={{ fontSize: "12px", color: "#666" }}>Aucune couche disponible</p>
        )}
      </Accordion>

      {/* Reference layers - Hydrography */}
      {referenceLayers.length > 0 && (
        <Accordion
          label={`💧 Hydrographie (${referenceLayers.length})`}
          defaultExpanded={false}
        >
          <p style={{ fontSize: "10px", color: "#666", marginBottom: "8px", padding: "6px", background: "#dbeafe", borderRadius: "4px" }}>
            Réseau hydrographique (Sandre)
          </p>
          {referenceLayers.map(renderLayerItem)}
        </Accordion>
      )}

      {/* Administrative boundaries */}
      <Accordion
        label="🏛️ Limites administratives"
        defaultExpanded={true}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0" }}>
            <Checkbox
              options={[
                {
                  label: "Départements",
                  nativeInputProps: {
                    checked: activeLayers.includes('admin-departments'),
                    onChange: () => toggleLayer('admin-departments'),
                  },
                },
              ]}
              small
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0" }}>
            <Checkbox
              options={[
                {
                  label: "Régions",
                  nativeInputProps: {
                    checked: activeLayers.includes('admin-regions'),
                    onChange: () => toggleLayer('admin-regions'),
                  },
                },
              ]}
              small
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 0" }}>
            <Checkbox
              options={[
                {
                  label: "Frontière nationale",
                  nativeInputProps: {
                    checked: activeLayers.includes('admin-country'),
                    onChange: () => toggleLayer('admin-country'),
                  },
                },
              ]}
              small
            />
          </div>
        </div>
      </Accordion>

      <div style={{ 
        fontSize: "10px", 
        color: "#666", 
        marginTop: "12px", 
        padding: "8px", 
        background: "#f0fdf4", 
        borderRadius: "4px",
        borderLeft: "3px solid #22c55e"
      }}>
        <strong>Sources:</strong> World Bank CCKP (CMIP6), BRGM, Géorisques, IGN, INPN/MNHN, Sandre
      </div>
    </div>
  );
}
