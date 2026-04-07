import { MonthlyClimate } from './climateDataService';
import { getSaunaQuality } from './saunaTempBuckets';
import { MapPin, Sun, Moon, Flame } from 'lucide-react';

interface ResultsSummaryProps {
  location: string;
  data: MonthlyClimate[];
}

const ResultsSummary = ({ location, data }: ResultsSummaryProps) => {
  // Find hottest daytime months (top sauna performance)
  const sorted = [...data].sort((a, b) => b.avgHighF - a.avgHighF);
  const hottestMonths = sorted.slice(0, 3).map(d => d.monthShort).join(', ');

  // Find coolest nighttime months
  const sortedLow = [...data].sort((a, b) => a.avgLowF - b.avgLowF);
  const coolestMonths = sortedLow.slice(0, 3).map(d => d.monthShort).join(', ');

  // Count months with warm+ daytime performance
  const greatMonths = data.filter(d => getSaunaQuality(d.avgHighF) !== 'cold' && getSaunaQuality(d.avgHighF) !== 'cool').length;

  const cards = [
    {
      icon: <MapPin className="h-5 w-5 text-[hsl(var(--color-accent))]" />,
      label: 'Location',
      value: location,
    },
    {
      icon: <Sun className="h-5 w-5 text-[hsl(var(--color-accent))]" />,
      label: 'Hottest Daytime Months',
      value: hottestMonths,
    },
    {
      icon: <Moon className="h-5 w-5 text-[hsl(var(--color-accent))]" />,
      label: 'Coolest Nighttime Months',
      value: coolestMonths,
    },
    {
      icon: <Flame className="h-5 w-5 text-[hsl(var(--color-accent))]" />,
      label: '165°F+ Daytime Months',
      value: `${greatMonths} of 12`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-card border border-border rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-1.5">
            {card.icon}
            <span className="text-xs text-muted-foreground font-medium">{card.label}</span>
          </div>
          <p className="text-sm font-semibold text-foreground">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsSummary;
