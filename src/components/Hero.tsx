import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { trackAndNavigate } from "@/lib/analytics";
const heroImage = { url: "/hero-sauna-forest.png" };

const Hero = () => {
  const navigate = useNavigate();

  const cta = (
    <button
      className="btn-outline w-full md:w-auto"
      onClick={() =>
        trackAndNavigate(
          "consultation_booking_click",
          { button_text: "Book Free Electrical Consultation", location: "hero" },
          () => navigate("/sauna-electrical-fit-consultation")
        )
      }
    >
      Book Free Electrical Consultation
    </button>
  );

  const rating = (
    <div className="flex items-center justify-start gap-2 font-sans text-[14px] font-normal mb-4 text-white/90">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="fill-yellow-400 text-yellow-400" size={14} />
        ))}
      </div>
      <a href="https://share.google/bqGJ8MiXfwNgvigwm" target="_blank" rel="noopener noreferrer" className="hover:underline">
        Enjoyed by 26+ Saunojat
      </a>
    </div>
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* MOBILE: full-bleed image with overlay text */}
      <div className="md:hidden relative w-full h-screen min-h-[560px]">
        <img
          src={heroImage.url}
          alt="Anywhere Sauna in a sunlit forest"
          className="absolute inset-0 w-full h-full object-cover object-[11%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-end items-start px-5 pb-10 pt-8 text-left">
          {rating}
          <h1 className="hero-title font-heading text-white mb-4">
            The world's only 200°F plug-in sauna.
          </h1>
          <div className="flex justify-start w-full mb-6">{cta}</div>
          <p className="font-sans text-[15px] leading-[1.6] text-white/80 font-normal max-w-sm">
            Works in 97% of homes and apartments. No electrician. Confirm your compatibility with a 30-minute call.
          </p>
        </div>
      </div>

      {/* DESKTOP: full-width image with text overlay on the right */}
      <div className="hidden md:flex relative w-full min-h-screen items-center justify-end px-10 lg:px-20 py-12 pt-32">
        <img
          src={heroImage.url}
          alt="Anywhere Sauna in a sunlit forest"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/35 to-black/85" />
        <div className="relative z-10 max-w-xl text-left ml-auto">
          {rating}
          <h1 className="font-heading text-[44px] leading-[1.02] md:text-[88px] md:leading-[0.98] font-semibold tracking-[-0.03em] text-white mb-6">
            The world's only 200°F plug-in sauna.
          </h1>
          <div className="flex justify-start w-full mb-6">{cta}</div>
          <p className="font-sans text-[16px] leading-[1.6] text-white/80 font-normal max-w-md">
            Works in 97% of homes and apartments. No electrician. Confirm your compatibility with a 30-minute call.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
