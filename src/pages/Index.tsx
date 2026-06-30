import { lazy } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LazyMount from "@/components/LazyMount";
import { useSEO } from "@/hooks/useSEO";
import { seoData } from "@/lib/seoData";

const ReviewWall = lazy(() => import("@/components/ReviewWall"));
const AnywhereDesign = lazy(() => import("@/components/AnywhereDesign"));
const VideoTestimonials = lazy(() => import("@/components/VideoTestimonials"));
const AsSeenIn = lazy(() => import("@/components/AsSeenIn"));
const ComparisonTable = lazy(() => import("@/components/ComparisonTable"));
const ConsultationCallout = lazy(() => import("@/components/ConsultationCallout"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  useSEO(seoData.home);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
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

export default Index;
