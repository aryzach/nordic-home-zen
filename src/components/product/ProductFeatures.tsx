import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import heaterImg from "@/assets/finnishheater.png";
import { trackAndNavigate } from "@/lib/analytics";
import { openBookingUrl } from "@/lib/booking";

type Feature = {
  eyebrow: string;
  heading: string;
  body: string;
  image?: string;
  alt?: string;
  cta?: { label: string; to?: string; bookConsultation?: boolean };
  reverse?: boolean;
};

const features: Feature[] = [
  {
    eyebrow: "Standard Outlet",
    heading: "Plug it in. Heat it up.",
    body:
      "Every other steam sauna assumes a 240V line and an electrician on the way. The Anywhere Sauna was engineered around the outlet you already have — so ~97% of homes and apartments are compatible on day one. No permits. No rewiring. No landlord conversation.",
    image: "/installs/specs-outlet.png",
    alt: "Standard 110/120V three-prong outlet",
    cta: { label: "Check my outlet", bookConsultation: true },
  },
  {
    eyebrow: "Indoor or Outdoor",
    heading: "Built for the space you actually have.",
    body:
      "A 63\" × 49\" footprint that fits a spare room, a garage corner, a backyard, or even a studio apartment. Sits on any level surface, requires no foundation, and moves with you if you move.",
    reverse: true,
  },
  {
    eyebrow: "Real Steam",
    heading: "A real heater. Real stones. Real löyly.",
    body:
      "This is a traditional steam sauna — not infrared. An electric heater, sauna stones, and water you pour yourself. Smaller air volume and high-temp PIR insulation are what let it hit ~200°F on a standard outlet.",
    image: heaterImg,
    alt: "Sauna heater with stones",
  },
];

const Row = ({ feature }: { feature: Feature }) => {
  const hasImage = Boolean(feature.image);
  return (
    <div
      className={
        hasImage
          ? "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          : "max-w-[680px] mx-auto text-center"
      }
    >
      {hasImage && (
        <div className={feature.reverse ? "lg:order-2" : ""}>
          <div className="aspect-[4/3] w-full bg-[#f5f5f5] overflow-hidden">
            <img
              src={feature.image}
              alt={feature.alt}
              className={`w-full h-full ${feature.eyebrow === "Standard Outlet" ? "object-contain" : "object-cover"}`}
              loading="lazy"
            />
          </div>
        </div>
      )}
      <div className={hasImage && feature.reverse ? "lg:order-1" : ""}>
        <p className="uppercase text-[12px] font-bold tracking-[0.18em] text-[#1c1d1d]/70 mb-3">
          {feature.eyebrow}
        </p>
        <h2
          className="font-bold text-[#1c1d1d] mb-3"
          style={{ fontSize: "clamp(22px, 3vw, 28px)", lineHeight: 1.2, letterSpacing: 0 }}
        >
          {feature.heading}
        </h2>
        <p className={`text-[14px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d] ${hasImage ? "max-w-[52ch]" : "mx-auto"}`}>
          {feature.body}
        </p>
        {feature.cta && (
          feature.cta.bookConsultation ? (
            <button
              type="button"
              onClick={() =>
                trackAndNavigate(
                  "consultation_booking_click",
                  { button_text: feature.cta!.label, location: "product_features_outlet" },
                  openBookingUrl
                )
              }
              className="group inline-block mt-5 text-[13px] font-bold tracking-[0.18em] uppercase text-[#111] border-b border-[#111] pb-1 hover:opacity-70 transition-opacity"
            >
              {feature.cta.label}
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
          ) : (
            <Link
              to={feature.cta.to!}
              className="group inline-block mt-5 text-[13px] font-bold tracking-[0.18em] uppercase text-[#111] border-b border-[#111] pb-1 hover:opacity-70 transition-opacity"
            >
              {feature.cta.label}
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

const ProductFeatures = () => (
  <section className="bg-white">
    <div className="mx-auto max-w-[1320px] px-5 md:px-10 py-10 md:py-16 space-y-14 md:space-y-20">
      {features.map((f) => (
        <Row key={f.heading} feature={f} />
      ))}
    </div>
  </section>
);

export default ProductFeatures;
