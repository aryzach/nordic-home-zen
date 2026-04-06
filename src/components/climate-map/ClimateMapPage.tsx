import { useState, useCallback } from "react";
import ClimateControls from "./ClimateControls";
import MapPanel from "./MapPanel";
import Legend from "./Legend";
import { getMonthLabel } from "./utils";
import { MapPin, MousePointer2, SlidersHorizontal } from "lucide-react";

const DEFAULT_MONTH = new Date().getMonth(); // current month

const ClimateMapPage = () => {
  const [month, setMonth] = useState(DEFAULT_MONTH);
  const [variable, setVariable] = useState<"high" | "low">("high");

  const handleReset = useCallback(() => {
    setMonth(DEFAULT_MONTH);
    setVariable("high");
    (window as any).__climateMapReset?.();
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-card rounded-lg border border-border p-4">
        <ClimateControls
          month={month}
          variable={variable}
          onMonthChange={setMonth}
          onVariableChange={setVariable}
          onReset={handleReset}
        />
      </div>

      {/* Current selection label */}
      <p className="text-sm text-muted-foreground text-center">
        Showing <strong className="text-foreground">{variable === "high" ? "Average High" : "Average Low"}</strong> temperatures for <strong className="text-foreground">{getMonthLabel(month)}</strong>
      </p>

      {/* Map */}
      <MapPanel month={month} variable={variable} onReset={handleReset} />

      {/* Legend */}
      <div className="flex justify-center">
        <Legend />
      </div>

      {/* How-to tips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {[
          { icon: SlidersHorizontal, text: "Use the controls above to switch months and toggle between highs and lows" },
          { icon: MousePointer2, text: "Hover over a city to see its exact temperature" },
          { icon: MapPin, text: "Zoom and pan to explore different regions" },
        ].map(({ icon: Icon, text }, i) => (
          <div key={i} className="flex flex-col items-center gap-2 p-3">
            <Icon size={18} className="text-primary" />
            <p className="text-xs text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground/70 text-center max-w-xl mx-auto">
        This map shows long-run monthly averages based on historical climate normals — not current or forecasted weather. Data covers major U.S. cities across the continental United States.
      </p>
    </div>
  );
};

export default ClimateMapPage;
