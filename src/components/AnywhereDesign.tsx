import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const anywhereVideoUrl = `${import.meta.env.BASE_URL}anywhere-design.mp4`;

const features = [
  {
    eyebrow: "Fast Heat",
    title: "Up to 200°F in 60 minutes",
    body: "The only sauna where a 120V stove can heat the sauna to traditional Finnish temps.",
  },
  {
    eyebrow: "Standard Outlet",
    title: "Standard home outlet",
    body: "Skip the expensive electrical modification — just plug it in and start sweating.",
  },
  {
    eyebrow: "Real Steam",
    title: "Hot stones, pour water",
    body: "Traditional sauna heat that envelops your body.",
  },
  {
    eyebrow: "True Portability",
    title: "Move and setup easily",
    body: "Installs in two hours, no foundation needed.",
  },
];

const AnywhereDesign = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="container-x grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        <div>
          <div className="eyebrow mb-5">The Anywhere Difference</div>
          <h2 className="text-[36px] md:text-[54px] leading-[1.02] font-bold tracking-[-0.025em] max-w-[18ch]">
            The Anywhere Design
          </h2>
          <p className="mt-7 text-muted-foreground max-w-[52ch]">
            Until now, all saunas have required home electrical modifications, making sauna installation complex and expensive.
          </p>

          <div className="mt-10 divide-y divide-border border-y border-border">
            {features.map((it, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-left py-5 gap-6 group"
                    aria-expanded={isOpen}
                  >
                    <span className="flex flex-col">
                      {it.eyebrow && (
                        <span className="eyebrow mb-1">{it.eyebrow}</span>
                      )}
                      <span className="text-base md:text-lg font-semibold tracking-tight">
                        {it.title}
                      </span>
                    </span>
                    <span className="shrink-0 text-foreground/60 group-hover:text-foreground transition">
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-10 text-[15px] md:text-[16px] leading-[1.65] text-muted-foreground max-w-[60ch]">
                        {it.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <Link to="/specs" className="btn-dark-outline">
              Learn About the Design
            </Link>
          </div>
        </div>

        <div className="relative">
          <video
            src={anywhereVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-[4/5] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AnywhereDesign;
