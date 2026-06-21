import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalInlineEmbed from "@/components/CalInlineEmbed";

const ElectricChecklist = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="pt-16 md:pt-24 pb-8 md:pb-10">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h1 className="mb-6">
              Not sure what saunas could work in your home?
            </h1>
            <p className="mb-6">
              During this consultation, we'll determine what saunas are compatible with your existing home or apartment based on:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
              {[
                "Electrical configuration",
                "Space available (indoors or outdoors)",
                "Whether you rent or own",
                "And answer any other questions you might have",
              ].map((item) => (
                <div
                  key={item}
                  className="relative bg-card border border-border rounded-lg p-5 text-center shadow-sm overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
                  <p className="font-medium text-foreground pt-1">{item}</p>
                </div>
              ))}
            </div>
            <CalInlineEmbed />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ElectricChecklist;
