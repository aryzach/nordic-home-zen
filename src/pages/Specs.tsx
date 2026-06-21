import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutTheSauna from "@/components/AboutTheSauna";
import { useSEO } from "@/hooks/useSEO";

const Specs = () => {
  useSEO({
    title: "Specs | Anywhere Sauna",
    description: "Full specifications for the Anywhere Sauna: capacity, temperature, power requirements, materials, and dimensions.",
    canonical: "https://getanywheresauna.com/specs",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[78px] lg:pt-24">
        <AboutTheSauna />
      </main>
      <Footer />
    </div>
  );
};

export default Specs;
