import { lazy } from "react";
import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LazyMount from "@/components/LazyMount";
import { useSEO } from "@/hooks/useSEO";
import { seoData } from "@/lib/seoData";
import { trackAndNavigate } from "@/lib/analytics";

const ReviewWall = lazy(() => import("@/components/ReviewWall"));
const AnywhereDesign = lazy(() => import("@/components/AnywhereDesign"));
const VideoTestimonials = lazy(() => import("@/components/VideoTestimonials"));
const AsSeenIn = lazy(() => import("@/components/AsSeenIn"));
const ComparisonTable = lazy(() => import("@/components/ComparisonTable"));
const ConsultationCallout = lazy(() => import("@/components/ConsultationCallout"));
const Footer = lazy(() => import("@/components/Footer"));

const SCHEDULE_URL = "https://cal.com/sf-sauna/30min?overlayCalendar=true";

const openSchedule = () => {
  if (typeof window === "undefined") return;
  window.open(SCHEDULE_URL, "_blank", "noopener,noreferrer");
};

const Schedule = () => {
  useSEO(seoData.schedule);

  const scheduleCta = (
    <button
      type="button"
      className="btn-outline w-full md:w-auto inline-flex items-center justify-center gap-2"
      onClick={() =>
        trackAndNavigate(
          "consultation_booking_click",
          { button_text: "Book Free Sauna Compatibility Consultation", location: "schedule_hero" },
          openSchedule
        )
      }
    >
      Book Free Sauna Compatibility Consultation
      <ExternalLink className="w-4 h-4" aria-hidden="true" />
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero ctaOverride={scheduleCta} />
        <LazyMount minHeight={260} rootMargin="200px 0px">
          <ReviewWall />
        </LazyMount>
        <LazyMount minHeight={600}>
          <AnywhereDesign />
        </LazyMount>
        <LazyMount minHeight={500}>
          <VideoTestimonials />
        </LazyMount>
        <LazyMount minHeight={200}>
          <AsSeenIn />
        </LazyMount>
        <LazyMount minHeight={600}>
          <ComparisonTable />
        </LazyMount>
        <LazyMount minHeight={300}>
          <ConsultationCallout />
        </LazyMount>
      </main>
      <LazyMount minHeight={300}>
        <Footer />
      </LazyMount>
    </div>
  );
};

export default Schedule;
