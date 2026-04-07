// Climate data service
// Provides monthly average high/low temperatures for a given lat/lng.
// Uses the Open-Meteo Climate API (free, no key required).

export interface MonthlyClimate {
  month: string;       // e.g. "January"
  monthShort: string;  // e.g. "Jan"
  avgHighF: number;    // average daytime high in °F
  avgLowF: number;     // average nighttime low in °F
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function celsiusToFahrenheit(c: number): number {
  return Math.round(c * 9 / 5 + 32);
}

/**
 * Fetches monthly climate normals for a location using Open-Meteo's Climate API.
 * Uses ERA5 reanalysis data (1991-2020 normals).
 */
export async function getMonthlyClimate(lat: number, lng: number): Promise<MonthlyClimate[]> {
  try {
    // Use Open-Meteo climate API for monthly normals (1991-2020)
    const url = `https://climate-api.open-meteo.com/v1/climate?latitude=${lat}&longitude=${lng}&start_date=1991-01-01&end_date=2020-12-31&models=ERA5&monthly=temperature_2m_max_mean,temperature_2m_min_mean`;

    const response = await fetch(url);

    if (!response.ok) {
      console.warn('Climate API returned non-OK status, falling back to estimation');
      return estimateClimate(lat);
    }

    const data = await response.json();
    const monthly = data.monthly;

    if (!monthly?.temperature_2m_max_mean || !monthly?.temperature_2m_min_mean) {
      console.warn('Climate API returned incomplete data, falling back to estimation');
      return estimateClimate(lat);
    }

    // The API returns 30 years of monthly data. We need to average by month.
    const highsByMonth: number[][] = Array.from({ length: 12 }, () => []);
    const lowsByMonth: number[][] = Array.from({ length: 12 }, () => []);

    for (let i = 0; i < monthly.temperature_2m_max_mean.length; i++) {
      const monthIndex = i % 12;
      const high = monthly.temperature_2m_max_mean[i];
      const low = monthly.temperature_2m_min_mean[i];
      if (high != null) highsByMonth[monthIndex].push(high);
      if (low != null) lowsByMonth[monthIndex].push(low);
    }

    return MONTH_NAMES.map((name, i) => {
      const avgHighC = highsByMonth[i].reduce((a, b) => a + b, 0) / (highsByMonth[i].length || 1);
      const avgLowC = lowsByMonth[i].reduce((a, b) => a + b, 0) / (lowsByMonth[i].length || 1);

      return {
        month: name,
        monthShort: MONTH_SHORT[i],
        avgHighF: celsiusToFahrenheit(avgHighC),
        avgLowF: celsiusToFahrenheit(avgLowC),
      };
    });
  } catch (error) {
    console.warn('Climate API error, falling back to estimation:', error);
    return estimateClimate(lat);
  }
}

/**
 * Fallback: estimate climate based on latitude using a simple model.
 * This provides reasonable estimates for the continental US.
 */
function estimateClimate(lat: number): MonthlyClimate[] {
  // Simple latitude-based estimation for continental US (25°N - 49°N)
  const normalizedLat = Math.max(0, Math.min(1, (lat - 25) / 24));

  // Base summer high: 95°F (south) to 75°F (north)
  const summerHigh = 95 - normalizedLat * 20;
  // Base winter high: 65°F (south) to 25°F (north)
  const winterHigh = 65 - normalizedLat * 40;

  const seasonalAmplitude = (summerHigh - winterHigh) / 2;
  const annualMean = (summerHigh + winterHigh) / 2;

  return MONTH_NAMES.map((name, i) => {
    // Sine wave peaking in July (index 6)
    const seasonalOffset = Math.cos((i - 6) * Math.PI / 6);
    const high = Math.round(annualMean + seasonalAmplitude * seasonalOffset);
    const low = Math.round(high - 15 - normalizedLat * 10);

    return {
      month: name,
      monthShort: MONTH_SHORT[i],
      avgHighF: high,
      avgLowF: low,
    };
  });
}
