import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutTheSauna from "@/components/AboutTheSauna";
import ProductHero from "@/components/product/ProductHero";
import ProductFeatures from "@/components/product/ProductFeatures";
import ProductFAQTeaser from "@/components/product/ProductFAQTeaser";
import ContactCTA from "@/components/product/ContactCTA";
import { useSEO } from "@/hooks/useSEO";

const Specs = () => {
  useSEO({
    title: "Anywhere Sauna | Specs & Product Details",
    description:
      "Full specifications for the Anywhere Sauna: capacity, temperature, power requirements, materials, and dimensions.",
    canonical: "https://getanywheresauna.com/specs",
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[78px] lg:pt-24">
        <ProductHero />
        <ProductFeatures />
        <AboutTheSauna />
        <ProductFAQTeaser />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Specs;
