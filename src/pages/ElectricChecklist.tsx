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
            <div className="max-w-3xl mx-auto mb-10">
              <CalInlineEmbed />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ElectricChecklist;
