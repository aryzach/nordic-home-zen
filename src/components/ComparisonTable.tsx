import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Cell = string | "yes" | "no" | "yes-anywhere";
type Row = { label: string; anywhere: Cell; nordica: Cell; barrel: Cell; plunge: Cell };

const summaryRows: Row[] = [
  { label: "Standard Outlet (120V, 20A)", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no" },
  { label: "Renter Friendly", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no" },
  { label: "Traditional Finnish Temps (~176°F)", anywhere: "yes-anywhere", nordica: "yes", barrel: "yes", plunge: "yes" },
  { label: "No Electrician Required", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no" },
  { label: "All-in Cost", anywhere: "$4,799", nordica: "$6,149+", barrel: "$5,399+", plunge: "$11,089+" },
];

const fullRows: Row[] = [
  { label: "Traditional Finnish Temps (~176°F)", anywhere: "yes-anywhere", nordica: "yes", barrel: "yes", plunge: "yes" },
  { label: "Standard Outlet (120V, 20A circuit breaker)", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no" },
  { label: "Full Body Heat (incl. legs and feet)", anywhere: "yes-anywhere", nordica: "yes", barrel: "no", plunge: "yes" },
  { label: "Renter Friendly", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no" },
  { label: "Install Without Permits or Landlord Approval", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no" },
  { label: "Works on Any Level Surface (No Site Prep)", anywhere: "yes-anywhere", nordica: "yes", barrel: "no", plunge: "no" },
  { label: "No Electrician Required", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no" },
  { label: "Setup Time", anywhere: "~2 hours", nordica: "~8 hours", barrel: "~8 hours", plunge: "~2 hours" },
  { label: "Exterior Dimensions", anywhere: "TBD", nordica: '54" × 52" × 82"', barrel: '72" × 72" × 78"', plunge: '52" × 57" × 94"' },
  { label: "Heated Space", anywhere: "57 cu ft", nordica: "93 cu ft", barrel: "147 cu ft", plunge: "161 cu ft" },
  { label: "Wood Type", anywhere: "Red Cedar", nordica: "Spruce", barrel: "Red Cedar", plunge: "Red Cedar" },
  { label: "Longevity", anywhere: "~30 years", nordica: "~15 years", barrel: "~30 years", plunge: "~30 years" },
  { label: "Heater Included", anywhere: "no", nordica: "no", barrel: "yes", plunge: "yes" },
  { label: "Compatible with SuperHotSuperFast Heater (shipping 2027)", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no" },
  { label: "Unit Cost", anywhere: "$4,599", nordica: "$3,999", barrel: "$4,399", plunge: "$9,590" },
  { label: "Heater Cost", anywhere: "$200 – $900", nordica: "$200 – $900", barrel: "$0", plunge: "$0" },
  { label: "Shipping Cost", anywhere: "$0", nordica: "$950", barrel: "$0", plunge: "$499" },
  { label: "Electrician Cost", anywhere: "$0", nordica: "$1–3k", barrel: "$1–3k", plunge: "$1–3k" },
  { label: "All-in Cost", anywhere: "$4,799", nordica: "$6,149+", barrel: "$5,399+", plunge: "$11,089+" },
];

const renderCell = (value: Cell, highlight = false) => {
  if (value === "yes-anywhere") {
    return <Check size={18} className="inline text-[hsl(140_45%_38%)]" strokeWidth={2.5} />;
  }
  if (value === "yes") {
    return <Check size={18} className="inline text-foreground/70" strokeWidth={2} />;
  }
  if (value === "no") {
    return <span className="text-muted-foreground/60 text-lg">—</span>;
  }
  return <span className={highlight ? "text-foreground" : "text-muted-foreground"}>{value}</span>;
};

const ComparisonBlock = ({ rows }: { rows: Row[] }) => (
  <div className="overflow-x-auto rounded-2xl border border-border bg-card">
    <Table className="min-w-[800px]">
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-border">
          <TableHead className="w-[28%] text-foreground font-medium" />
          <TableHead className="text-center font-semibold text-foreground bg-[hsl(33_40%_92%)]">
            Anywhere Sauna
          </TableHead>
          <TableHead className="text-center font-medium text-muted-foreground">
            Nordica SaunaLife
          </TableHead>
          <TableHead className="text-center font-medium text-muted-foreground">
            Barrel Sauna (Costco)
          </TableHead>
          <TableHead className="text-center font-medium text-muted-foreground">
            Plunge Sauna Mini
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, idx) => (
          <TableRow
            key={row.label}
            className={cn(
              "hover:bg-transparent border-0",
              idx !== rows.length - 1 && "border-b border-border/50"
            )}
          >
            <TableCell className="font-medium text-foreground align-middle">
              {row.label}
            </TableCell>
            <TableCell className="text-center align-middle bg-[hsl(33_40%_92%)]">
              {renderCell(row.anywhere, true)}
            </TableCell>
            <TableCell className="text-center align-middle">{renderCell(row.nordica)}</TableCell>
            <TableCell className="text-center align-middle">{renderCell(row.barrel)}</TableCell>
            <TableCell className="text-center align-middle">{renderCell(row.plunge)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const ComparisonTable = () => {
  const [showFull, setShowFull] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-cedar-section">
      <div className="container mx-auto px-4 max-w-[960px]">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4 text-heading text-center">
          Why The Anywhere Sauna?
        </h2>
        <p className="text-base md:text-lg text-muted-foreground text-center mb-2 max-w-2xl mx-auto leading-relaxed">
          Other saunas require expensive electrical work. This one doesn't.
        </p>
        <p className="text-base md:text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          Compare the Anywhere Sauna to the other affordable steam saunas on the market.
        </p>

        <ComparisonBlock rows={summaryRows} />

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowFull((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            aria-expanded={showFull}
          >
            {showFull ? "Hide full comparison" : "See full comparison"}
            <ChevronDown size={16} className={cn("transition-transform", showFull && "rotate-180")} />
          </button>
        </div>

        {showFull && (
          <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <ComparisonBlock rows={fullRows} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ComparisonTable;
