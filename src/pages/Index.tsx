import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoTestimonials from "@/components/VideoTestimonials";
import ReviewWall from "@/components/ReviewWall";

import ComparisonTable from "@/components/ComparisonTable";
import ConsultationCallout from "@/components/ConsultationCallout";
import AnywhereDesign from "@/components/AnywhereDesign";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { seoData } from "@/lib/seoData";

const Index = () => {
  useSEO(seoData.home);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ReviewWall />
        <AnywhereDesign />
        <VideoTestimonials />
        <ComparisonTable />
        <ConsultationCallout />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

