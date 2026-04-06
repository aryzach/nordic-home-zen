import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { cities } from "./climateData";
import { tempToColor, formatTemp } from "./utils";

interface MapPanelProps {
  month: number;
  variable: "high" | "low";
  onReset?: () => void;
}

const US_CENTER: [number, number] = [-98.5, 39.5];
const US_ZOOM = 3.5;
const US_BOUNDS: [[number, number], [number, number]] = [
  [-130, 24],
  [-65, 50],
];

/**
 * Build GeoJSON from city climate data for the selected month/variable.
 */
function buildGeoJSON(month: number, variable: "high" | "low"): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: cities.map((city) => {
      const temp = variable === "high" ? city.highs[month] : city.lows[month];
      return {
        type: "Feature",
        geometry: { type: "Point", coordinates: [city.lng, city.lat] },
        properties: {
          name: city.name,
          state: city.state,
          temp,
          color: tempToColor(temp),
          label: formatTemp(temp),
        },
      };
    }),
  };
}

const MapPanel = ({ month, variable }: MapPanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const [loading, setLoading] = useState(true);

  const resetView = useCallback(() => {
    mapRef.current?.flyTo({ center: US_CENTER, zoom: US_ZOOM, duration: 800 });
  }, []);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      // Free OpenStreetMap-based style with muted colors
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
            paint: { "raster-saturation": -0.6, "raster-brightness-max": 0.95 },
          },
        ],
      },
      center: US_CENTER,
      zoom: US_ZOOM,
      maxBounds: [[-140, 15], [-55, 55]],
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: "climate-popup",
      offset: 12,
    });
    popupRef.current = popup;

    map.on("load", () => {
      setLoading(false);

      // Add climate data source
      map.addSource("climate-points", {
        type: "geojson",
        data: buildGeoJSON(month, variable),
      });

      // Halo layer for contrast
      map.addLayer({
        id: "climate-halo",
        type: "circle",
        source: "climate-points",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 3, 14, 6, 22, 9, 32],
          "circle-color": "#ffffff",
          "circle-opacity": 0.4,
        },
      });

      // Main colored circles
      map.addLayer({
        id: "climate-circles",
        type: "circle",
        source: "climate-points",
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 3, 10, 6, 18, 9, 28],
          "circle-color": ["get", "color"],
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#ffffff",
          "circle-opacity": 0.85,
        },
      });

      // Labels
      map.addLayer({
        id: "climate-labels",
        type: "symbol",
        source: "climate-points",
        layout: {
          "text-field": ["get", "label"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 3, 9, 6, 12, 9, 14],
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
          "text-allow-overlap": false,
        },
        paint: {
          "text-color": "#1a1a1a",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1.5,
        },
      });

      // Hover interactions
      map.on("mouseenter", "climate-circles", (e) => {
        map.getCanvas().style.cursor = "pointer";
        const f = e.features?.[0];
        if (f && f.geometry.type === "Point") {
          const coords = f.geometry.coordinates as [number, number];
          popup
            .setLngLat(coords)
            .setHTML(
              `<div style="font-family:Inter,system-ui,sans-serif;font-size:13px;line-height:1.4">
                <strong>${f.properties?.name}, ${f.properties?.state}</strong><br/>
                ${f.properties?.label}
              </div>`
            )
            .addTo(map);
        }
      });

      map.on("mouseleave", "climate-circles", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });
    });

    mapRef.current = map;

    return () => {
      popup.remove();
      map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update data when month/variable changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const source = map.getSource("climate-points") as maplibregl.GeoJSONSource | undefined;
    if (source) {
      source.setData(buildGeoJSON(month, variable));
    }
  }, [month, variable]);

  // Expose reset
  useEffect(() => {
    (window as any).__climateMapReset = resetView;
    return () => { delete (window as any).__climateMapReset; };
  }, [resetView]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-border" style={{ height: "min(70vh, 600px)" }}>
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/80">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">Loading map…</span>
          </div>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default MapPanel;
export { US_CENTER, US_ZOOM };
