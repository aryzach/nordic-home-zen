import { useState } from "react";
import { Check, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackAndNavigate } from "@/lib/analytics";
import { openBookingUrl } from "@/lib/booking";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const nordicaImg = { url: "/images/compare-nordica.png" };
const barrelImg = { url: "/images/compare-barrel.png" };
const plungeImg = { url: "/images/compare-plunge.png" };
const infraredImg = { url: "/images/compare-infrared.png" };

type Cell = string | "yes" | "no" | "yes-anywhere";
type Row = {
  label: string;
  anywhere: Cell;
  nordica: Cell;
  barrel: Cell;
  plunge: Cell;
  infrared: Cell;
};

const summaryRows: Row[] = [
  { label: "Standard Outlet (110/120V, 20A)", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no", infrared: "yes" },
  { label: "Renter Friendly", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no", infrared: "yes" },
  { label: "Traditional Finnish Temps (~176°F)", anywhere: "yes-anywhere", nordica: "yes", barrel: "yes", plunge: "yes", infrared: "no" },
  { label: "No Electrician Required", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no", infrared: "yes" },
  { label: "All-in Cost", anywhere: "$4,799", nordica: "$6,149+", barrel: "$5,399+", plunge: "$11,089+", infrared: "$2,299+" },
];

const fullRows: Row[] = [
  { label: "Traditional Finnish Temps (~176°F)", anywhere: "yes-anywhere", nordica: "yes", barrel: "yes", plunge: "yes", infrared: "no" },
  { label: "Standard Outlet (110/120V, 20A circuit breaker)", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no", infrared: "yes" },
  { label: "Full Body Heat (incl. legs and feet)", anywhere: "yes-anywhere", nordica: "yes", barrel: "no", plunge: "yes", infrared: "yes" },
  { label: "Renter Friendly", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no", infrared: "yes" },
  { label: "Install Without Permits or Landlord Approval", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no", infrared: "yes" },
  { label: "Works on Any Level Surface (No Site Prep)", anywhere: "yes-anywhere", nordica: "yes", barrel: "no", plunge: "no", infrared: "yes" },
  { label: "No Electrician Required", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no", infrared: "yes" },
  { label: "Setup Time", anywhere: "~2 hours", nordica: "~8 hours", barrel: "~8 hours", plunge: "~2 hours", infrared: "~2 hours" },
  { label: "Exterior Dimensions", anywhere: '63" × 49" × 92"', nordica: '54" × 52" × 82"', barrel: '72" × 72" × 78"', plunge: '52" × 57" × 94"', infrared: '48" × 42" × 75"' },
  { label: "Heated Space", anywhere: "57 cu ft", nordica: "93 cu ft", barrel: "147 cu ft", plunge: "161 cu ft", infrared: "65 cu ft" },
  { label: "Wood Type", anywhere: "Red Cedar", nordica: "Spruce", barrel: "Red Cedar", plunge: "Red Cedar", infrared: "Various" },
  { label: "Longevity", anywhere: "~30 years", nordica: "~15 years", barrel: "~30 years", plunge: "~30 years", infrared: "Various" },
  { label: "Heater Included", anywhere: "no", nordica: "no", barrel: "yes", plunge: "yes", infrared: "yes" },
  { label: "Compatible with Heater Inferno (shipping 2027)", anywhere: "yes-anywhere", nordica: "no", barrel: "no", plunge: "no", infrared: "no" },
  { label: "Unit Cost", anywhere: "$3,649", nordica: "$3,999", barrel: "$4,399", plunge: "$9,590", infrared: "$2,299+" },
  { label: "Heater Cost", anywhere: "$200 – $900", nordica: "$200 – $900", barrel: "$0", plunge: "$0", infrared: "$0" },
  { label: "Shipping Cost", anywhere: "$950", nordica: "$950", barrel: "$0", plunge: "$499", infrared: "Various" },
  { label: "Electrician Cost", anywhere: "$0", nordica: "$1–3k", barrel: "$1–3k", plunge: "$1–3k", infrared: "$0" },
  { label: "All-in Cost", anywhere: "$4,799", nordica: "$6,149+", barrel: "$5,399+", plunge: "$11,089+", infrared: "$2,299+" },
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

const HeaderImage = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    className="mx-auto mb-2 h-20 w-full max-w-[140px] object-contain bg-[#f5f5f5]"
  />
);

const ComparisonBlock = ({ rows }: { rows: Row[] }) => (
  <div className="overflow-x-auto rounded-2xl border border-border bg-card">
    <Table className="min-w-[960px]">
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-border">
          <TableHead className="w-[24%] text-foreground font-medium" />
          <TableHead className="text-center font-semibold text-foreground bg-[hsl(33_40%_92%)] align-bottom">
            <HeaderImage src="/images/sauna-type-anywhere.jpg" alt="Anywhere Sauna" />
            Anywhere Sauna
          </TableHead>
          <TableHead className="text-center font-medium text-muted-foreground align-bottom">
            <HeaderImage src={nordicaImg.url} alt="Nordica SaunaLife" />
            Nordica SaunaLife
          </TableHead>
          <TableHead className="text-center font-medium text-muted-foreground align-bottom">
            <HeaderImage src={barrelImg.url} alt="Barrel Sauna (Costco)" />
            Barrel Sauna (Costco)
          </TableHead>
          <TableHead className="text-center font-medium text-muted-foreground align-bottom">
            <HeaderImage src={plungeImg.url} alt="Plunge Sauna Mini" />
            Plunge Sauna Mini
          </TableHead>
          <TableHead className="text-center font-medium text-muted-foreground align-bottom">
            <HeaderImage src={infraredImg.url} alt="Infrared Sauna" />
            Infrared Sauna
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
            <TableCell className="text-center align-middle">{renderCell(row.infrared)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const Compare = () => {
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-16 md:py-24 bg-cedar-section">
          <div className="container mx-auto px-4 max-w-[1100px]">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4 text-heading text-center">
              Why The Anywhere Sauna?
            </h2>
            <p className="text-center text-muted-foreground mb-2 max-w-2xl mx-auto leading-relaxed">
              Other saunas require expensive electrical work. This one doesn't.
            </p>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Compare the Anywhere Sauna to the other affordable steam saunas on the market.
            </p>

            <ComparisonBlock rows={summaryRows} />

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setShowFull((v) => !v)}
                className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-black/80 transition-colors"
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

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="border border-border rounded-2xl p-8 md:p-12 text-center bg-card">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-3 text-heading">
                Still unsure which sauna is right for you?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto leading-relaxed">
                Book a free 30-minute consultation and we'll review your space, electrical setup, and goals together.
              </p>
              <button
                type="button"
                onClick={() =>
                  trackAndNavigate(
                    "consultation_booking_click",
                    { button_text: "Book Free Consultation", location: "compare_page_bottom" },
                    openBookingUrl
                  )
                }
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Book Free Consultation
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Compare;
