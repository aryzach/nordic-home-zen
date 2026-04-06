const placements = [
  { label: "Apartments", placeholder: "Apartment sauna photo" },
  { label: "Rentals", placeholder: "Rental home sauna photo" },
  { label: "Backyards", placeholder: "Backyard sauna photo" },
  { label: "Garages", placeholder: "Garage sauna photo" },
  { label: "Decks", placeholder: "Deck sauna photo" },
];

const PlacementGallery = () => {
  return (
    <section className="py-16 md:py-24 bg-cedar-section">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-12 text-heading text-center">
          Put It Anywhere
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {placements.map((p) => (
            <div key={p.label} className="flex flex-col items-center">
              <div className="aspect-[4/3] w-full bg-muted rounded-lg flex items-center justify-center border border-border mb-3">
                <span className="text-muted-foreground text-sm text-center px-2">{p.placeholder}</span>
              </div>
              <span className="text-foreground font-medium">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementGallery;
