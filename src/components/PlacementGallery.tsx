const placements = [
  { label: "Apartment", src: "/assets/placement-apartment.jpeg", alt: "Anywhere Sauna on an apartment patio" },
  { label: "Deck", src: "/assets/placement-deck.jpeg", alt: "Anywhere Sauna on a backyard deck" },
  { label: "Rooftop", src: "/assets/placement-rooftop.jpeg", alt: "Anywhere Sauna on a city rooftop" },
  { label: "Backyard", src: "/assets/placement-backyard.jpeg", alt: "Anywhere Sauna in a backyard garden" },
];

const PlacementGallery = () => {
  return (
    <section className="py-16 md:py-24 bg-cedar-section">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4 text-heading text-center">
          Put It Anywhere
        </h2>
        <p className="text-base md:text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          Homes, apartments, living rooms, backyards, garages, Anywhere.
        </p>
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          {placements.map((p) => (
            <div
              key={p.label}
              className="aspect-[3/4] w-full rounded-2xl overflow-hidden border border-border/60"
            >
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementGallery;
