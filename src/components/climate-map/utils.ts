import { MONTHS } from "./climateData";

export function formatTemp(f: number): string {
  return `${Math.round(f)}°F`;
}

export function getMonthLabel(index: number): string {
  return MONTHS[index];
}

export function getMonthShortLabel(index: number): string {
  return MONTHS[index].slice(0, 3);
}

/**
 * Temperature color scale (°F → hex color).
 * Blue (cold) → Cyan → Green → Yellow → Orange → Red (hot)
 */
export function tempToColor(tempF: number): string {
  // Clamp to display range
  const min = -10;
  const max = 110;
  const t = Math.max(0, Math.min(1, (tempF - min) / (max - min)));

  // Color stops
  const stops: [number, [number, number, number]][] = [
    [0.0, [49, 54, 149]],    // deep blue
    [0.15, [69, 117, 180]],   // blue
    [0.3, [116, 173, 209]],   // light blue
    [0.4, [171, 217, 233]],   // cyan
    [0.5, [255, 255, 191]],   // yellow
    [0.6, [254, 224, 144]],   // light orange
    [0.7, [253, 174, 97]],    // orange
    [0.8, [244, 109, 67]],    // dark orange
    [0.9, [215, 48, 39]],     // red
    [1.0, [165, 0, 38]],      // dark red
  ];

  // Interpolate
  let lower = stops[0];
  let upper = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i][0] && t <= stops[i + 1][0]) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }

  const range = upper[0] - lower[0];
  const factor = range === 0 ? 0 : (t - lower[0]) / range;
  const r = Math.round(lower[1][0] + factor * (upper[1][0] - lower[1][0]));
  const g = Math.round(lower[1][1] + factor * (upper[1][1] - lower[1][1]));
  const b = Math.round(lower[1][2] + factor * (upper[1][2] - lower[1][2]));

  return `rgb(${r},${g},${b})`;
}

/** Generate legend stops for the current range */
export function getLegendStops(count = 7): { temp: number; color: string }[] {
  const min = -10;
  const max = 110;
  const stops = [];
  for (let i = 0; i < count; i++) {
    const temp = min + (max - min) * (i / (count - 1));
    stops.push({ temp, color: tempToColor(temp) });
  }
  return stops;
}
