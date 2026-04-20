import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Row = { label: string; anywhere: string; barrel: string; nordica: string; plunge: string };

const mainRows: Row[] = [
  { label: "Standard Outlet (120V, 20A circuit breaker)", anywhere: "✅", barrel: "❌", nordica: "❌", plunge: "❌" },
  { label: "Full Body Heat", anywhere: "✅", barrel: "❌ (feet stay cold)", nordica: "✅", plunge: "✅" },
  { label: "Renter Friendly", anywhere: "✅", barrel: "❌", nordica: "❌", plunge: "❌" },
  { label: "Permits / Landlord Approval", anywhere: "✅ Not needed", barrel: "⚠️ Usually required", nordica: "⚠️ Usually required", plunge: "⚠️ Usually required" },
  { label: "Setup Time", anywhere: "~2 hours", barrel: "~8 hours + electrician", nordica: "~8 hours + electrician", plunge: "~2 hours" },
  { label: "Where You Can Put It", anywhere: "Indoor or outdoor, any level surface", barrel: "Outdoor only (deck/gravel/concrete)", nordica: "Indoor or outdoor", plunge: "Indoor or outdoor" },
  { label: "All-in Cost", anywhere: "$4,599", barrel: "$5,399–$7,000+", nordica: "~$4,949", plunge: "$11,089" },
];

const specRows: Row[] = [
  { label: "Exterior Dimensions", anywhere: "TBD", barrel: '72" × 72" × 78"', nordica: '54" × 52" × 82"', plunge: '52" × 57" × 94"' },
  { label: "Heated Space", anywhere: "57 cu ft", barrel: "147 cu ft", nordica: "93 cu ft", plunge: "161 cu ft" },
  { label: "Wood Type", anywhere: "Red Cedar", barrel: "Red Cedar", nordica: "Spruce", plunge: "Red Cedar" },
  { label: "Longevity", anywhere: "~30 years", barrel: "~30 years", nordica: "~15 years", plunge: "~30 years" },
  { label: "Heater Included", anywhere: "❌", barrel: "✅", nordica: "❌", plunge: "✅" },
  { label: "Compatible with SuperHotSuperFast Heater (shipping 2027)", anywhere: "✅", barrel: "❌", nordica: "❌", plunge: "❌" },
  { label: "Unit Cost", anywhere: "$4,599", barrel: "$4,399", nordica: "$3,999", plunge: "$9,590" },
  { label: "Shipping Cost", anywhere: "$0", barrel: "$0", nordica: "$950", plunge: "$499" },
  { label: "Electrician Cost", anywhere: "$0", barrel: "$1–3k", nordica: "$1–3k", plunge: "$1–3k" },
  { label: "Total Cost", anywhere: "$4,599", barrel: "$5,399+", nordica: "$5,949", plunge: "$11,089" },
];

const ComparisonBlock = ({ rows }: { rows: Row[] }) => (
  <div className="overflow-x-auto rounded-lg border border-border bg-card">
    <Table className="min-w-[800px]">
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-border">
          <TableHead className="w-[28%] text-foreground font-medium" />
          <TableHead className="text-center font-semibold text-foreground bg-accent/10">
            Anywhere Sauna
          </TableHead>
          <TableHead className="text-center font-medium text-muted-foreground">
            Barrel Sauna (Costco)
          </TableHead>
          <TableHead className="text-center font-medium text-muted-foreground">
            Nordica SaunaLife
          </TableHead>
          <TableHead className="text-center font-medium text-muted-foreground">
            Plunge Sauna Mini
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.label} className="hover:bg-transparent">
            <TableCell className="font-medium text-foreground align-middle">
              {row.label}
            </TableCell>
            <TableCell className="text-center text-foreground bg-accent/10 align-middle">
              {row.anywhere}
            </TableCell>
            <TableCell className="text-center text-muted-foreground align-middle">
              {row.barrel}
            </TableCell>
            <TableCell className="text-center text-muted-foreground align-middle">
              {row.nordica}
            </TableCell>
            <TableCell className="text-center text-muted-foreground align-middle">
              {row.plunge}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const ComparisonTable = () => {
  const [showSpecs, setShowSpecs] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-cedar-section">
      <div className="container mx-auto px-4 max-w-[960px]">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-3 text-heading text-center">
          Why The Anywhere Sauna?
        </h2>
        <p className="text-base md:text-lg text-muted-foreground text-center mb-2 max-w-2xl mx-auto">
          Most saunas require expensive electrical work. This one doesn't.
        </p>
        <p className="text-sm md:text-base text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          Compare the Anywhere Sauna to the other affordable saunas on the market
        </p>

        <ComparisonBlock rows={mainRows} />

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowSpecs((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            aria-expanded={showSpecs}
          >
            {showSpecs ? "Hide full comparison" : "See full comparison"}
            <ChevronDown size={16} className={cn("transition-transform", showSpecs && "rotate-180")} />
          </button>
        </div>

        {showSpecs && (
          <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <ComparisonBlock rows={specRows} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ComparisonTable;
