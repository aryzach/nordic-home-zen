import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Cell = string;

const mainRows: { label: string; anywhere: Cell; barrel: Cell; nordica: Cell }[] = [
  { label: "Plug into Wall (120V)", anywhere: "✅ Yes", barrel: "❌ No (240V required)", nordica: "❌ No (240V required)" },
  { label: "Full Body Heat", anywhere: "✅ Yes", barrel: "❌ No (feet stay cold)", nordica: "✅ Yes" },
  { label: "Renter Friendly", anywhere: "✅ Yes", barrel: "❌ No", nordica: "❌ No" },
  { label: "Permits / Landlord Approval", anywhere: "✅ Not needed", barrel: "⚠️ Usually required", nordica: "⚠️ Usually required" },
  { label: "Setup Time", anywhere: "~2 hours", barrel: "~8 hours + electrician", nordica: "~8 hours + electrician" },
  { label: "Where You Can Put It", anywhere: "Indoor or outdoor, any level surface", barrel: "Outdoor only (deck/gravel/concrete)", nordica: "Indoor or outdoor" },
  { label: "All-in Cost", anywhere: "$4,599", barrel: "$5,399–$7,000+", nordica: "~$4,949" },
];

const specRows: { label: string; anywhere: Cell; barrel: Cell; nordica: Cell }[] = [
  { label: "Exterior Dimensions", anywhere: "TBD", barrel: '72" x 72" x 78"', nordica: '54" x 52" x 82"' },
  { label: "Heated Space", anywhere: "57 cu ft", barrel: "147 cu ft", nordica: "93 cu ft" },
  { label: "Wood Type", anywhere: "Red Cedar", barrel: "Red Cedar", nordica: "Spruce" },
  { label: "Longevity", anywhere: "~30 years", barrel: "~30 years", nordica: "~15 years" },
  { label: "Heater Included", anywhere: "❌ No", barrel: "✅ Yes", nordica: "❌ No" },
  { label: "Compatible with SuperHotSuperFast Heater", anywhere: "✅ Yes", barrel: "❌ No", nordica: "❌ No" },
];

const ComparisonTable = () => {
  const [showSpecs, setShowSpecs] = useState(false);

  const renderTable = (
    rows: { label: string; anywhere: Cell; barrel: Cell; nordica: Cell }[],
  ) => (
    <div className="min-w-[640px] grid grid-cols-[1.4fr_1fr_1fr_1fr]">
      {/* Header */}
      <div className="p-4 border-b border-border" />
      <div
        className={cn(
          "p-4 border-b border-border text-center font-medium text-foreground",
          "bg-accent/8 border-x border-t border-accent/40 rounded-t-lg",
        )}
      >
        Anywhere Sauna
      </div>
      <div className="p-4 border-b border-border text-center font-medium text-muted-foreground">
        Barrel Sauna (Costco)
      </div>
      <div className="p-4 border-b border-border text-center font-medium text-muted-foreground">
        Nordica SaunaLife
      </div>

      {/* Rows */}
      {rows.map((row, i) => {
        const last = i === rows.length - 1;
        return (
          <div key={row.label} className="contents">
            <div className={cn("p-4 font-medium text-foreground", !last && "border-b border-border/60")}>
              {row.label}
            </div>
            <div
              className={cn(
                "p-4 text-center text-sm text-foreground bg-accent/8 border-x border-accent/40",
                last && "rounded-b-lg border-b border-accent/40",
                !last && "border-b border-accent/20",
              )}
            >
              {row.anywhere}
            </div>
            <div className={cn("p-4 text-center text-sm text-muted-foreground", !last && "border-b border-border/60")}>
              {row.barrel}
            </div>
            <div className={cn("p-4 text-center text-sm text-muted-foreground", !last && "border-b border-border/60")}>
              {row.nordica}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-cedar-section">
      <div className="container mx-auto px-4 max-w-[960px]">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-3 text-heading text-center">
          Why The Anywhere Sauna?
        </h2>
        <p className="text-base md:text-lg text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          Most saunas require expensive electrical work. This one doesn't.
        </p>

        <div className="bg-card rounded-lg border border-border p-2 md:p-4 overflow-x-auto">
          {renderTable(mainRows)}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowSpecs((v) => !v)}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            aria-expanded={showSpecs}
          >
            {showSpecs ? "Hide full specs" : "See full specs"}
            <ChevronDown
              size={16}
              className={cn("transition-transform", showSpecs && "rotate-180")}
            />
          </button>
        </div>

        {showSpecs && (
          <div className="mt-6 bg-card rounded-lg border border-border p-2 md:p-4 overflow-x-auto animate-in fade-in slide-in-from-top-2 duration-300">
            {renderTable(specRows)}
          </div>
        )}
      </div>
    </section>
  );
};

export default ComparisonTable;
