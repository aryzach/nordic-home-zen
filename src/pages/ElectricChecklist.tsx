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
            <ul className="text-left max-w-xl mx-auto mb-8 space-y-2 list-disc pl-5">
              <li>Electrical configuration</li>
              <li>Space available (indoors or outdoors)</li>
              <li>Whether you rent or own</li>
              <li>And answer any other questions you might have</li>
            </ul>
            <CalInlineEmbed />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ElectricChecklist;
