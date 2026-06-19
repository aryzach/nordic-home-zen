import { ArrowRight, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { trackAndNavigate } from "@/lib/analytics";
const heroImage = { url: "/hero-sauna-forest.png" };

const Hero = () => {
  const navigate = useNavigate();

  const ctas = (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 w-full">
      <button
        className="btn-primary w-full md:w-auto"
        onClick={() =>
          trackAndNavigate(
            "buy_now_click",
            { button_text: "Buy now for $4,599", location: "hero" },
            () => navigate("/buy-your-anywhere-sauna")
          )
        }
      >
        Buy now for $4,599
        <ArrowRight className="ml-1" size={20} />
      </button>
      <Link
        to="/electrical-compatibility-quiz"
        className="btn-outline w-full md:w-auto"
      >
        Take the Electrical Compatibility Quiz
      </Link>
    </div>
  );


  const rating = (
    <div className="flex items-center justify-center md:justify-start gap-2 font-sans text-[14px] font-normal mb-4 text-white/90">
      <a href="https://share.google/bqGJ8MiXfwNgvigwm" target="_blank" rel="noopener noreferrer" className="hover:underline">
        Enjoyed by 26+ Saunojat
      </a>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="fill-[hsl(var(--color-accent))] text-[hsl(var(--color-accent))]" size={14} />
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen overflow-hidden pt-[78px] lg:pt-24 bg-background">
      {/* MOBILE: full-bleed image (left-cropped to sauna) with overlay text */}
      <div className="md:hidden relative w-full h-[calc(100vh-78px)] min-h-[560px]">
        <img
          src={heroImage.url}
          alt="Anywhere Sauna in a sunlit forest"
          className="absolute inset-0 w-full h-full object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-end px-5 pb-10 pt-8 text-center">
          {rating}
          <h1 className="font-heading text-[36px] font-semibold text-white mb-4 leading-[1.1] tracking-[-0.01em]">
            The world's only 200°F plug-in sauna.
          </h1>
          <p className="font-sans text-[16px] leading-[1.6] text-white/90 font-normal mb-6">
            Standard outlet. No electrician. Made for any home or apartment.
          </p>
          <div className="flex justify-center">{ctas}</div>
        </div>
      </div>

      {/* DESKTOP: full-width image with text overlay on the right */}
      <div className="hidden md:flex relative w-full min-h-[calc(100vh-96px)] items-center justify-end px-10 lg:px-20 py-12">
        <img
          src={heroImage.url}
          alt="Anywhere Sauna in a sunlit forest"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/40 to-black/75" />
        <div className="relative z-10 max-w-xl text-left">
          {rating}
          <h1 className="font-heading text-[44px] lg:text-[56px] font-semibold text-white mb-6 leading-[1.05] tracking-[-0.01em]">
            The world's only 200°F plug-in sauna.
          </h1>
          <p className="font-sans text-[18px] leading-[1.6] text-white/90 mb-8 font-normal">
            Standard outlet. No electrician. Made for any home or apartment.
          </p>
          {ctas}
        </div>
      </div>
    </section>
  );
};

export default Hero;
