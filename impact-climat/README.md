# DRIAS Climate Portal - Prototype

A Next.js-based prototype for the DRIAS climate data visualization portal, built following the French Government Design System (DSFR).

## Features

- **Interactive Map Visualization**: MapLibre GL-based map with WMS layer support
- **Climate Scenario Selection**: RCP 2.6, 4.5, and 8.5 scenarios
- **Time Period Selection**: Reference, Near Future, Mid-Century, End of Century
- **Climate Indicators**: Temperature, precipitation, extreme events
- **DSFR Integration**: French Government Design System for official look and feel
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
impact-climat/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── decouverte/         # Map visualization page
│   │   ├── donnees/            # Data download page
│   │   └── accompagnement/     # Documentation page
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── map/                # ClimateMap, Legend, MapSidebar
│   │   └── data/               # Selectors for scenario, period, indicator
│   ├── lib/climate/            # Climate data configuration
│   ├── stores/                 # Zustand state management
│   └── types/                  # TypeScript definitions
└── public/                     # Static assets
```

## WMS Layers

The application supports WMS layers from various French government services:

### Climate Data
- PREV'AIR air quality data
- Copernicus Climate Change Service

### Risk Layers
- Flood zones (Géorisques)
- Coastal flooding (BRGM)
- Seismic zones
- Landslide risk
- Forest fire risk

### Reference Layers
- Administrative boundaries (IGN)
- Land cover (CORINE)

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **UI**: React 18 + DSFR (French Gov Design System)
- **Map**: MapLibre GL + react-map-gl
- **State**: Zustand
- **Styling**: CSS + Tailwind utilities

## Adding New WMS Layers

To add a new WMS layer, edit `src/lib/climate/layers.ts`:

```typescript
{
  id: 'unique-layer-id',
  name: 'Layer Display Name',
  url: 'https://wms-service-url/wms',
  layers: 'layer_name',
  version: '1.3.0',
  format: 'image/png',
  transparent: true,
  attribution: '© Data Provider',
  opacity: 0.7,
  visible: false,
  category: 'climate' | 'risk' | 'reference',
}
```

## Future Development

- [ ] Connect to actual DRIAS WMS services when available
- [ ] Implement point data queries (GetFeatureInfo)
- [ ] Add time series charts for selected locations
- [ ] Implement data download functionality
- [ ] Add user authentication
- [ ] Integrate STAC API for data catalog

## License

MIT

---

Built with ❤️ for French climate adaptation efforts.
