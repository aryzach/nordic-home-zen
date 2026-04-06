/**
 * Climate layer configuration.
 *
 * ARCHITECTURE:
 * This config-driven structure lets you swap data sources without touching components.
 *
 * CURRENT STATE (MVP):
 * - Uses GeoJSON point data from climateData.ts (city-level averages)
 * - Rendered as colored circles on the map
 *
 * UPGRADE PATH — Raster Tiles:
 * To use pre-generated raster tiles instead of city points:
 * 1. Generate monthly climate raster tiles (e.g., via GeoTIFF → MBTiles → PMTiles)
 * 2. Host them on a static CDN or tile server
 * 3. Uncomment the rasterTileUrl fields below and fill in real URLs
 * 4. Update MapPanel.tsx to add a raster layer source instead of GeoJSON circles
 *
 * Each layer config entry has:
 * - month index (0-11)
 * - variable: "high" or "low"
 * - label for display
 * - placeholder rasterTileUrl (replace with real URL when available)
 */

export interface ClimateLayerConfig {
  month: number;
  variable: "high" | "low";
  label: string;
  /** Replace with real tile URL when available, e.g.:
   * "https://cdn.example.com/climate/avg-high-jan/{z}/{x}/{y}.png"
   */
  rasterTileUrl: string | null;
}

export const climateLayers: ClimateLayerConfig[] = Array.from({ length: 12 }, (_, m) => [
  {
    month: m,
    variable: "high" as const,
    label: `Average High`,
    rasterTileUrl: null, // TODO: replace with real tile URL
  },
  {
    month: m,
    variable: "low" as const,
    label: `Average Low`,
    rasterTileUrl: null, // TODO: replace with real tile URL
  },
]).flat();

export function getLayerConfig(month: number, variable: "high" | "low"): ClimateLayerConfig {
  return climateLayers.find(l => l.month === month && l.variable === variable)!;
}
