import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { seoData } from "@/lib/seoData";

const ServiceAreas = () => {
  useSEO(seoData.serviceAreas);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold mb-6 text-heading tracking-tight leading-tight">
              Where Does It Work?
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed">
              The plug-in Anywhere Sauna works best when ambient temperatures are <strong className="text-foreground">50°F or above</strong>. You can put this anywhere — results may vary when the ambient temperature is under 50°F.
            </p>
            <p className="text-muted-foreground mb-12">
              Below is a reference map showing average monthly temperatures across the continental US. Use it to see how your area stacks up throughout the year.
            </p>

            {/* Interactive map placeholder */}
            <div className="bg-muted rounded-lg border border-border min-h-[500px] flex items-center justify-center mb-12">
              <div className="text-center text-muted-foreground p-8">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-xl font-heading font-medium mb-2">Interactive US Temperature Map</p>
                <p className="text-sm max-w-md mx-auto">
                  Coming soon — an interactive map of the continental US showing average monthly temperatures. Toggle between months to see where the Anywhere Sauna performs best year-round.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-8 border border-border text-center">
              <h3 className="text-2xl font-heading font-semibold mb-4 text-heading">
                Not sure about your climate?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
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
