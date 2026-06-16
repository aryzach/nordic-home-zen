import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutTheSauna from "@/components/AboutTheSauna";
import VideoTestimonials from "@/components/VideoTestimonials";
import ReviewWall from "@/components/ReviewWall";
import PlacementGallery from "@/components/PlacementGallery";
import SaunaFeatures from "@/components/SaunaFeatures";
import ComparisonTable from "@/components/ComparisonTable";
import FAQ from "@/components/FAQ";
import DualCTAs from "@/components/DualCTAs";
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
        <VideoTestimonials />



        <DualCTAs />
        <PlacementGallery />
        <ReviewWall />
        <AboutTheSauna />
        <SaunaFeatures />
        <DualCTAs />
        <ComparisonTable />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
