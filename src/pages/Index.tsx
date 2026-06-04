import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutTheSauna from "@/components/AboutTheSauna";
import GoogleReviews from "@/components/GoogleReviews";
import PlacementGallery from "@/components/PlacementGallery";
import SaunaFeatures from "@/components/SaunaFeatures";
import ComparisonTable from "@/components/ComparisonTable";
import FAQ from "@/components/FAQ";
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
          <img
            src="/assets/reviews-animation.gif"
            alt="SF Sauna customer reviews"
            className="block h-auto w-full max-w-[480px] sm:max-w-[500px] sm:w-full mx-auto rounded-lg"
            loading="lazy"
          />
        </div>
        <PlacementGallery />
        <AboutTheSauna />
        <SaunaFeatures />
        <ComparisonTable />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
