import { useState, useMemo } from "react";
import ImageLightbox, { type LightboxImage } from "@/components/ImageLightbox";
import { trackEvent } from "@/lib/analytics";

import r1 from "@/assets/reviews/local/review-1.png";
import r2 from "@/assets/reviews/local/review-2.png";
import r3 from "@/assets/reviews/local/review-3.png";
import r4 from "@/assets/reviews/local/review-4.png";
import r5 from "@/assets/reviews/local/review-5.png";
import r6 from "@/assets/reviews/local/review-6.png";
import r7 from "@/assets/reviews/local/review-7.png";
import r8 from "@/assets/reviews/local/review-8.png";
import r9 from "@/assets/reviews/local/review-9.png";
import r10 from "@/assets/reviews/local/review-10.png";
import r11 from "@/assets/reviews/local/review-11.png";
import r12 from "@/assets/reviews/local/review-12.png";
import r13 from "@/assets/reviews/local/review-13.png";
import r14 from "@/assets/reviews/local/review-14.png";
import r15 from "@/assets/reviews/local/review-15.png";
import r16 from "@/assets/reviews/local/review-16.png";

type Review = { src: string; alt: string; size: "sm" | "md" | "lg"; widthClass?: string };

// Size distribution: ~60% md, ~25% lg, ~15% sm-larger (we use sm/md/lg)
const ALL_REVIEWS: Review[] = [
  // Top row (6): shorter reviews
  { src: r2, alt: "Google review from vicky rusconi: I can not recommend this company enough!", size: "md" },
  { src: r3, alt: "Google review from satya kamdar: Life with Sauna is way better than life without.", size: "md" },
  { src: r12, alt: "Google review from Isy Osubor: The sauna is beautiful and easy to use. Could not recommend enough!", size: "md" },
  { src: r6, alt: "Google review from Skye Vanderlinden: Zach is incredibly kind and accommodating! 10/10 recommend!", size: "md" },
  { src: r13, alt: "Google review from Richard Gavan: Good sauna.", size: "sm" },
  { src: r8, alt: "Customer text: Sauna has been such a wonderful life addition for us the last couple weeks!", size: "md" },
  // Middle row (5): the tallest / featured reviews
  { src: r11, alt: "Google review from Lyndsay Corrick: Zach is chill and professional, the sauna is so easy with just a plug into one outlet.", size: "lg", widthClass: "w-[287px] sm:w-[350px]" },
  { src: r1, alt: "Customer text: Hi- can I text you tomorrow? That sauna is so great. It's really changed my life!", size: "lg" },
  { src: r14, alt: "Google review from Page Finlay: This is the life upgrade I have been wanting as a renter for a long time.", size: "lg" },
  { src: r16, alt: "Google review from Suraj Srivats: Great quality saunas. High quality, short quantity, get your rental asap!", size: "lg" },
  { src: r5, alt: "Google review from Liam Bailey: this shit is hot. the guy was solid as well.", size: "lg" },
  // Bottom row (5): remaining reviews
  { src: r4, alt: "Google review from Mackenzie Croxdale: I love having a sauna at home!", size: "md" },
  { src: r7, alt: "Google review from Nadia Czebiniak: Zach is a great guy, extremely professional.", size: "md" },
  { src: r15, alt: "Google review from Peter Wong: Honestly amazing. Got warm super quick and fits two people comfortably.", size: "md" },
  { src: r9, alt: "Google review from Britt McClintock: One of the best decisions I've made in a long time!", size: "md" },
  { src: r10, alt: "Customer text: the sauna is so easy with just a plug into one outlet and that's it!", size: "md" },
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
    sm: "w-[200px]",
    md: "w-[240px] sm:w-[280px]",
    lg: "w-[300px] sm:w-[340px]",
  },
  // Middle row: largest
  large: {
    sm: "w-[280px]",
    md: "w-[340px] sm:w-[390px]",
    lg: "w-[410px] sm:w-[500px]",
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
    <div className="group relative overflow-hidden py-0 -my-2">
      <div
        className={`flex w-max gap-2 ${animClass} [animation-play-state:running] group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((rev, i) => {
          const originalIdx = i % items.length;
          const globalIdx = startGlobalIndex + originalIdx;
          const rot = rotationFor(originalIdx + (scale === "large" ? 3 : 0));
          return (
            <button
              key={i}
              type="button"
              onClick={() => onOpen(globalIdx)}
              className={`shrink-0 ${rev.widthClass ?? sizes[rev.size]} transition-transform duration-300 ease-out hover:scale-105 hover:z-10 will-change-transform`}
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
    const top = ALL_REVIEWS.slice(0, 6);
    const mid = ALL_REVIEWS.slice(6, 11);
    const bot = ALL_REVIEWS.slice(11);
    const all: LightboxImage[] = ALL_REVIEWS.map(r => ({ src: r.src, alt: r.alt }));
    return { rowTop: top, rowMid: mid, rowBot: bot, lightboxImages: all };
  }, []);

  const openAt = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
    trackEvent("review_opened", { review_index: i });
  };

  return (
    <section className="py-8 md:py-12 bg-background overflow-hidden">
      <div className="space-y-0">
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
