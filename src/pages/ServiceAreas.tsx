import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { seoData } from "@/lib/seoData";
import ClimateMapPage from "@/components/climate-map/ClimateMapPage";

const ServiceAreas = () => {
  useSEO(seoData.serviceAreas);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold mb-6 text-heading tracking-tight leading-tight">
              Where Does It Work?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
              The plug-in Anywhere Sauna works best when ambient temperatures are <strong className="text-foreground">50°F or above</strong>. You can put this anywhere — results may vary when the ambient temperature is under 50°F.
            </p>
            <p className="text-muted-foreground mb-8">
              Explore average monthly temperatures across the continental US. Use the controls to see how your area stacks up throughout the year.
            </p>

            <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-2 text-heading">
              Average U.S. Temperatures by Month
            </h2>
            <p className="text-muted-foreground mb-6">
              Explore average daytime highs and nighttime lows across the continental U.S.
            </p>

            <ClimateMapPage />

            <div className="bg-card rounded-lg p-8 border border-border text-center mt-12">
              <h3 className="text-2xl font-heading font-semibold mb-4 text-heading">
                Not sure about your climate?
              </h3>
              <p className="text-lg text-muted-foreground">
                The sauna works everywhere — it just heats up faster in warmer ambient temps. If your area is regularly below 50°F in winter, expect longer heat-up times during those months.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceAreas;
