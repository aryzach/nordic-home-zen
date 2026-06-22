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
              <a
                href="https://cal.com/zach-pretzell/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-80"
              >
                Book a 30-minute consultation
              </a>
            </p>
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
