import { useState, useMemo } from "react";
import ImageLightbox, { type LightboxImage } from "@/components/ImageLightbox";

import r1 from "@/assets/reviews/review-1.png.asset.json";
import r2 from "@/assets/reviews/review-2.png.asset.json";
import r3 from "@/assets/reviews/review-3.png.asset.json";
import r4 from "@/assets/reviews/review-4.png.asset.json";
import r5 from "@/assets/reviews/review-5.png.asset.json";
import r6 from "@/assets/reviews/review-6.png.asset.json";
import r7 from "@/assets/reviews/review-7.png.asset.json";
import r8 from "@/assets/reviews/review-8.png.asset.json";
import r9 from "@/assets/reviews/review-9.png.asset.json";
import r10 from "@/assets/reviews/review-10.png.asset.json";
import r11 from "@/assets/reviews/review-11.png.asset.json";
import r12 from "@/assets/reviews/review-12.png.asset.json";
import r13 from "@/assets/reviews/review-13.png.asset.json";
import r14 from "@/assets/reviews/review-14.png.asset.json";
import r15 from "@/assets/reviews/review-15.png.asset.json";
import r16 from "@/assets/reviews/review-16.png.asset.json";

type Review = { src: string; alt: string; size: "sm" | "md" | "lg" };

// Size distribution: ~60% md, ~25% lg, ~15% sm-larger (we use sm/md/lg)
const ALL_REVIEWS: Review[] = [
  { src: r1.url, alt: "Customer text: That sauna is so great. It's really changed my life!", size: "lg" },
  { src: r2.url, alt: "Google review from vicky rusconi: I can not recommend this company enough!", size: "md" },
  { src: r3.url, alt: "Google review from satya kamdar: Life with Sauna is way better than life without.", size: "md" },
  { src: r11.url, alt: "Google review from Lyndsay Corrick: Zach is chill and professional, the sauna is so easy with just a plug into one outlet.", size: "lg" },
  { src: r4.url, alt: "Google review from Mackenzie Croxdale: I love having a sauna at home!", size: "lg" },
  { src: r12.url, alt: "Google review from Isy Osubor: The sauna is beautiful and easy to use. Could not recommend enough!", size: "md" },
  { src: r5.url, alt: "Google review from Liam Bailey: this shit is hot. the guy was solid as well.", size: "sm" },
  { src: r13.url, alt: "Google review from Richard Gavan: Good sauna.", size: "sm" },
  { src: r6.url, alt: "Google review from Skye Vanderlinden: Zach is incredibly kind and accommodating! 10/10 recommend!", size: "md" },
  { src: r14.url, alt: "Google review from Page Finlay: I am so happy with the sauna, the life upgrade I have been wanting as a renter.", size: "lg" },
  { src: r7.url, alt: "Google review from Nadia Czebiniak: Zach is a great guy, extremely professional.", size: "lg" },
  { src: r15.url, alt: "Google review from Peter Wong: Honestly amazing. Got warm super quick and fits two people comfortably.", size: "md" },
  { src: r8.url, alt: "Customer text: Sauna has been such a wonderful life addition for us the last couple weeks!", size: "md" },
  { src: r16.url, alt: "Google review from Suraj Srivats: Great quality saunas. High quality, short quantity, get your rental asap!", size: "md" },
  { src: r9.url, alt: "Google review from Britt McClintock: One of the best decisions I've made in a long time!", size: "md" },
  { src: r10.url, alt: "Customer text: the sauna is so easy with just a plug into one outlet and that's it!", size: "md" },
];

// Deterministic pseudo-rotation by index so SSR matches CSR
const rotationFor = (i: number) => {
  const seq = [-2.5, 1.8, -1.2, 2.4, -0.8, 1.5, -2.1, 0.9, -1.7, 2.8, -2.3, 1.1];
  return seq[i % seq.length];
};

const sizeClasses = {
  sm: "w-[200px] sm:w-[220px]",
  md: "w-[260px] sm:w-[300px]",
  lg: "w-[320px] sm:w-[380px]",
};

const rowSizeClasses = {
  // Top & bottom rows: smaller overall
  small: {
    sm: "w-[170px]",
    md: "w-[210px] sm:w-[240px]",
    lg: "w-[260px] sm:w-[290px]",
  },
  // Middle row: largest
  large: {
    sm: "w-[240px]",
    md: "w-[300px] sm:w-[340px]",
    lg: "w-[360px] sm:w-[440px]",
  },
};

interface RowProps {
  items: Review[];
  direction: "left" | "right";
  duration: number;
  scale: "small" | "large";
  startGlobalIndex: number;
  onOpen: (idx: number) => void;
}

const MarqueeRow = ({ items, direction, duration, scale, startGlobalIndex, onOpen }: RowProps) => {
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  const sizes = rowSizeClasses[scale];
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="group relative overflow-hidden py-4">
      <div
        className={`flex w-max gap-6 ${animClass} [animation-play-state:running] group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((rev, i) => {
          const originalIdx = i % items.length;
          const globalIdx = startGlobalIndex + originalIdx;
          const rot = rotationFor(i + (scale === "large" ? 3 : 0));
          return (
            <button
              key={i}
              type="button"
              onClick={() => onOpen(globalIdx)}
              className={`shrink-0 ${sizes[rev.size]} transition-transform duration-300 ease-out hover:scale-105 hover:z-10 will-change-transform`}
              style={{ transform: `rotate(${rot}deg)` }}
              aria-label="Open review screenshot"
            >
              <img
                src={rev.src}
                alt={rev.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)] hover:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.28)] bg-white border border-black/5 transition-shadow duration-300"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ReviewWall = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Split into 3 rows
  const { rowTop, rowMid, rowBot, lightboxImages } = useMemo(() => {
    const n = ALL_REVIEWS.length;
    const third = Math.ceil(n / 3);
    const top = ALL_REVIEWS.slice(0, third);
    const mid = ALL_REVIEWS.slice(third, third * 2);
    const bot = ALL_REVIEWS.slice(third * 2);
    const all: LightboxImage[] = ALL_REVIEWS.map(r => ({ src: r.src, alt: r.alt }));
    return { rowTop: top, rowMid: mid, rowBot: bot, lightboxImages: all };
  }, []);

  const openAt = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-10 md:mb-14 text-center">
        <h2 className="text-3xl md:text-5xl font-heading font-semibold text-heading mb-4">
          Don't take our word for it.
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Real feedback from customers using Anywhere Sauna in apartments, homes, backyards, rentals, and shared living spaces.
        </p>
      </div>

      <div className="space-y-2 md:space-y-4">
        <MarqueeRow
          items={rowTop}
          direction="left"
          duration={60}
          scale="small"
          startGlobalIndex={0}
          onOpen={openAt}
        />
        <MarqueeRow
          items={rowMid}
          direction="right"
          duration={45}
          scale="large"
          startGlobalIndex={rowTop.length}
          onOpen={openAt}
        />
        <MarqueeRow
          items={rowBot}
          direction="left"
          duration={65}
          scale="small"
          startGlobalIndex={rowTop.length + rowMid.length}
          onOpen={openAt}
        />
      </div>

      <ImageLightbox
        images={lightboxImages}
        open={lightboxOpen}
        startIndex={lightboxIndex}
        onOpenChange={setLightboxOpen}
      />
    </section>
  );
};

export default ReviewWall;
