import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlacementGallery from "@/components/PlacementGallery";
import { useSEO } from "@/hooks/useSEO";

const Installs = () => {
  useSEO({
    title: "Installs | Anywhere Sauna",
    description: "See where the Anywhere Sauna fits — indoors, outdoors, garages, decks, and more. Put it anywhere there's a standard outlet.",
    canonical: "https://getanywheresauna.com/installs",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[78px] lg:pt-24">
        <PlacementGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Installs;
