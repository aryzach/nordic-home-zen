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
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <GoogleReviews />
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
