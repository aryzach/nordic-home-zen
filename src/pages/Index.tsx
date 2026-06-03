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
        <div className="w-full px-0 sm:container sm:mx-auto sm:px-4 py-8 flex justify-center">
          <img
            src="/assets/reviews-animation.gif"
            alt="SF Sauna customer reviews"
            className="w-full sm:max-h-[70vh] sm:w-auto h-auto sm:rounded-lg"
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
