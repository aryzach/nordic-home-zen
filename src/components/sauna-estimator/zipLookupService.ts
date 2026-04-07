// ZIP code lookup service
// Uses the free Zippopotam.us API for ZIP -> city/state/lat/lng

export interface ZipLookupResult {
  zip: string;
  city: string;
  state: string;
  stateAbbr: string;
  latitude: number;
  longitude: number;
}

/**
 * Validates a 5-digit US ZIP code format.
 */
export function isValidZip(zip: string): boolean {
  return /^\d{5}$/.test(zip.trim());
}

/**
 * Looks up a US ZIP code and returns location info.
 * Uses the free Zippopotam.us API.
 */
export async function lookupZip(zip: string): Promise<ZipLookupResult> {
  const trimmed = zip.trim();
  if (!isValidZip(trimmed)) {
    throw new Error('Please enter a valid 5-digit U.S. ZIP code.');
  }

  const response = await fetch(`https://api.zippopotam.us/us/${trimmed}`);

  if (!response.ok) {
    throw new Error('ZIP code not found. Please check and try again.');
  }

  const data = await response.json();
  const place = data.places?.[0];

  if (!place) {
    throw new Error('No location data found for this ZIP code.');
  }

  return {
    zip: trimmed,
    city: place['place name'],
    state: place.state,
    stateAbbr: place['state abbreviation'],
    latitude: parseFloat(place.latitude),
    longitude: parseFloat(place.longitude),
  };
}
