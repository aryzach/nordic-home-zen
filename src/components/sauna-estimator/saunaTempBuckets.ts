// Sauna temperature bucket conversion logic
// Maps outdoor ambient temperature (°F) to expected sauna temperature range

export interface SaunaBucket {
  label: string;
  minOutdoor: number;
  maxOutdoor: number;
  quality: 'cold' | 'cool' | 'moderate' | 'warm' | 'hot' | 'peak';
}

export const SAUNA_BUCKETS: SaunaBucket[] = [
  { label: '<160°F', minOutdoor: -Infinity, maxOutdoor: 49, quality: 'cold' },
  { label: '160–164°F', minOutdoor: 50, maxOutdoor: 59, quality: 'cool' },
  { label: '165–169°F', minOutdoor: 60, maxOutdoor: 69, quality: 'moderate' },
  { label: '170–189°F', minOutdoor: 70, maxOutdoor: 79, quality: 'warm' },
  { label: '190–199°F', minOutdoor: 80, maxOutdoor: 89, quality: 'hot' },
  { label: '200°F+', minOutdoor: 90, maxOutdoor: Infinity, quality: 'peak' },
];

/**
 * Given an outdoor temperature in °F, returns the expected sauna temperature bucket label.
 */
export function getSaunaTempBucket(outdoorTempF: number): string {
  for (const bucket of SAUNA_BUCKETS) {
    if (outdoorTempF <= bucket.maxOutdoor) {
      return bucket.label;
    }
  }
  return '200°F+';
}

/**
 * Returns the quality tier for a given outdoor temperature.
 */
export function getSaunaQuality(outdoorTempF: number): SaunaBucket['quality'] {
  for (const bucket of SAUNA_BUCKETS) {
    if (outdoorTempF <= bucket.maxOutdoor) {
      return bucket.quality;
    }
  }
  return 'peak';
}
