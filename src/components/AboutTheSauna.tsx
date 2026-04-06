const AboutTheSauna = () => {
  return (
    <section id="about-the-sauna" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-12 text-heading text-center">
          About the Sauna
        </h2>

        {/* Image placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center border border-border">
              <span className="text-muted-foreground text-sm">Photo {i}</span>
            </div>
          ))}
        </div>

        {/* Schematic placeholder */}
        <div className="bg-muted rounded-lg p-8 mb-12 flex items-center justify-center min-h-[300px] border border-border">
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-medium mb-2">Sauna Schematic — Placeholder</p>
            <p className="text-sm">Detailed measurements coming soon</p>
          </div>
        </div>

        {/* Specs grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Wood type */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-xl font-heading font-semibold text-heading mb-3">Wood Type</h3>
            <p className="text-muted-foreground mb-2">
              Available in <strong className="text-foreground">Fir</strong> or <strong className="text-foreground">Cedar</strong>.
            </p>
            <p className="text-muted-foreground">
              Both are naturally durable and heat-resistant, perfect for sauna use.
            </p>
          </div>

          {/* Waterproofing */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-xl font-heading font-semibold text-heading mb-3">Waterproof Maintenance</h3>
            <p className="text-muted-foreground mb-2">
              Each sauna is sealed with a waterproof coating to protect the wood and extend its life.
            </p>
            <p className="text-muted-foreground text-sm bg-muted/50 p-3 rounded border border-border">
              <strong className="text-foreground">Note about Fir saunas:</strong> The waterproof coating on Fir will have a strong pine smell for the first ~2 months. This is nothing to worry about and will fade over time, but some people find it overwhelming initially.
            </p>
          </div>

          {/* Heater */}
          <div className="bg-card rounded-lg p-6 border border-border md:col-span-2">
            <h3 className="text-xl font-heading font-semibold text-heading mb-3">Heater (Not Included)</h3>
            <p className="text-muted-foreground mb-2">
              The sauna does not come with a heater — pick one that fits your budget and preference from Amazon or any retailer.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Maximum heater dimensions:</strong> 13″ × 22″ × 9″
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTheSauna;
