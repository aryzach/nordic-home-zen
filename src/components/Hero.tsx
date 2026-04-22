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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 container mx-auto px-4 text-center max-w-[1100px] flex flex-col">
        <h1 className="font-heading text-[36px] md:text-[52px] font-semibold text-white mb-6 leading-[1.1] tracking-[-0.01em] order-3">
          190°F sauna. Standard outlet. No electrician.
        </h1>
        <div className="flex items-center justify-center gap-2 text-white/90 font-sans text-[14px] font-normal mb-8 -mt-16 order-1">
          <a href="https://share.google/bqGJ8MiXfwNgvigwm" target="_blank" rel="noopener noreferrer" className="hover:underline">Enjoyed by 26+ Saunojat</a>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-[hsl(var(--color-accent))] text-[hsl(var(--color-accent))]" size={14} />
            ))}
          </div>
        </div>
        <p className="font-sans text-[16px] md:text-[18px] leading-[1.6] text-white/90 mb-3 font-normal order-2">
          Made for all types of homes and apartments.
        </p>
        <p className="font-sans text-[16px] md:text-[18px] leading-[1.6] text-white/90 mb-8 font-normal order-4">
          Hot stones. Pour water. Get steam.
        </p>
        <div className="flex flex-col gap-3 max-w-md mx-auto w-full order-5">
          <Button
            asChild
            size="lg"
            className="w-full bg-[hsl(var(--color-accent))] hover:bg-[hsl(var(--color-accent-dark))] text-[hsl(var(--color-white))] font-sans font-medium"
          >
            <Link to="/electric-checklist">
              Book Electrical Consult
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
          <div className="text-white/70 text-xs font-sans">or</div>
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="flex gap-2 w-full items-stretch"
          >
            <input type="hidden" name="access_key" value="0d3fcf2f-c3a3-49ec-9106-7ab3f8a35cf6" />
            <input type="hidden" name="subject" value="New Hero Email Signup" />
            <input type="hidden" name="redirect" value={`${window.location.origin}/thank-you`} />
            <Input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="flex-1 h-11 bg-white/95 text-charcoal placeholder:text-charcoal/60 border-0"
            />
            <Button
              type="submit"
              className="h-11 bg-[hsl(var(--color-accent))] hover:bg-[hsl(var(--color-accent-dark))] text-[hsl(var(--color-white))] font-sans font-medium"
            >
              Learn More
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
