const placements = [
  { label: "Apartments", placeholder: "Apartment" },
  { label: "Rentals", placeholder: "Rental" },
  { label: "Backyards", placeholder: "Backyard" },
  { label: "Garages", placeholder: "Garage" },
  { label: "Decks", placeholder: "Deck" },
  { label: "Bedrooms", placeholder: "Bedroom" },
];

const PlacementGallery = () => {
  return (
    <section className="py-16 md:py-24 bg-cedar-section">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4 text-heading text-center">
          Put It Anywhere
        </h2>
        <p className="text-base md:text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          Apartments, rentals, backyards, garages — if there's an outlet, there's a sauna.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {placements.map((p) => (
            <div key={p.label} className="flex flex-col items-center">
              <div
                className="aspect-[3/4] w-full rounded-2xl flex items-end justify-center p-5 border border-border/60"
                style={{
                  background:
                    "linear-gradient(160deg, hsl(30 38% 92%) 0%, hsl(33 25% 86%) 100%)",
                }}
              >
                <span className="font-heading text-lg md:text-xl text-foreground/50 italic">
                  {p.placeholder}
                </span>
              </div>
              <span className="text-foreground font-medium mt-4 font-sans">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementGallery;
