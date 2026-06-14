import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroVideoVertical from "@/assets/hero-video-vertical.mp4.asset.json";

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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-charcoal">
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-[1200px] mx-auto">
          {/* Vertical Video */}
          <div className="w-full flex justify-center order-1">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full max-w-[360px] md:max-w-full h-auto rounded-2xl object-cover aspect-[9/16]"
            >
              <source src={heroVideoVertical.url} type="video/mp4" />
            </video>
          </div>

          {/* Text content */}
          <div className="text-center md:text-left order-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white/90 font-sans text-[14px] font-normal mb-4">
              <a href="https://share.google/bqGJ8MiXfwNgvigwm" target="_blank" rel="noopener noreferrer" className="hover:underline">Enjoyed by 26+ Saunojat</a>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-[hsl(var(--color-accent))] text-[hsl(var(--color-accent))]" size={14} />
                ))}
              </div>
            </div>
            <h1 className="font-heading text-[36px] md:text-[52px] font-semibold text-white mb-6 leading-[1.1] tracking-[-0.01em]">
              The 190°F sauna for everyone.
            </h1>
            <p className="font-sans text-[16px] md:text-[18px] leading-[1.6] text-white/90 mb-8 font-normal">
              Standard outlet. No electrician. Made for any home or apartment.
            </p>
            <div className="flex flex-col items-center md:items-start gap-3 max-w-md mx-auto md:mx-0 w-full">
              <Button
                asChild
                shape="pill"
                className="bg-[hsl(var(--color-accent))] text-[hsl(var(--color-white))] font-sans font-medium h-auto px-[52px] py-[18px] text-base"
              >
                <Link to="/buy-your-anywhere-sauna">
                  Buy now for $4,599
                  <ArrowRight className="ml-1" size={20} />
                </Link>
              </Button>
              <div className="text-white/70 text-xs font-sans self-center md:self-start md:ml-6">or</div>
              <Button
                asChild
                shape="pill"
                className="bg-transparent border-[3px] border-[hsl(var(--color-accent))] text-[hsl(var(--color-white))] font-sans font-medium h-auto px-[52px] py-[18px] text-base"
              >
                <Link to="/electrical-compatibility-quiz">
                  Take the Electrical Compatibility Quiz
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
