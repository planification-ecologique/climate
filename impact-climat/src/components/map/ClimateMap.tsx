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
import { getAllLayers, getAllWMTSLayers } from "@/lib/climate/layers";
import { WMSLayerConfig, WMTSLayerConfig } from "@/types/climate";
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
  const allWMTSLayers = getAllWMTSLayers();

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
  const needsCorsProxy = (layer: WMSLayerConfig): boolean => {
    // Force proxy if explicitly set
    if (layer.needsProxy) return true;
    // Auto-detect servers that need proxy
    return layer.url.includes('climatedata.worldbank.org');
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
    const params: string[] = [];
    
    // Add API key first if specified
    if (layer.apiKey) {
      params.push(`apikey=${layer.apiKey}`);
    }
    
    params.push(
      "service=WMS",
      "request=GetMap",
      `version=${layer.version}`,
      `layers=${encodeURIComponent(layer.layers)}`,
      `format=${encodeURIComponent(layer.format || "image/png")}`,
      `transparent=${layer.transparent ?? true}`,
      "width=256",
      "height=256"
    );
    
    // WMS 1.3.0 uses CRS, older versions use SRS
    if (isWms13) {
      params.push(`crs=${crs}`);
    } else {
      params.push(`srs=${crs}`);
    }
    
    // Add styles parameter (required by some WMS servers like IGN, can be empty)
    params.push(`styles=${layer.styles ? encodeURIComponent(layer.styles) : ''}`);
    
    // Add color scale range for climate data visualization
    if (layer.colorScaleRange) {
      params.push(`colorscalerange=${layer.colorScaleRange[0]},${layer.colorScaleRange[1]}`);
      params.push("numcolorbands=256");
    }
    
    // Add time parameter for temporal data
    if (layer.time) {
      params.push(`time=${encodeURIComponent(layer.time)}`);
    }
    
    // Use CORS proxy for servers that don't support CORS
    if (needsCorsProxy(layer)) {
      // Check if this layer needs bbox reprojection (from 3857 to 4326)
      const needsReproject = useEpsg4326;
      
      // Build raw params for proxy
      const rawParams: string[] = [];
      if (layer.apiKey) rawParams.push(`apikey=${layer.apiKey}`);
      rawParams.push(
        "service=WMS",
        "request=GetMap",
        `version=${layer.version}`,
        `layers=${layer.layers}`,
        `format=${layer.format || "image/png"}`,
        `transparent=${layer.transparent ?? true}`,
        "width=256",
        "height=256"
      );
      
      // Add CRS/SRS parameter
      if (isWms13) {
        rawParams.push(`crs=${crs}`);
      } else {
        rawParams.push(`srs=${crs}`);
      }
      
      // Add styles parameter (required by some WMS servers, can be empty)
      rawParams.push(`styles=${layer.styles || ''}`);
      if (layer.colorScaleRange) {
        rawParams.push(`colorscalerange=${layer.colorScaleRange[0]},${layer.colorScaleRange[1]}`);
        rawParams.push("numcolorbands=256");
      }
      
      const baseUrlWithParams = `${layer.url}?${rawParams.join("&")}`;
      const encodedBaseUrl = encodeURIComponent(baseUrlWithParams);
      // Always use EPSG:3857 bbox from MapLibre, proxy will reproject to 4326 if needed
      const proxyUrl = `/api/wms?baseUrl=${encodedBaseUrl}&bbox={bbox-epsg-3857}${needsReproject ? '&reproject=true' : ''}`;
      console.log(`WMS URL (proxied) for ${layer.id}:`, proxyUrl);
      return proxyUrl;
    }
    
    // For non-proxied URLs, add bbox directly
    params.push(`bbox=${bboxPlaceholder}`);
    const directUrl = `${layer.url}?${params.join("&")}`;
    console.log(`WMS URL for ${layer.id}:`, directUrl);
    return directUrl;
  };

  // Generate WMTS tile URL for a layer
  // WMTS uses {z}/{x}/{y} tile coordinates (standard XYZ tile format)
  const getWMTSTileUrl = (layer: WMTSLayerConfig): string => {
    // WMTS KVP (Key-Value Pairs) format
    // MapLibre uses {z}, {x}, {y} placeholders for tile coordinates
    const url = `${layer.url}?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=${encodeURIComponent(layer.layer)}&STYLE=${encodeURIComponent(layer.style)}&TILEMATRIXSET=${encodeURIComponent(layer.tileMatrixSet)}&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=${encodeURIComponent(layer.format)}`;
    console.log(`WMTS URL for ${layer.id}:`, url);
    return url;
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

        {/* WMS Layers - always render all sources to maintain z-order, control visibility via opacity */}
        {mapLoaded && allLayers.map((layer) => {
          const isActive = activeLayers.includes(layer.id);
          const opacity = isActive ? (layerOpacity[layer.id] ?? layer.opacity ?? 0.7) : 0;

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

        {/* WMTS Layers - pre-rendered tiles (OCS GE, etc.) */}
        {mapLoaded && allWMTSLayers.map((layer) => {
          const isActive = activeLayers.includes(layer.id);
          const opacity = isActive ? (layerOpacity[layer.id] ?? layer.opacity ?? 0.7) : 0;

          return (
            <Source
              key={layer.id}
              id={`wmts-${layer.id}`}
              type="raster"
              tiles={[getWMTSTileUrl(layer)]}
              tileSize={256}
              minzoom={layer.minZoom ?? 0}
              maxzoom={layer.maxZoom ?? 22}
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

        {/* Administrative boundaries - always rendered on top, visibility controlled via store */}
        
        {/* Departments boundaries (thin dark lines) */}
        {mapLoaded && departmentsGeoJson && (
          <Source id="admin-departments" type="geojson" data={departmentsGeoJson}>
            <Layer
              id="admin-departments-line"
              type="line"
              paint={{
                "line-color": "#000000",
                "line-width": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  4, 0.3,
                  8, 0.8,
                  12, 1.2
                ],
                "line-opacity": activeLayers.includes('admin-departments') ? 0.5 : 0,
              }}
            />
          </Source>
        )}

        {/* Regions boundaries (medium dark lines) */}
        {mapLoaded && regionsGeoJson && (
          <Source id="admin-regions" type="geojson" data={regionsGeoJson}>
            <Layer
              id="admin-regions-line"
              type="line"
              paint={{
                "line-color": "#000000",
                "line-width": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  4, 1,
                  8, 1.5,
                  12, 2
                ],
                "line-opacity": activeLayers.includes('admin-regions') ? 0.7 : 0,
              }}
            />
          </Source>
        )}

        {/* France country border (thick dark line - always on top) */}
        {mapLoaded && countryGeoJson && (
          <Source id="admin-country" type="geojson" data={countryGeoJson}>
            <Layer
              id="admin-country-line"
              type="line"
              paint={{
                "line-color": "#000000",
                "line-width": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  4, 2,
                  8, 3,
                  12, 4
                ],
                "line-opacity": activeLayers.includes('admin-country') ? 1 : 0,
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
