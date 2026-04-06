import { getLegendStops, formatTemp } from "./utils";

const Legend = () => {
  const stops = getLegendStops(7);

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="font-medium">Cold</span>
      <div className="flex h-4 rounded overflow-hidden flex-1 max-w-[200px]">
        {stops.map((stop, i) => (
          <div
            key={i}
            className="flex-1"
            style={{ backgroundColor: stop.color }}
            title={formatTemp(stop.temp)}
          />
        ))}
      </div>
      <span className="font-medium">Hot</span>
      <span className="hidden sm:inline text-muted-foreground/60 ml-1">
        ({formatTemp(stops[0].temp)} – {formatTemp(stops[stops.length - 1].temp)})
      </span>
    </div>
  );
};

export default Legend;
