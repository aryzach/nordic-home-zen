import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const HeaterInferno = () => {
  useSEO({
    title: "Heater Inferno Sauna Heater | The Anywhere Sauna",
    description:
      "The Heater Inferno sauna heater — designed to heat your sauna fast using a standard American outlet. Shipping 2027.",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-6 text-foreground">
              Heater Inferno Sauna Heater
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              A new type of battery-augmented sauna heater designed from the
              ground up to deliver fast, intense heat from a standard American
              outlet.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Heat your sauna to 170°F in under 5 minutes and over 190°F in
              under 10 minutes.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Built to be fully compatible with the Anywhere Sauna.
            </p>
            <p className="text-lg font-medium text-foreground">
              Shipping 2027.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HeaterInferno;
