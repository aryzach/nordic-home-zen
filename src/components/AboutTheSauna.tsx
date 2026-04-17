import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Spec = {
  label: string;
  value: React.ReactNode;
  helper?: string;
};

type SpecGroup = {
  title: string;
  specs: Spec[];
  highlight?: boolean;
};

const groups: SpecGroup[] = [
  {
    title: "Overview",
    specs: [
      { label: "Capacity", value: "2 person" },
      { label: "Max Temperature", value: "~194°F (legal limit dependent)" },
      { label: "Heat Type", value: "Traditional dry/steam sauna (electric heater)" },
    ],
  },
  {
    title: "Dimensions & Weight",
    specs: [
      { label: "Exterior Dimensions (with roof)", value: "63\" W × 49\" D × 92\" H" },
      { label: "Exterior Dimensions (without roof)", value: "51\" W × 46\" D × 87\" H" },
      { label: "Interior Dimensions", value: "45\" W × 42\" D × 61\" H" },
      { label: "Weight", value: "~320 lbs" },
    ],
  },
  {
    title: "Electrical & Power",
    highlight: true,
    specs: [
      {
        label: "Power Requirement",
        value: "Standard 120V outlet with 20A breaker",
        helper:
          "Book a free video consultation to confirm your setup — ~98% of homes and apartments already have what's needed.",
      },
      { label: "Plug Type", value: "NEMA 5-15 or 5-20 compatible" },
      { label: "Extension Cords", value: "Not recommended (if needed: 10 AWG, max 50 ft)" },
      { label: "Electrical Setup Needed", value: "None in most homes (~98% compatible)" },
      { label: "Pre-Install Check", value: "Free remote electrical consult available" },
    ],
  },
  {
    title: "Heater",
    specs: [
      {
        label: "Heater Included",
        value: "No",
        helper:
          "The sauna does not come with a heater — choose one that fits your budget from Amazon or any retailer. We can help you pick during a free video consultation.",
      },
      { label: "Maximum Heater Dimensions", value: "13″ × 22″ × 9″" },
      { label: "Recommended Power Range", value: "1.5kW – 2.0kW (for standard outlet use)" },
      {
        label: "Compatible with SuperHotSuperFast Heater",
        value: (
          <Link to="/superhotsuperfast" className="text-accent hover:underline">
            Yes
          </Link>
        ),
      },
      { label: "Heater Mount Compatibility", value: "Wall-mounted" },
      { label: "Heat-Up Time", value: "~40–60 minutes depending on ambient temperature" },
    ],
  },
  {
    title: "Materials & Build",
    specs: [
      { label: "Wood Type", value: "Red Cedar" },
      { label: "Interior Finish", value: "Smooth sanded, untreated" },
      { label: "Insulation", value: "High-temp PIR insulation" },
      { label: "Door Type", value: "Glass" },
    ],
  },
  {
    title: "Placement & Use",
    specs: [
      { label: "Indoor Use", value: "Yes" },
      { label: "Outdoor Use", value: "Yes" },
      { label: "Surface Requirements", value: "Any level surface" },
      { label: "Floor Requirements", value: "No special foundation required" },
    ],
  },
  {
    title: "Setup & Installation",
    specs: [
      { label: "Assembly Time", value: "~2 hours" },
      { label: "Tools Required", value: "Basic tools (screwdriver, drill recommended)" },
      { label: "Professional Installation", value: "Not required" },
      { label: "Movable After Assembly", value: "Yes (with disassembly)" },
    ],
  },
  {
    title: "Permits & Compliance",
    specs: [
      { label: "Permits Required", value: "No (in most residential settings)" },
      { label: "Landlord Approval", value: "Typically not required" },
    ],
  },
];

const advancedSpecs: Spec[] = [
  { label: "Interior Volume", value: "57 cu ft" },
  { label: "Energy Usage", value: "~1.5–2.0 kWh per hour" },
  { label: "Estimated Energy Cost", value: "$0.50 – $2 per use" },
  { label: "Shipping", value: "Flat-packed modular panels, fits through standard doorways" },
  { label: "Expected Lifespan", value: "~30 years with proper care" },
];

const SpecRow = ({ spec }: { spec: Spec }) => (
  <div className="py-4 border-b border-border/60 last:border-b-0">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-1 md:gap-8">
      <div className="text-sm md:text-base font-medium text-foreground">{spec.label}</div>
      <div className="text-sm md:text-base text-muted-foreground">{spec.value}</div>
    </div>
    {spec.helper && (
      <p className="mt-2 text-xs md:text-sm text-muted-foreground/80 italic md:pl-0 md:max-w-2xl">
        {spec.helper}
      </p>
    )}
  </div>
);

const GroupBlock = ({ group }: { group: SpecGroup }) => (
  <div
    className={
      group.highlight
        ? "rounded-lg border border-accent/40 bg-accent/5 p-6 md:p-8"
        : "py-2"
    }
  >
    <h3 className="text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-accent mb-4">
      {group.title}
    </h3>
    <div>
      {group.specs.map((spec) => (
        <SpecRow key={spec.label} spec={spec} />
      ))}
    </div>
  </div>
);

const AboutTheSauna = () => {
  return (
    <section id="about-the-sauna" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-[900px]">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-12 text-heading text-center">
          Specifications
        </h2>

        <div className="space-y-8 md:space-y-10">
          {groups.map((group) => (
            <GroupBlock key={group.title} group={group} />
          ))}
        </div>

        <div className="mt-10">
          <Accordion type="single" collapsible>
            <AccordionItem value="advanced" className="border-t border-b border-border">
              <AccordionTrigger className="text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-accent hover:no-underline">
                Advanced Specs
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-2">
                  {advancedSpecs.map((spec) => (
                    <SpecRow key={spec.label} spec={spec} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default AboutTheSauna;
