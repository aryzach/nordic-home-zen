import { MonthlyClimate } from './climateDataService';
import { getSaunaTempBucket, getSaunaQuality } from './saunaTempBuckets';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface MonthlyResultsTableProps {
  data: MonthlyClimate[];
}

const qualityColors: Record<string, string> = {
  cold: 'text-blue-600',
  cool: 'text-sky-600',
  moderate: 'text-emerald-600',
  warm: 'text-amber-600',
  hot: 'text-orange-600',
  peak: 'text-red-600',
};

const MonthlyResultsTable = ({ data }: MonthlyResultsTableProps) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="font-semibold text-foreground min-w-[80px]">Month</TableHead>
              <TableHead className="font-semibold text-foreground text-center min-w-[90px]">Avg High</TableHead>
              <TableHead className="font-semibold text-foreground text-center min-w-[130px]">Sauna (Day)</TableHead>
              <TableHead className="font-semibold text-foreground text-center min-w-[90px]">Avg Low</TableHead>
              <TableHead className="font-semibold text-foreground text-center min-w-[130px]">Sauna (Night)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => {
              const dayBucket = getSaunaTempBucket(row.avgHighF);
              const nightBucket = getSaunaTempBucket(row.avgLowF);
              const dayQuality = getSaunaQuality(row.avgHighF);
              const nightQuality = getSaunaQuality(row.avgLowF);

              return (
                <TableRow key={row.month}>
                  <TableCell className="font-medium text-foreground">{row.monthShort}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{row.avgHighF}°F</TableCell>
                  <TableCell className={`text-center font-medium ${qualityColors[dayQuality]}`}>
                    {dayBucket}
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">{row.avgLowF}°F</TableCell>
                  <TableCell className={`text-center font-medium ${qualityColors[nightQuality]}`}>
                    {nightBucket}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MonthlyResultsTable;
