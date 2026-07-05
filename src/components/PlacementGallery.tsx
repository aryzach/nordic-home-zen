import { useState } from "react";
import ImageLightbox from "./ImageLightbox";

const placements = [
  { label: "Apartment", src: "/assets/placement-apartment.jpeg", alt: "Anywhere Sauna on an apartment patio" },
  { label: "Deck", src: "/assets/placement-deck.jpeg", alt: "Anywhere Sauna on a backyard deck" },
  { label: "Rooftop", src: "/assets/placement-rooftop.jpeg", alt: "Anywhere Sauna on a city rooftop" },
  { label: "Backyard", src: "/assets/placement-backyard.jpeg", alt: "Anywhere Sauna in a backyard garden" },
  { label: "Install", src: "/installs/install-IMG_7869.jpg", alt: "Anywhere Sauna installed in a San Francisco backyard" },
  { label: "Install", src: "/installs/install-IMG_7970.jpg", alt: "Anywhere Sauna install" },
  { label: "Install", src: "/installs/install-IMG_7982.jpg", alt: "Anywhere Sauna install" },
  { label: "Install", src: "/installs/install-IMG_8056.jpg", alt: "Anywhere Sauna install" },
  { label: "Install", src: "/installs/install-IMG_8335.jpg", alt: "Anywhere Sauna install" },
];

const PlacementGallery = () => {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  return (
    <section id="installs" className="py-16 md:py-24 bg-cedar-section">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4 text-heading text-center">
          The world's only 230°F plug-in sauna
        </h2>
        <p className="text-base md:text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          So you can put it Anywhere.
        </p>
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          {placements.map((p, i) => (
            <button
              key={p.label}
              type="button"
              onClick={() => { setStartIndex(i); setOpen(true); }}
              className="aspect-[3/4] w-full overflow-hidden border border-border/60 cursor-zoom-in group"
              aria-label={`Expand ${p.label} photo`}
            >
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
      <ImageLightbox images={placements} open={open} startIndex={startIndex} onOpenChange={setOpen} />
    </section>
  );
};

export default PlacementGallery;
