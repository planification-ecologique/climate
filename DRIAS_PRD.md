# Product Requirements Document
## DRIAS Climate Data Portal
### Application de visualisation des projections climatiques

**Version:** 1.0
**Date:** January 2026
**Purpose:** For AI Agent Development with Claude Code

---

## Document Information

| Field | Value |
|-------|-------|
| **Project Name** | DRIAS Climate Portal (Nouvelle Génération) |
| **Tech Stack** | React + Next.js + DSFR + STAC API |
| **Design System** | DSFR (Système de Design de l'État) |
| **Target Users** | Local authorities, researchers, industries, consultants |

---

## 1. Executive Summary

This PRD defines the requirements for building the next-generation DRIAS climate data portal. DRIAS (Donner accès aux scénarios climatiques Régionalisés français pour l'Impact et l'Adaptation de nos Sociétés) provides regionalized climate projections for France, helping stakeholders adapt to climate change.

The new application will be built using React with Next.js, following the French Government Design System (DSFR), and inspired by the modern data cube architecture used by EcoDataCube.eu for geospatial data access via STAC APIs.

---

## 2. Technical Architecture

### 2.1 Frontend Stack

| Technology | Package | Purpose |
|------------|---------|---------|
| React 18+ | `react`, `react-dom` | UI framework with Server Components |
| Next.js 14+ | `next` | App Router, SSR, API routes |
| DSFR | `@codegouvfr/react-dsfr` | French Gov design system components |
| TypeScript | `typescript` | Type safety and documentation |
| Map Library | `react-map-gl` / `maplibre-gl` | Interactive climate data maps |
| Charts | `recharts` / `d3` | Climate data visualizations |
| State Management | `zustand` | Lightweight state management |
| Data Fetching | `swr` | React hooks for data fetching |
| i18n | `next-intl` | Internationalization |

### 2.2 Backend / Data Stack

| Technology | Package/Service | Purpose |
|------------|-----------------|---------|
| STAC API | `stac-fastapi` / `pystac` | Geospatial data catalog (inspired by EcoDataCube) |
| Cloud Storage | S3 / MinIO | Cloud-Optimized GeoTIFF storage |
| Data Format | COG, NetCDF, Zarr | Climate data formats |
| Tile Server | `titiler` | Dynamic map tile generation |
| GeoTIFF Reader | `geotiff` | Client-side raster data reading |

---

## 3. DSFR Integration Guide

The application must strictly follow the French Government Design System (DSFR) for official public service websites. This ensures visual consistency and accessibility compliance.

### 3.1 Installation

```bash
yarn add @codegouvfr/react-dsfr
yarn add --dev sass

# For Next.js App Router setup
npx degit https://github.com/garronej/react-dsfr-next-appdir-demo/src/dsfr-bootstrap src/dsfr-bootstrap
```

### 3.2 Next.js App Router Setup

```tsx
// src/app/layout.tsx
import { getHtmlAttributes, DsfrHead } from "../dsfr-bootstrap/server-only-index";
import { DsfrProvider } from "../dsfr-bootstrap";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = "fr";
  return (
    <html {...getHtmlAttributes({ lang })}>
      <head>
        <DsfrHead />
      </head>
      <body>
        <DsfrProvider lang={lang}>
          {children}
        </DsfrProvider>
      </body>
    </html>
  );
}
```

### 3.3 Required DSFR Components

- **Header** - Official government header with service title and navigation
- **Footer** - Standard footer with legal links and accessibility statement
- **Navigation** - Main navigation and breadcrumb components
- **Tabs** - For switching between climate scenarios/periods
- **Select** - Dropdown menus for data selection
- **Buttons** - Primary/secondary actions
- **Cards** - For displaying climate indicators
- **Accordions** - For detailed information sections
- **Callouts** - For important notices and warnings
- **Modal** - For download options and user settings
- **Alert** - For system notifications
- **Badge** - For status indicators
- **Tag** - For filtering and categorization

---

## 4. Application Structure

### 4.1 Three-Space Architecture (following DRIAS)

The application follows the existing DRIAS three-space model:

| Space | Description & Routes |
|-------|---------------------|
| **Accompagnement** | `/accompagnement` - User guides, best practices, methodology, TRACC reports, glossary |
| **Découverte** | `/decouverte` - Interactive map visualization, geolocation search, climate scenario exploration |
| **Données & Produits** | `/donnees` - Data download (NetCDF, CSV), climate indicators, user accounts |

### 4.2 Project Structure

```
drias-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout with DSFR
│   │   ├── page.tsx              # Homepage
│   │   ├── accompagnement/       # Guidance space
│   │   │   ├── page.tsx
│   │   │   ├── guide/
│   │   │   ├── methodologie/
│   │   │   └── glossaire/
│   │   ├── decouverte/           # Discovery/visualization space
│   │   │   ├── page.tsx
│   │   │   ├── [indicator]/      # Dynamic routes per indicator
│   │   │   └── compare/          # Comparison views
│   │   ├── donnees/              # Data download space
│   │   │   ├── page.tsx
│   │   │   ├── telecharger/
│   │   │   └── api-access/
│   │   ├── compte/               # User account
│   │   └── api/                  # API routes
│   │       ├── stac/
│   │       ├── tiles/
│   │       └── auth/
│   ├── components/
│   │   ├── layout/               # Header, Footer, Navigation
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Breadcrumb.tsx
│   │   ├── map/                  # Map components
│   │   │   ├── ClimateMap.tsx
│   │   │   ├── MapControls.tsx
│   │   │   ├── Legend.tsx
│   │   │   └── LocationSearch.tsx
│   │   ├── charts/               # Visualization components
│   │   │   ├── TimeSeriesChart.tsx
│   │   │   ├── ComparisonChart.tsx
│   │   │   └── IndicatorCard.tsx
│   │   ├── data/                 # Data selection widgets
│   │   │   ├── ScenarioSelector.tsx
│   │   │   ├── PeriodSelector.tsx
│   │   │   ├── IndicatorSelector.tsx
│   │   │   └── DownloadForm.tsx
│   │   └── ui/                   # Shared UI components
│   ├── lib/
│   │   ├── stac/                 # STAC API client
│   │   │   ├── client.ts
│   │   │   ├── types.ts
│   │   │   └── hooks.ts
│   │   ├── climate/              # Climate data utilities
│   │   │   ├── indicators.ts
│   │   │   ├── scenarios.ts
│   │   │   └── colorscales.ts
│   │   └── dsfr/                 # DSFR configuration
│   ├── hooks/                    # Custom React hooks
│   ├── stores/                   # Zustand stores
│   └── types/                    # TypeScript definitions
│       ├── climate.ts
│       ├── stac.ts
│       └── api.ts
├── public/
│   ├── dsfr/                     # DSFR assets
│   └── locales/                  # i18n translations
├── messages/                     # next-intl messages
│   ├── fr.json
│   └── en.json
└── package.json
```

---

## 5. Functional Requirements

### 5.1 Climate Data Visualization (Espace Découverte)

| Feature | Description |
|---------|-------------|
| **Interactive Map** | Full-screen map view with France metropolitan and overseas territories |
| **Scenario Selection** | Toggle between RCP/SSP emission scenarios (RCP2.6, RCP4.5, RCP8.5) |
| **Time Period Selection** | Reference period, near future (2021-2050), mid-century (2041-2070), end of century (2071-2100) |
| **Indicator Selection** | Temperature (mean, max, min), precipitation, frost days, heat waves, drought index |
| **Geolocation Search** | Search by commune, department, or coordinates |
| **Point Data Display** | Click on map to see detailed projections for location |
| **Timeline Animation** | Animate through time periods to visualize change |
| **Comparison View** | Side-by-side comparison of different scenarios |
| **Layer Opacity** | Adjust transparency of climate layers |
| **Base Map Toggle** | Switch between satellite, terrain, and administrative views |

### 5.2 Data Download (Espace Données)

| Feature | Description |
|---------|-------------|
| **Format Selection** | NetCDF (full data), CSV (time series), GeoTIFF (maps) |
| **Spatial Selection** | Draw bounding box, select administrative regions, or point coordinates |
| **User Authentication** | Account creation for download tracking and preferences |
| **Download Queue** | Handle large data requests asynchronously |
| **API Access** | STAC API endpoints for programmatic data access |
| **Download History** | Track previous downloads in user account |
| **Data Citation** | Auto-generate citation for downloaded data |

### 5.3 Guidance Content (Espace Accompagnement)

| Feature | Description |
|---------|-------------|
| **User Guides** | Step-by-step tutorials for using the platform |
| **Methodology** | Documentation on climate models and downscaling methods |
| **Glossary** | Climate terminology definitions with search |
| **Best Practices** | Guidelines for using projections in adaptation planning |
| **Reports** | Integration with TRACC and other climate reports |
| **FAQ** | Frequently asked questions with categorization |
| **Video Tutorials** | Embedded video guides for complex features |

---

## 6. Climate Indicators

The application must support the following climate indicators (matching DRIAS data catalog):

| Category | Indicator Code | Description | Unit |
|----------|---------------|-------------|------|
| **Temperature** | `tas` | Mean temperature | °C |
| | `tasmax` | Maximum temperature | °C |
| | `tasmin` | Minimum temperature | °C |
| **Precipitation** | `pr` | Daily precipitation | mm/day |
| | `prcptot` | Total precipitation | mm |
| **Extreme Events** | `fd` | Frost days (Tmin < 0°C) | days |
| | `tr` | Tropical nights (Tmin > 20°C) | days |
| | `su` | Summer days (Tmax > 25°C) | days |
| | `id` | Ice days (Tmax < 0°C) | days |
| **Heat Waves** | `hwdi` | Heat wave duration index | days |
| | `wsdi` | Warm spell duration index | days |
| **Drought** | `spi` | Standardized precipitation index | - |
| | `spei` | Standardized precipitation evapotranspiration index | - |
| | `swi` | Soil water index | % |
| **Fire Risk** | `fwi` | Fire weather index | - |

### Climate Scenarios

| Scenario | Description | Global Warming by 2100 |
|----------|-------------|----------------------|
| **RCP2.6** | Strong mitigation | +1.0°C to +2.4°C |
| **RCP4.5** | Intermediate | +1.7°C to +3.2°C |
| **RCP8.5** | High emissions (business as usual) | +3.2°C to +5.4°C |

### Time Periods

| Period | Years | Label |
|--------|-------|-------|
| Reference | 1976-2005 | Période de référence |
| Near Future | 2021-2050 | Horizon proche |
| Mid-Century | 2041-2070 | Milieu de siècle |
| End of Century | 2071-2100 | Fin de siècle |

---

## 7. Non-Functional Requirements

### 7.1 Accessibility (RGAA)

- Full compliance with RGAA 4.1 (French accessibility standards)
- WCAG 2.1 AA conformance minimum
- Keyboard navigation for all interactive elements
- Screen reader compatibility (ARIA labels)
- Alternative text for all map visualizations
- High contrast mode support
- Focus indicators on all interactive elements
- Skip links for main content
- Accessible color palettes for climate data

### 7.2 Performance

| Metric | Target |
|--------|--------|
| Initial page load | < 3 seconds |
| Map tile loading | < 1 second per viewport |
| Concurrent users | 100+ |
| Lighthouse Performance | > 90 |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3.5s |

**Optimization strategies:**
- Lazy loading for data-heavy components
- Service Worker for offline map caching
- Image optimization with Next.js Image
- Code splitting per route
- CDN for static assets

### 7.3 Internationalization

| Aspect | Requirement |
|--------|-------------|
| Primary language | French |
| Secondary language | English |
| i18n framework | `next-intl` |
| Date formatting | Per locale (DD/MM/YYYY for FR) |
| Number formatting | Per locale (space for thousands in FR) |
| RTL support | Not required |

### 7.4 Browser Support

| Browser | Versions |
|---------|----------|
| Chrome/Edge | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari | Latest 2 versions |
| iOS Safari | Latest 2 versions |
| Chrome Android | Latest 2 versions |

### 7.5 Security

- HTTPS only
- CSP headers configured
- XSS protection
- CSRF protection for forms
- Rate limiting on API endpoints
- Secure authentication (OAuth 2.0 / OIDC)

---

## 8. API Specifications (STAC-inspired)

Following the EcoDataCube architecture, the data API should implement STAC (SpatioTemporal Asset Catalog) for standardized geospatial data access.

### 8.1 STAC Endpoints

```
GET  /api/stac/                    # STAC root catalog
GET  /api/stac/collections         # List all data collections
GET  /api/stac/collections/{id}    # Collection metadata
GET  /api/stac/collections/{id}/items  # Items in collection
GET  /api/stac/search              # Search items by bbox, time, properties
POST /api/stac/search              # Advanced search with filters
```

### 8.2 Tile Endpoints (titiler-style)

```
GET /api/tiles/{collection}/{z}/{x}/{y}.png
    ?scenario=rcp85
    &period=2071-2100
    &colormap=viridis
    &rescale=0,40

GET /api/tiles/{collection}/tilejson.json
    ?scenario=rcp85
    &period=2071-2100

GET /api/point/{collection}
    ?lat=48.8566
    &lon=2.3522
    &scenario=rcp85
    &period=2071-2100
```

### 8.3 Data Download Endpoints

```
POST /api/download/request
    {
      "collection": "temperature",
      "indicator": "tas",
      "scenario": "rcp85",
      "period": "2071-2100",
      "bbox": [minLon, minLat, maxLon, maxLat],
      "format": "netcdf"
    }

GET /api/download/status/{requestId}
GET /api/download/file/{requestId}
```

### 8.4 Example STAC Collection

```json
{
  "type": "Collection",
  "id": "drias-temperature",
  "stac_version": "1.0.0",
  "description": "Temperature projections for France",
  "links": [],
  "title": "DRIAS Temperature Projections",
  "extent": {
    "spatial": {
      "bbox": [[-5.5, 41.0, 10.0, 51.5]]
    },
    "temporal": {
      "interval": [["1976-01-01T00:00:00Z", "2100-12-31T23:59:59Z"]]
    }
  },
  "license": "CC-BY-4.0",
  "providers": [
    {
      "name": "Météo-France",
      "roles": ["producer", "host"],
      "url": "https://meteofrance.com"
    }
  ],
  "summaries": {
    "scenarios": ["rcp26", "rcp45", "rcp85"],
    "indicators": ["tas", "tasmax", "tasmin"],
    "periods": ["reference", "2021-2050", "2041-2070", "2071-2100"]
  }
}
```

---

## 9. Component Specifications

### 9.1 ClimateMap Component

```tsx
interface ClimateMapProps {
  indicator: ClimateIndicator;
  scenario: Scenario;
  period: TimePeriod;
  onLocationSelect?: (lat: number, lon: number) => void;
  initialViewport?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}
```

**Requirements:**
- Use MapLibre GL with DSFR-styled controls
- Support France metropolitan + DOM-TOM
- Responsive: full-screen on mobile, sidebar on desktop
- Layer controls for opacity and base map
- Click handler for point data queries

### 9.2 ScenarioSelector Component

```tsx
interface ScenarioSelectorProps {
  value: Scenario;
  onChange: (scenario: Scenario) => void;
  showDescription?: boolean;
}
```

**Requirements:**
- Use DSFR SegmentedControl or Tabs
- Show scenario descriptions on hover/focus
- Keyboard accessible
- Visual indication of current selection

### 9.3 TimeSeriesChart Component

```tsx
interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  indicator: ClimateIndicator;
  scenarios: Scenario[];
  location: { lat: number; lon: number; name: string };
}
```

**Requirements:**
- Use Recharts with DSFR color palette
- Show uncertainty ranges (shaded areas)
- Interactive tooltips
- Exportable as PNG/SVG
- Accessible data table alternative

---

## 10. Implementation Phases

### Phase 1: Foundation (Weeks 1-4)

| Task | Priority | Effort |
|------|----------|--------|
| Next.js project setup with App Router | High | 2 days |
| DSFR integration (@codegouvfr/react-dsfr) | High | 3 days |
| Layout components (Header, Footer, Navigation) | High | 3 days |
| Basic routing structure for three spaces | High | 2 days |
| TypeScript configuration and types | High | 2 days |
| ESLint + Prettier setup | Medium | 1 day |
| CI/CD pipeline setup | Medium | 2 days |

**Deliverable:** Working application shell with DSFR styling and navigation

### Phase 2: Map Visualization (Weeks 5-8)

| Task | Priority | Effort |
|------|----------|--------|
| MapLibre GL integration | High | 3 days |
| STAC API client implementation | High | 4 days |
| Climate indicator selection UI | High | 3 days |
| Scenario and period selectors | High | 2 days |
| Basic map layer rendering | High | 4 days |
| Geolocation search | Medium | 2 days |
| Map legend component | Medium | 2 days |

**Deliverable:** Interactive climate map with scenario/period/indicator selection

### Phase 3: Data Features (Weeks 9-12)

| Task | Priority | Effort |
|------|----------|--------|
| Point data display and charts | High | 4 days |
| Time series visualization | High | 3 days |
| Data download functionality | High | 4 days |
| User authentication | Medium | 3 days |
| Comparison views | Medium | 3 days |
| Download queue system | Medium | 3 days |

**Deliverable:** Complete data visualization and download functionality

### Phase 4: Polish & Launch (Weeks 13-16)

| Task | Priority | Effort |
|------|----------|--------|
| Accompagnement content pages | High | 4 days |
| Accessibility audit and fixes | High | 4 days |
| Performance optimization | High | 3 days |
| i18n implementation (FR/EN) | Medium | 3 days |
| Documentation | Medium | 2 days |
| User testing and fixes | High | 3 days |
| Deployment and monitoring | High | 2 days |

**Deliverable:** Production-ready application

---

## 11. Dependencies

### package.json

```json
{
  "name": "drias-climate-portal",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@codegouvfr/react-dsfr": "^1.0.0",
    "react-map-gl": "^7.1.0",
    "maplibre-gl": "^4.0.0",
    "recharts": "^2.10.0",
    "d3": "^7.8.0",
    "d3-scale-chromatic": "^3.0.0",
    "swr": "^2.2.0",
    "zustand": "^4.4.0",
    "next-intl": "^3.0.0",
    "geotiff": "^2.1.0",
    "proj4": "^2.9.0",
    "date-fns": "^3.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "sass": "^1.69.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.10.0",
    "@types/d3": "^7.4.0",
    "@types/geojson": "^7946.0.0",
    "eslint": "^8.55.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.1.0",
    "@testing-library/react": "^14.1.0",
    "@testing-library/jest-dom": "^6.1.0",
    "jest": "^29.7.0"
  }
}
```

---

## 12. References

| Resource | URL |
|----------|-----|
| DRIAS Portal | https://www.drias-climat.fr/ |
| DSFR React | https://github.com/codegouvfr/react-dsfr |
| DSFR Documentation | https://react-dsfr.etalab.studio/ |
| DSFR Official | https://www.systeme-de-design.gouv.fr/ |
| EcoDataCube STAC | https://stac.ecodatacube.eu/ |
| STAC Specification | https://stacspec.org/ |
| MapLibre GL JS | https://maplibre.org/maplibre-gl-js/docs/ |
| Titiler | https://developmentseed.org/titiler/ |
| RGAA 4.1 | https://accessibilite.numerique.gouv.fr/ |
| Figma Prototype | Maquette Drias (provided) |

---

## 13. Glossary

| Term | Definition |
|------|------------|
| **DSFR** | Système de Design de l'État - French Government Design System |
| **STAC** | SpatioTemporal Asset Catalog - specification for geospatial data |
| **COG** | Cloud-Optimized GeoTIFF - efficient raster format for cloud storage |
| **RCP** | Representative Concentration Pathway - greenhouse gas scenarios |
| **SSP** | Shared Socioeconomic Pathway - socioeconomic scenarios |
| **RGAA** | Référentiel Général d'Amélioration de l'Accessibilité - French accessibility standard |
| **DOM-TOM** | Départements et territoires d'outre-mer - French overseas territories |
| **NetCDF** | Network Common Data Form - self-describing data format |
| **titiler** | Dynamic tile server for Cloud-Optimized GeoTIFFs |

---

*Document generated for AI agent development with Claude Code*
