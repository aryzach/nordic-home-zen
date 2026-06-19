import { useEffect, useRef, useState } from "react";

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

type ReviewImg = { src: string; alt: string };

const IMAGES: ReviewImg[] = [
  { src: r1, alt: "Customer review: That sauna is so great. It's really changed my life!" },
  { src: r2, alt: "Google review: I can not recommend this company enough!" },
  { src: r3, alt: "Google review: Life with Sauna is way better than life without." },
  { src: r4, alt: "Google review: I love having a sauna at home!" },
  { src: r5, alt: "Google review: this shit is hot. the guy was solid as well." },
  { src: r6, alt: "Google review: Zach is incredibly kind and accommodating! 10/10 recommend!" },
  { src: r7, alt: "Google review: Zach is a great guy, extremely professional." },
  { src: r8, alt: "Customer review: Sauna has been such a wonderful life addition!" },
  { src: r9, alt: "Google review: One of the best decisions I've made in a long time!" },
  { src: r10, alt: "Customer review: the sauna is so easy with just a plug into one outlet." },
  { src: r11, alt: "Google review: Zach is chill and professional, sauna is easy." },
  { src: r12, alt: "Google review: The sauna is beautiful and easy to use." },
  { src: r13, alt: "Google review: Good sauna." },
  { src: r14, alt: "Google review: This is the life upgrade I have been wanting." },
  { src: r15, alt: "Google review: Honestly amazing. Fits two people comfortably." },
  { src: r16, alt: "Google review: Great quality saunas. Get your rental asap!" },
];

type Pin = {
  id: number;
  imgIdx: number;
  xPct: number;
  yPct: number;
  rot: number;
  z: number;
  exiting?: boolean;
};

let NEXT_ID = 1;
let NEXT_Z = 1;

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const makePin = (forceIdx?: number): Pin => ({
  id: NEXT_ID++,
  imgIdx: forceIdx ?? Math.floor(Math.random() * IMAGES.length),
  xPct: rand(-4, 72),
  yPct: rand(-2, 62),
  rot: rand(-8, 8),
  z: NEXT_Z++,
});

const INITIAL_COUNT = 14;
const MAX_COUNT = 22;

const ReviewWall = () => {
  // Seed initial pile with a spread of distinct reviews
  const [pins, setPins] = useState<Pin[]>(() => {
    const indices = [...IMAGES.keys()].sort(() => Math.random() - 0.5);
    return Array.from({ length: INITIAL_COUNT }, (_, i) =>
      makePin(indices[i % indices.length])
    );
  });

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const schedule = () => {
      const delay = 2000 + Math.random() * 2000;
      timeoutRef.current = window.setTimeout(() => {
        setPins(prev => {
          const next = [...prev, makePin()];
          if (next.length > MAX_COUNT) {
            // Mark the oldest non-exiting pin as exiting; remove after fade
            const oldest = next.find(p => !p.exiting);
            if (oldest) {
              window.setTimeout(() => {
                setPins(curr => curr.filter(p => p.id !== oldest.id));
              }, 900);
              return next.map(p =>
                p.id === oldest.id ? { ...p, exiting: true } : p
              );
            }
          }
          return next;
        });
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section
      aria-label="Customer reviews"
      className="relative w-full bg-background overflow-hidden py-8 md:py-12"
    >
      <div className="relative mx-auto w-full max-w-[1400px] h-[560px] sm:h-[640px] md:h-[760px] px-4">
        {pins.map(pin => (
          <PinCard key={pin.id} pin={pin} />
        ))}
      </div>
    </section>
  );
};

const PinCard = ({ pin }: { pin: Pin }) => {
  const [mounted, setMounted] = useState(false);
  const img = IMAGES[pin.imgIdx];

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const visible = mounted && !pin.exiting;

  return (
    <div
      className="group absolute will-change-transform"
      style={{
        left: `${pin.xPct}%`,
        top: `${pin.yPct}%`,
        zIndex: pin.z,
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : -10}px) scale(${visible ? 1 : 0.95})`,
        transition:
          "opacity 800ms ease-out, transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div
        className="hover:!z-[9999] transition-transform duration-300 ease-out group-hover:-translate-y-1"
        style={{ transform: `rotate(${pin.rot}deg)` }}
      >
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block w-[180px] sm:w-[240px] md:w-[280px] h-auto bg-white select-none transition-shadow duration-300 group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
          style={{
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          }}
        />
      </div>
    </div>
  );
};

export default ReviewWall;
