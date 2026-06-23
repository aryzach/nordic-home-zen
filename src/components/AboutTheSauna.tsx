import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";
import standardOutlet from "@/assets/standard-outlet.png";
import ImageLightbox from "./ImageLightbox";
import { trackEvent } from "@/lib/analytics";
import { BOOKING_URL } from "@/lib/booking";

const trackSpecsBooking = (button_text: string) =>
  trackEvent("consultation_booking_click", { button_text, location: "about_the_sauna_specs" });

const aboutPhotos = [
  { src: "/assets/about-sauna-1.jpeg", alt: "Anywhere Sauna interior with heater and open door view" },
  { src: "/assets/about-sauna-2.jpeg", alt: "Anywhere Sauna cedar interior bench detail" },
  { src: "/assets/about-sauna-3.jpeg", alt: "Anywhere Sauna interior wall with thermometer" },
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
    { label: "Max Temperature", value: "~200°F (legal limit dependent)" },
    { label: "Heat Type", value: "Traditional dry/steam sauna (electric heater)" },
    {
      label: "Power Requirement",
      value: "Standard 110/120V outlet with 20A breaker",
      helper: (
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackSpecsBooking("Book Free Consultation")}
          className="underline text-[#1c1d1d] hover:no-underline not-italic font-medium inline-flex items-baseline gap-1"
        >
          Book Free Consultation
          <ExternalLink className="w-3 h-3 self-center" aria-hidden="true" />
        </a>
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
      { label: "Electrical Setup Needed", value: "None in most homes (~97% compatible)" },
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
            The sauna does not come with a heater. There are a few options that range from $200 - $900. We can help you pick during the consultation.{" "}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSpecsBooking("Book Free Consultation")}
              className="underline text-[#1c1d1d] hover:no-underline not-italic font-medium"
            >
              Book Free Consultation
            </a>
            .
          </>
        ),
      },
      { label: "Maximum Heater Dimensions", value: "13″ × 22″ × 9″" },
      { label: "Recommended Power Range", value: "1.8kW – 2.0kW (for standard outlet use)" },
      {
        label: "Compatible with HeaterInferno Heater",
        value: (
          <Link to="/heater-inferno" className="text-accent hover:underline">
            Yes (shipping 2027)
          </Link>
        ),
      },
      { label: "Heater Mount Compatibility", value: "Wall-mounted" },
      { label: "Heat-Up Time", value: "~40–60 minutes depending on ambient temperature" },
      { label: "Sauna Heater Stones", value: "Any stones made for sauna, available on Amazon" },
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

const SpecRow = ({ spec, alt }: { spec: Spec; alt: boolean }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-1 md:gap-7 px-5 md:px-7 py-4 md:py-[18px] border-b border-[#e8e8e1] last:border-b-0 ${
      alt ? "bg-[#f5f5f5]" : "bg-white"
    }`}
  >
    <div className="text-[14px] font-bold tracking-[0.025em] text-[#1c1d1d]">{spec.label}</div>
    <div>
      <div className="text-[14px] font-normal leading-[1.6] tracking-[0.025em] text-[#1c1d1d]">
        {spec.value}
      </div>
      {spec.helper && (
        <div className="mt-1.5 text-[13px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d]/70">
          {spec.helper}
        </div>
      )}
    </div>
  </div>
);

const GroupBlock = ({ group }: { group: SpecGroup }) => (
  <div className="border border-[#e8e8e1]">
    <h3 className="px-5 md:px-7 py-3 text-[12px] font-bold tracking-[0.18em] uppercase text-[#1c1d1d] border-b border-[#e8e8e1] bg-white">
      {group.title}
    </h3>
    <div>
      {group.specs.map((spec, i) => (
        <SpecRow key={spec.label} spec={spec} alt={i % 2 === 1} />
      ))}
    </div>
  </div>
);

const AboutTheSauna = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  return (
    <section id="about-the-sauna" className="bg-white">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10 py-10 md:py-16">
        <p className="uppercase text-[12px] font-bold tracking-[0.18em] text-[#1c1d1d]/70 mb-3 text-center">
          Specifications
        </p>
        <h2
          className="font-bold text-[#1c1d1d] mb-8 md:mb-10 text-center"
          style={{ fontSize: "clamp(22px, 3vw, 28px)", lineHeight: 1.2, letterSpacing: 0 }}
        >
          About the Anywhere Sauna
        </h2>


        <GroupBlock group={overviewGroup} />

        <div className="mt-4">
          <Accordion type="single" collapsible>
            <AccordionItem value="more" className="border-t border-b border-[#e8e8e1]">
              <AccordionTrigger className="text-[12px] font-bold tracking-[0.18em] uppercase text-[#1c1d1d] hover:no-underline py-4 px-1">
                More Specs
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-5 pt-2 pb-2">
                  {moreGroups.map((group) => (
                    <GroupBlock key={group.title} group={group} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <ImageLightbox images={aboutPhotos} open={lightboxOpen} startIndex={startIndex} onOpenChange={setLightboxOpen} />
    </section>
  );
};

export default AboutTheSauna;

