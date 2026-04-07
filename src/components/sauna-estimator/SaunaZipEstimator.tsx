import { useState } from 'react';
import ZipCodeForm from './ZipCodeForm';
import ResultsSummary from './ResultsSummary';
import MonthlyResultsTable from './MonthlyResultsTable';
import { lookupZip, type ZipLookupResult } from './zipLookupService';
import { getMonthlyClimate, type MonthlyClimate } from './climateDataService';

const SaunaZipEstimator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<ZipLookupResult | null>(null);
  const [climateData, setClimateData] = useState<MonthlyClimate[] | null>(null);

  const handleSubmit = async (zip: string) => {
    setIsLoading(true);
    setError(null);
    setLocation(null);
    setClimateData(null);

    try {
      const loc = await lookupZip(zip);
      setLocation(loc);

      const climate = await getMonthlyClimate(loc.latitude, loc.longitude);
      setClimateData(climate);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const locationLabel = location ? `${location.city}, ${location.stateAbbr}` : '';

  return (
    <div className="space-y-8">
      {/* Title & input */}
      <div>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-2 text-heading">
          Sauna Temperature by ZIP Code
        </h2>
        <p className="text-muted-foreground mb-6">
          Enter your ZIP code to see estimated sauna performance throughout the year.
        </p>
        <ZipCodeForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
      </div>

      {/* Results */}
      {climateData && location && (
        <div className="space-y-6 animate-in fade-in-0 duration-300">
          <div>
            <h3 className="text-lg font-heading font-medium text-heading mb-1">
              {locationLabel}
            </h3>
            <p className="text-sm text-muted-foreground">
              Estimated sauna performance by month
            </p>
          </div>

          <ResultsSummary location={locationLabel} data={climateData} />
          <MonthlyResultsTable data={climateData} />

          <p className="text-xs text-muted-foreground leading-relaxed">
            These estimates use long-run monthly average outdoor temperatures, not current weather. Actual sauna performance can vary based on wind, sun exposure, setup, and surrounding conditions.
          </p>

          <button
            onClick={() => {
              setLocation(null);
              setClimateData(null);
              setError(null);
            }}
            className="text-sm text-[hsl(var(--color-accent))] hover:underline font-medium"
          >
            ← Try another ZIP code
          </button>
        </div>
      )}
    </div>
  );
};

export default SaunaZipEstimator;
