import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import standardOutlet from "@/assets/standard-outlet.png";
import saunaPhoto1 from "@/assets/sauna-exterior-front.png";
import saunaPhoto2 from "@/assets/sauna-interior-back.png";
import saunaPhoto3 from "@/assets/sauna-interior-floor.png";

const aboutPhotos = [
  { src: saunaPhoto1, alt: "Anywhere Sauna exterior front view with glass door" },
  { src: saunaPhoto2, alt: "Anywhere Sauna interior back wall with cedar paneling" },
  { src: saunaPhoto3, alt: "Anywhere Sauna interior floor and bench view" },
];

type Spec = {
  label: string;
  value: React.ReactNode;
  helper?: React.ReactNode;
};

type SpecGroup = {
  title: string;
  specs: Spec[];
  highlight?: boolean;
};

const overviewGroup: SpecGroup = {
  title: "Overview",
  highlight: true,
  specs: [
    { label: "Capacity", value: "2 person" },
    { label: "Max Temperature", value: "~194°F (legal limit dependent)" },
    { label: "Heat Type", value: "Traditional dry/steam sauna (electric heater)" },
    {
      label: "Power Requirement",
      value: "Standard 120V outlet with 20A breaker",
      helper: (
        <>
          Book a free video consultation to confirm your setup
          <br />
          ~98% of homes and apartments already have what's needed.
          <br />
          <Link to="/electric-checklist" className="text-accent hover:underline not-italic font-medium">
            Book Free Electrical Consult
          </Link>
        </>
      ),
    },
  ],
};

const moreGroups: SpecGroup[] = [
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
    specs: [
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
        helper: (
          <>
            The sauna does not come with a heater. There are a few options that range from $200 - $900. We can help you pick during the free video electrical consultation.{" "}
            <Link to="/electric-checklist" className="text-accent hover:underline not-italic font-medium">
              Click here to schedule a free electrical consultation
            </Link>
            .
          </>
        ),
      },
      { label: "Maximum Heater Dimensions", value: "13″ × 22″ × 9″" },
      { label: "Recommended Power Range", value: "1.8kW – 2.0kW (for standard outlet use)" },
      {
        label: "Compatible with SuperHotSuperFast Heater",
        value: (
          <Link to="/superhotsuperfast" className="text-accent hover:underline">
            Yes (shipping 2027)
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
  {
    title: "Advanced Specs",
    specs: [
      { label: "Interior Volume", value: "57 cu ft" },
      { label: "Energy Usage", value: "~1.5–2.0 kWh per hour" },
      { label: "Estimated Energy Cost", value: "$0.50 – $2 per use" },
      { label: "Shipping", value: "Flat-packed modular panels, fits through standard doorways" },
      { label: "Expected Lifespan", value: "~30 years with proper care" },
    ],
  },
];

const SpecRow = ({ spec }: { spec: Spec }) => (
  <div className="py-1.5 border-b border-border/50 last:border-b-0">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-0.5 md:gap-6">
      <div className="text-sm font-medium text-foreground">{spec.label}</div>
      <div className="text-sm text-muted-foreground">{spec.value}</div>
    </div>
    {spec.helper && (
      <div className="mt-1 text-xs text-muted-foreground/80 italic md:max-w-2xl">
        {spec.helper}
      </div>
    )}
  </div>
);

const GroupBlock = ({ group }: { group: SpecGroup }) => (
  <div
    className={
      group.highlight
        ? "rounded-lg border border-accent/40 bg-accent/5 px-4 py-3 md:px-5 md:py-4"
        : ""
    }
  >
    <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-1">
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
    <section id="about-the-sauna" className="pt-0 pb-8 md:pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-[900px]">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-8 text-heading text-center">
          About the Anywhere Sauna
        </h2>

        {/* Image placeholders + outlet photo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {aboutPhotos.map((photo, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg overflow-hidden border border-border bg-muted"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
          <div className="aspect-square rounded-lg overflow-hidden border border-border bg-muted">
            <img
              src={standardOutlet}
              alt="Standard 120V wall outlet — what's needed to power the Anywhere Sauna"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Schematic placeholder */}
        <div className="bg-muted rounded-lg p-8 mb-8 flex items-center justify-center min-h-[260px] border border-border">
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-medium mb-2">Sauna Schematic — Placeholder</p>
            <p className="text-sm">Detailed measurements coming soon</p>
          </div>
        </div>

        <GroupBlock group={overviewGroup} />

        <div className="mt-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="more" className="border-t border-b border-border">
              <AccordionTrigger className="text-xs font-semibold tracking-[0.15em] uppercase text-accent hover:no-underline py-3">
                More Specs
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  {moreGroups.map((group) => (
                    <GroupBlock key={group.title} group={group} />
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
