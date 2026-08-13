import { useState } from "react";
import { Link } from "react-router-dom";
import { Plug, Users, Flame, Home, ExternalLink } from "lucide-react";
import { trackAndNavigate } from "@/lib/analytics";
import { openBookingUrl } from "@/lib/booking";
import saunaVideoAsset from "@/assets/sauna-video.mp4.asset.json";

const anywhereVideoUrl = saunaVideoAsset.url;
const STRIPE_DEPOSIT_URL = "https://buy.stripe.com/8x214ngCrbJA1G451x6Vq0B";

type GalleryItem =
  | { type: "video"; src: string; alt: string }
  | { type: "image"; src: string; alt: string; fit?: "contain" | "cover" };

const gallery: GalleryItem[] = [
  { type: "video", src: anywhereVideoUrl, alt: "Anywhere Sauna design video" },
  { type: "image", src: "/installs/specs-1.jpg", alt: "Anywhere Sauna exterior in a backyard", fit: "contain" },
  { type: "image", src: "/installs/specs-2.jpg", alt: "Anywhere Sauna installed", fit: "contain" },
  { type: "image", src: "/assets/about-sauna-1.jpeg", alt: "Anywhere Sauna interior with heater", fit: "cover" },
  { type: "image", src: "/assets/about-sauna-2.jpeg", alt: "Anywhere Sauna cedar bench detail", fit: "cover" },
  { type: "image", src: "/assets/about-sauna-3.jpeg", alt: "Anywhere Sauna interior thermometer", fit: "cover" },
];

const benefits = [
  { Icon: Plug, label: "Runs on a standard 110/120V outlet" },
  { Icon: Users, label: "Comfortably fits two people" },
  { Icon: Flame, label: "Reaches up to ~230°F" },
  { Icon: Home, label: "Designed for indoor or outdoor use" },
];

const ProductHero = () => {
  const [active, setActive] = useState(0);
  const current = gallery[active];

  const handleReserveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackAndNavigate(
      "deposit_checkout_started",
      { location: "specs_page", amount: 500, currency: "USD" },
      () => {
        window.open(STRIPE_DEPOSIT_URL, "_blank", "noopener,noreferrer");
      }
    );
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-20">
          {/* Gallery */}
          <div>
            <div className="aspect-square w-full bg-[#f5f5f5] overflow-hidden">
              {current.type === "video" ? (
                <video
                  key={current.src}
                  src={current.src}
                  className="w-full h-full object-contain"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  aria-label={current.alt}
                />

              ) : (
                <img
                  src={current.src}
                  alt={current.alt}
                  className={`w-full h-full ${current.fit === "contain" ? "object-contain" : "object-cover"}`}
                />
              )}
            </div>
            <div className="mt-3 grid grid-cols-6 gap-2">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View media ${i + 1}`}
                  className={`relative aspect-square overflow-hidden bg-[#f5f5f5] border ${
                    active === i ? "border-[#1c1d1d]" : "border-[#e8e8e1]"
                  }`}
                >
                  {g.type === "video" ? (
                    <>
                      <video
                        src={g.src}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="block w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white" />
                      </span>
                    </>
                  ) : (
                    <img src={g.src} alt={g.alt} className="w-full h-full object-cover" />
                  )}
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
            <p className="text-[20px] font-bold tracking-[0.025em] text-[#1c1d1d] mb-1">
              $6,500
            </p>
            <p className="text-[13px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d]/70 mb-4">
              + $950 shipping
            </p>
            <p className="text-[14px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d] mb-6">
              The only traditional sauna designed to run on a standard home outlet.
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
              <a
                href={STRIPE_DEPOSIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleReserveClick}
                className="group inline-flex items-center justify-center gap-2 w-full bg-[#111111] text-white text-center font-bold text-[16px] tracking-[0.025em] mb-2 px-5 py-[11px] hover:bg-black transition-colors"
              >
                Reserve With $500 Refundable Deposit
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
              <p className="text-[13px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d]/70 mb-3">
                Heater and installation not included.{" "}
                <Link to="/terms" className="underline hover:no-underline font-medium text-[#1c1d1d]">
                  Terms
                </Link>
              </p>
              <button
                type="button"
                onClick={() =>
                  trackAndNavigate(
                    "consultation_booking_click",
                    { button_text: "Book Free Consultation", location: "product_page" },
                    openBookingUrl
                  )
                }
                className="group inline-flex items-center justify-center gap-2 w-full border border-[#111111] text-[#111111] text-center font-bold text-[16px] tracking-[0.025em] mb-2.5 px-5 py-[11px] hover:bg-[#111] hover:text-white transition-colors"
              >
                Book Free Consultation
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
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
