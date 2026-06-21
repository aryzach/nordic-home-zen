import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import anywhereVideo from "@/assets/anywhere-design.mp4.asset.json";

const features = [
  {
    title: "Up to 200°F in 60 minutes",
    detail: "The only sauna where a 120V stove can heat the sauna over 150°F.",
  },
  {
    title: "Standard home outlet",
    detail: "Skip the expensive electrical modification — just plug it in and start sweating.",
  },
  {
    title: "Hot stones, pour water",
    detail: "Traditional sauna heat that envelops your body.",
  },
  {
    title: "Move and setup easily",
    detail: "Installs in two hours, no foundation needed.",
  },
];

const AnywhereDesign = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text column - on mobile shows after video */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-heading mb-4">
              The Anywhere Design
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              Until now, all saunas have required home electrical modifications, making sauna installation complex and expensive.
            </p>

            <div className="border-t border-border/60">
              {features.map((f, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={f.title} className="border-b border-border/60">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm md:text-base font-heading font-semibold tracking-[0.08em] uppercase text-heading">
                        {f.title}
                      </span>
                      {isOpen ? (
                        <Minus className="shrink-0 text-heading" size={20} />
                      ) : (
                        <Plus className="shrink-0 text-heading" size={20} />
                      )}
                    </button>
                    {isOpen && (
                      <p className="pb-4 pr-8 text-sm md:text-base text-muted-foreground leading-relaxed">
                        {f.detail}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Video column */}
          <div className="order-1 md:order-2">
            <div className="overflow-hidden aspect-[4/5] md:aspect-[4/5] bg-muted">
              <video
                src={anywhereVideo.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnywhereDesign;
