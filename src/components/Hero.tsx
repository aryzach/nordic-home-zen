import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ArrowRight, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { trackEvent } from "@/lib/analytics";

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/e0BSsuTXiQlmmnAr79FQ/webhook-trigger/2179b14d-5b37-4627-9f14-70b81bd07afc";

const HERO_MOBILE_AVIF = "/hero-mobile.avif";
const HERO_MOBILE_WEBP = "/hero-mobile.webp";
const HERO_MOBILE_JPG = "/hero-mobile.jpg";
const HERO_DESKTOP_AVIF = "/hero-desktop.avif";
const HERO_DESKTOP_WEBP = "/hero-desktop.webp";
const HERO_DESKTOP_JPG = "/hero-desktop.jpg";

const Hero = () => {
  const navigate = useNavigate();

  const cta = (
    <button
      className="btn-outline w-full md:w-auto inline-flex items-center justify-center gap-2"
      onClick={() => {
        trackEvent("sauna_compatibility_quiz_started", {
          button_text: "Take the 2-Minute Compatibility Quiz",
          location: "hero",
        });
        trackEvent("compatibility_quiz_started", { location: "hero" });
        navigate("/sauna-compatibility-quiz");
      }}
    >
      Take the 2-Minute Compatibility Quiz
    </button>
  );

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    setStatus("loading");
    try {
      const res = await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: "",
          source: "Anywhere Homepage Hero Email Capture",
          businessLine: "Anywhere",
          customerLifecycle: "Lead",
        }),
      });
      if (!res.ok) {
        // eslint-disable-next-line no-console
        console.error("[Hero email capture] Webhook failed", res.status, res.statusText);
        setStatus("error");
        return;
      }
      trackEvent("newsletter_signup", { location: "hero" });
      try {
        (window as any).fbq?.("track", "Lead", { content_name: "Hero Email Capture" });
      } catch {}
      setStatus("success");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[Hero email capture] Network error", err);
      setStatus("error");
    }
  };

  const emailSignup = (
    <form onSubmit={handleEmailSubmit} className="flex flex-col w-full md:w-auto">
      {status === "success" ? (
        <div
          role="status"
          className="flex items-center gap-2 bg-white text-[#111] h-[46px] px-4 text-[14px] font-medium"
        >
          <Check className="w-4 h-4" aria-hidden="true" />
          Thanks — you're on the list.
        </div>
      ) : (
        <div className="flex w-full md:w-auto">
          <Input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            placeholder="Email for updates"
            className="flex-1 md:w-[220px] bg-white text-[#111] placeholder:text-[#111]/50 border-0 focus:border focus:border-[#111] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none h-[46px] text-[14px] px-4"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-[#111] text-white h-[46px] px-4 flex items-center justify-center font-semibold text-[13px] uppercase tracking-wider hover:bg-black transition-colors disabled:opacity-70"
            aria-label="Subscribe"
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      )}
      {status === "error" && (
        <p role="alert" className="mt-2 text-[13px] text-white bg-red-600/80 px-3 py-1.5">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
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
    <section className="relative min-h-[78vh] overflow-hidden bg-background">
      {/* MOBILE: full-bleed image with overlay text */}
      <div className="md:hidden relative w-full h-[78vh] min-h-[520px]">
        <picture>
          <source type="image/avif" srcSet={HERO_MOBILE_AVIF} />
          <source type="image/webp" srcSet={HERO_MOBILE_WEBP} />
          <img
            src={HERO_MOBILE_JPG}
            alt="Anywhere Sauna in a sunlit forest"
            width={800}
            height={600}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-[11%_center]"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-end items-start px-5 pb-10 pt-8 text-left">
          {rating}
          <h1 className="hero-title font-heading text-white mb-4">
            The world's only 230°F plug-in sauna.
          </h1>
          <div className="flex flex-col gap-3 justify-start w-full mb-6">
            {cta}
            {emailSignup}
          </div>
          <p className="font-sans text-[15px] leading-[1.6] text-white/80 font-normal max-w-sm">
            Works in 97% of homes and apartments. No electrician. Confirm your compatibility with a 30-minute call.
          </p>
        </div>
      </div>

      {/* DESKTOP: full-width image with text overlay on the right */}
      <div className="hidden md:flex relative w-full min-h-[78vh] items-center justify-end px-10 lg:px-20 py-12 pt-32">
        <picture>
          <source type="image/avif" srcSet={HERO_DESKTOP_AVIF} />
          <source type="image/webp" srcSet={HERO_DESKTOP_WEBP} />
          <img
            src={HERO_DESKTOP_JPG}
            alt="Anywhere Sauna in a sunlit forest"
            width={1600}
            height={1200}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-[25%_25%]"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/35 to-black/85" />
        <div className="relative z-10 max-w-xl text-left ml-auto">
          {rating}
          <h1 className="hero-title font-heading text-white mb-6">
            The world's only 230°F plug-in sauna.
          </h1>
          <div className="flex flex-col md:flex-row gap-3 justify-start w-full mb-6">
            {cta}
            {emailSignup}
          </div>
          <p className="font-sans text-[16px] leading-[1.6] text-white/80 font-normal max-w-md">
            Works in 97% of homes and apartments. No electrician. Confirm your compatibility with a 30-minute call.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
