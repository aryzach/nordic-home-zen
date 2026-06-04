import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-fallback.avif"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-charcoal/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-[1100px] flex flex-col h-full">
        <div className="flex items-center justify-center gap-2 text-white/90 font-sans text-[14px] font-normal pt-4">
          <a href="https://share.google/bqGJ8MiXfwNgvigwm" target="_blank" rel="noopener noreferrer" className="hover:underline">Enjoyed by 26+ Saunojat</a>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-[hsl(var(--color-accent))] text-[hsl(var(--color-accent))]" size={14} />
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-heading text-[36px] md:text-[52px] font-semibold text-white mb-6 leading-[1.1] tracking-[-0.01em]">
            The 190°F sauna for everyone.
          </h1>
          <p className="font-sans text-[16px] md:text-[18px] leading-[1.6] text-white/90 mb-8 font-normal">
            Standard outlet. No electrician. Made for any home or apartment.
          </p>
          <div className="flex flex-col items-center gap-3 max-w-md mx-auto w-full">
            <Button
              asChild
              shape="pill"
              className="bg-transparent border-2 border-[hsl(var(--color-accent))] text-[hsl(var(--color-white))] font-sans font-medium h-auto px-[52px] py-[18px] text-base"
            >
              <Link to="/buy-your-anywhere-sauna">
                Buy now for $4,599
                <ArrowRight className="ml-1" size={20} />
              </Link>
            </Button>
            <div className="text-white/70 text-xs font-sans">or</div>
            <div className="flex flex-col items-center w-full">
              <Button
                asChild
                shape="pill"
                className="bg-[hsl(var(--color-accent))] text-[hsl(var(--color-white))] font-sans font-medium h-auto px-[52px] py-[18px] text-base"
              >
                <a href="https://calendar.app.google/tn9D96XCvg1sYfZGA" target="_blank" rel="noopener noreferrer">
                  Book Electrical Compatibility Consultation — $129
                </a>
              </Button>
              <p className="text-xs text-white/80 mt-2">
                Consultation fee is credited toward the purchase of an Anywhere Sauna
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
