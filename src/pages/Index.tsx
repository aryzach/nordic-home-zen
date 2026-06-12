import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutTheSauna from "@/components/AboutTheSauna";
import GoogleReviews from "@/components/GoogleReviews";
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
        <GoogleReviews />
        <div className="w-full py-8 flex justify-center px-2 sm:px-6">
          <video
            src="/reviews-animation.mp4"
            className="block h-auto w-full max-w-[480px] sm:max-w-[500px] sm:w-full mx-auto rounded-lg"
            autoPlay
            loop
            muted
            playsInline
            aria-label="SF Sauna customer reviews"
          />
        </div>
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
