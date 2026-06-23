import { useState } from "react";
import { Link } from "react-router-dom";
import { Plug, Users, Flame, Home, ExternalLink } from "lucide-react";
import { trackAndNavigate } from "@/lib/analytics";
import { openBookingUrl } from "@/lib/booking";

const gallery = [
  { src: "/installs/specs-1.jpg", alt: "Anywhere Sauna exterior in a backyard" },
  { src: "/installs/specs-2.jpg", alt: "Anywhere Sauna installed" },
  { src: "/assets/about-sauna-1.jpeg", alt: "Anywhere Sauna interior with heater" },
  { src: "/assets/about-sauna-2.jpeg", alt: "Anywhere Sauna cedar bench detail" },
  { src: "/assets/about-sauna-3.jpeg", alt: "Anywhere Sauna interior thermometer" },
];

const benefits = [
  { Icon: Plug, label: "Runs on a standard 110/120V outlet" },
  { Icon: Users, label: "Comfortably fits two people" },
  { Icon: Flame, label: "Reaches up to ~200°F" },
  { Icon: Home, label: "Designed for indoor or outdoor use" },
];

const ProductHero = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-20">
          {/* Gallery */}
          <div>
            <div className="aspect-square w-full bg-[#f5f5f5] overflow-hidden">
              <img
                src={gallery[active].src}
                alt={gallery[active].alt}
                className={`w-full h-full ${active < 2 ? "object-contain" : "object-cover"}`}
              />
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`aspect-square overflow-hidden bg-[#f5f5f5] border ${
                    active === i ? "border-[#1c1d1d]" : "border-[#e8e8e1]"
                  }`}
                >
                  <img src={g.src} alt={g.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:pt-2">
            <h1
              className="font-bold text-[#1c1d1d] mb-1.5 md:mb-2.5"
              style={{ fontSize: "clamp(22px, 4vw, 28px)", lineHeight: 1.2, letterSpacing: 0 }}
            >
              Anywhere Sauna
            </h1>
            <p className="text-[14px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d] mb-6">
              The only steam sauna designed to run on a standard home outlet — no electrician, no permits, no rewiring.
            </p>

            <ul className="border-y border-[#e8e8e1] divide-y divide-[#e8e8e1] mb-6">
              {benefits.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 py-3 text-[14px] tracking-[0.025em] text-[#1c1d1d]"
                >
                  <Icon size={18} strokeWidth={1.6} className="shrink-0" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col">
              <Link
                to="/deposit"
                className="group block w-full bg-[#111111] text-white text-center font-bold text-[16px] tracking-[0.025em] mb-2.5 px-5 py-[11px] hover:bg-black transition-colors"
              >
                Reserve With $500 Refundable Deposit
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <button
                type="button"
                onClick={() =>
                  trackAndNavigate(
                    "consultation_booking_click",
                    { button_text: "Book Free Consultation", location: "product_page" },
                    openBookingUrl
                  )
                }
                className="group block w-full border border-[#111111] text-[#111111] text-center font-bold text-[16px] tracking-[0.025em] mb-2.5 px-5 py-[11px] hover:bg-[#111] hover:text-white transition-colors"
              >
                Book Free Consultation
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>

            <Link
              to="/faq"
              className="block mt-2 text-[13px] tracking-[0.025em] text-[#1c1d1d] underline underline-offset-4 hover:no-underline"
            >
              Will this work in my home? Read the FAQ →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
