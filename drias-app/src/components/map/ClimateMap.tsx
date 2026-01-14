"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import Map, {
  NavigationControl,
  ScaleControl,
  Source,
  Layer,
  MapRef,
  MapLayerMouseEvent,
  Popup,
} from "react-map-gl/maplibre";
import { useClimateStore } from "@/stores/useClimateStore";
import { getAllLayers } from "@/lib/climate/layers";
import { WMSLayerConfig } from "@/types/climate";
import type { FeatureCollection } from "geojson";

// CartoDB Light (no labels) basemap - clean background for data visualization
const MAP_STYLE = {
  version: 8 as const,
  name: "Impact Climat Base Map",
  sources: {
    "carto-light": {
      type: "raster" as const,
      tiles: [
        "https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
        "https://d.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
  },
  layers: [
    {
      id: "carto-light",
      type: "raster" as const,
      source: "carto-light",
      minzoom: 0,
      maxzoom: 20,
    },
  ],
};

// France GeoJSON boundaries from gregoiredavid/france-geojson
const FRANCE_ADMIN_GEOJSON = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson";
const FRANCE_REGIONS_GEOJSON = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson";
const FRANCE_COUNTRY_GEOJSON = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/metropole.geojson";

interface ClimateMapProps {
  className?: string;
}

export function ClimateMap({ className }: ClimateMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<{
    longitude: number;
    latitude: number;
    info?: string;
  } | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // GeoJSON boundaries state
  const [departmentsGeoJson, setDepartmentsGeoJson] = useState<FeatureCollection | null>(null);
  const [regionsGeoJson, setRegionsGeoJson] = useState<FeatureCollection | null>(null);
  const [countryGeoJson, setCountryGeoJson] = useState<FeatureCollection | null>(null);

  const {
    viewport,
    setViewport,
    activeLayers,
    layerOpacity,
    setSelectedLocation,
  } = useClimateStore();

  // Load France boundaries GeoJSON
  useEffect(() => {
    // Load departments
    fetch(FRANCE_ADMIN_GEOJSON)
      .then(res => res.json())
      .then(data => setDepartmentsGeoJson(data))
      .catch(err => console.error("Failed to load departments GeoJSON:", err));

    // Load regions
    fetch(FRANCE_REGIONS_GEOJSON)
      .then(res => res.json())
      .then(data => setRegionsGeoJson(data))
      .catch(err => console.error("Failed to load regions GeoJSON:", err));

    // Load country outline
    fetch(FRANCE_COUNTRY_GEOJSON)
      .then(res => res.json())
      .then(data => setCountryGeoJson(data))
      .catch(err => console.error("Failed to load country GeoJSON:", err));
  }, []);

  const allLayers = getAllLayers();

  const handleMapClick = useCallback(
    (event: MapLayerMouseEvent) => {
      const { lngLat } = event;
      
      setSelectedLocation({
        latitude: lngLat.lat,
        longitude: lngLat.lng,
        name: `${lngLat.lat.toFixed(4)}, ${lngLat.lng.toFixed(4)}`,
      });

      setPopupInfo({
        longitude: lngLat.lng,
        latitude: lngLat.lat,
        info: `Lat: ${lngLat.lat.toFixed(4)}, Lon: ${lngLat.lng.toFixed(4)}`,
      });
    },
    [setSelectedLocation]
  );

  const handleMoveEnd = useCallback(() => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const zoom = mapRef.current.getZoom();
      setViewport({
        latitude: center.lat,
        longitude: center.lng,
        zoom,
      });
    }
  }, [setViewport]);

  const handleLoad = useCallback(() => {
    setMapLoaded(true);
    console.log("Map loaded successfully");
  }, []);

  // Check if a URL needs to go through the CORS proxy
  const needsCorsProxy = (url: string): boolean => {
    return url.includes('climatedata.worldbank.org');
  };

  // Generate WMS tile URL for a layer
  // Note: bbox placeholder must NOT be URL-encoded for MapLibre to substitute it
  const getWMSTileUrl = (layer: WMSLayerConfig): string => {
    const isWms13 = layer.version === "1.3.0";
    // Some WMS servers (like World Bank THREDDS) use EPSG:4326
    const useEpsg4326 = layer.crs === "EPSG:4326";
    const crs = useEpsg4326 ? "EPSG:4326" : "EPSG:3857";
    const bboxPlaceholder = useEpsg4326 ? "{bbox-epsg-4326}" : "{bbox-epsg-3857}";
    
    // Build params manually to avoid URL encoding the bbox placeholder
    const params = [
      "service=WMS",
      "request=GetMap",
      `version=${layer.version}`,
      `layers=${encodeURIComponent(layer.layers)}`,
      `format=${encodeURIComponent(layer.format || "image/png")}`,
      `transparent=${layer.transparent ?? true}`,
      "width=256",
      "height=256",
    ];
    
    // WMS 1.3.0 uses CRS, older versions use SRS
    if (isWms13) {
      params.push(`crs=${crs}`);
    } else {
      params.push(`srs=${crs}`);
    }
    
    // Add styles parameter if specified (for THREDDS servers)
    if (layer.styles) {
      params.push(`styles=${encodeURIComponent(layer.styles)}`);
    }
    
    // Add color scale range for climate data visualization
    if (layer.colorScaleRange) {
      params.push(`colorscalerange=${layer.colorScaleRange[0]},${layer.colorScaleRange[1]}`);
      params.push("numcolorbands=256");
    }
    
    // Add time parameter for temporal data
    if (layer.time) {
      params.push(`time=${encodeURIComponent(layer.time)}`);
    }
    
    // Use CORS proxy for World Bank and other servers that don't support CORS
    if (needsCorsProxy(layer.url)) {
      // For World Bank, we need to:
      // 1. Use EPSG:3857 bbox (which MapLibre provides)
      // 2. Let the proxy transform to EPSG:4326 (which World Bank requires)
      const rawParams = [
        "service=WMS",
        "request=GetMap",
        `version=${layer.version}`,
        `layers=${layer.layers}`,
        `format=${layer.format || "image/png"}`,
        `transparent=${layer.transparent ?? true}`,
        "width=256",
        "height=256",
        "crs=EPSG:4326", // World Bank requires 4326, proxy will transform bbox
      ];
      if (layer.styles) rawParams.push(`styles=${layer.styles}`);
      if (layer.colorScaleRange) {
        rawParams.push(`colorscalerange=${layer.colorScaleRange[0]},${layer.colorScaleRange[1]}`);
        rawParams.push("numcolorbands=256");
      }
      
      const baseUrlWithParams = `${layer.url}?${rawParams.join("&")}`;
      const encodedBaseUrl = encodeURIComponent(baseUrlWithParams);
      // Use EPSG:3857 bbox from MapLibre, proxy will reproject to 4326
      const proxyUrl = `/api/wms?baseUrl=${encodedBaseUrl}&bbox={bbox-epsg-3857}&reproject=true`;
      console.log(`WMS URL (proxied) for ${layer.id}:`, proxyUrl);
      return proxyUrl;
    }
    
    // For non-proxied URLs, add bbox directly
    params.push(`bbox=${bboxPlaceholder}`);
    const directUrl = `${layer.url}?${params.join("&")}`;
    console.log(`WMS URL for ${layer.id}:`, directUrl);
    return directUrl;
  };

  return (
    <div 
      className={className} 
      style={{ 
        width: "100%", 
        height: "100%",
      }}
    >
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: viewport.longitude,
          latitude: viewport.latitude,
          zoom: viewport.zoom,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_STYLE}
        onClick={handleMapClick}
        onMoveEnd={handleMoveEnd}
        onLoad={handleLoad}
        minZoom={3}
        maxZoom={18}
        scrollZoom={true}
        boxZoom={true}
        dragRotate={true}
        dragPan={true}
        keyboard={true}
        doubleClickZoom={true}
        touchZoomRotate={true}
      >
        {/* Navigation controls */}
        <NavigationControl position="top-right" />
        <ScaleControl position="bottom-left" />

        {/* WMS Layers - only render when map is loaded */}
        {mapLoaded && allLayers.map((layer) => {
          const isActive = activeLayers.includes(layer.id);
          if (!isActive) return null;

          const opacity = layerOpacity[layer.id] ?? layer.opacity ?? 0.7;

          console.log(`Rendering layer: ${layer.id}, opacity: ${opacity}`);

          return (
            <Source
              key={layer.id}
              id={`wms-${layer.id}`}
              type="raster"
              tiles={[getWMSTileUrl(layer)]}
              tileSize={256}
            >
              <Layer
                id={`layer-${layer.id}`}
                type="raster"
                paint={{
                  "raster-opacity": opacity,
                }}
              />
            </Source>
          );
        })}

        {/* Administrative boundaries - rendered on top of climate layers */}
        
        {/* Departments boundaries (thin lines) */}
        {departmentsGeoJson && (
          <Source id="departments" type="geojson" data={departmentsGeoJson}>
            <Layer
              id="departments-line"
              type="line"
              paint={{
                "line-color": "#333333",
                "line-width": 0.5,
                "line-opacity": 0.6,
              }}
            />
          </Source>
        )}

        {/* Regions boundaries (medium lines) */}
        {regionsGeoJson && (
          <Source id="regions" type="geojson" data={regionsGeoJson}>
            <Layer
              id="regions-line"
              type="line"
              paint={{
                "line-color": "#1a1a1a",
                "line-width": 1.5,
                "line-opacity": 0.8,
              }}
            />
          </Source>
        )}

        {/* France country border (thick line) */}
        {countryGeoJson && (
          <Source id="country" type="geojson" data={countryGeoJson}>
            <Layer
              id="country-line"
              type="line"
              paint={{
                "line-color": "#000000",
                "line-width": 2.5,
                "line-opacity": 1,
              }}
            />
          </Source>
        )}

        {/* Click popup */}
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
          >
            <div style={{ padding: "8px" }}>
              <p style={{ fontWeight: 600, marginBottom: "4px" }}>Position sélectionnée</p>
              <p style={{ fontSize: "12px", color: "#666" }}>{popupInfo.info}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
