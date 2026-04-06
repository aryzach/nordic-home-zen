import { Check, X } from "lucide-react";

const rows = [
  { label: "Electrical", theirs: "240V install", ours: "Standard outlet" },
  { label: "Setup", theirs: "Electrician + permits", ours: "Plug + play" },
  { label: "Portability", theirs: "Permanent", ours: "Movable" },
  { label: "Timeline", theirs: "3–6 week setup", ours: "Same-day use" },
  { label: "Pricing", theirs: "Thousands in hidden costs", ours: "All-in pricing" },
];

const ComparisonTable = () => {
  return (
    <section className="py-16 md:py-24 bg-cedar-section">
      <div className="container mx-auto px-4 max-w-[800px]">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-12 text-heading text-center">
          Why The Anywhere Sauna?
        </h2>
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
            <div className="p-4" />
            <div className="p-4 text-center font-medium text-muted-foreground">Other Saunas</div>
            <div className="p-4 text-center font-medium text-accent">Our Sauna</div>
          </div>
          {/* Rows */}
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-3 border-b border-border last:border-b-0">
              <div className="p-4 font-medium text-foreground">{row.label}</div>
              <div className="p-4 text-center text-muted-foreground flex items-center justify-center gap-2">
                <X className="text-destructive flex-shrink-0" size={16} />
                <span className="text-sm">{row.theirs}</span>
              </div>
              <div className="p-4 text-center text-foreground flex items-center justify-center gap-2">
                <Check className="text-accent flex-shrink-0" size={16} />
                <span className="text-sm font-medium">{row.ours}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
