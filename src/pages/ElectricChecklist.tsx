import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BookButton = () => (
  <a
    href="https://cal.com/zach-pretzell/30min"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
  >
    Book Free Consultation
    <ExternalLink className="w-4 h-4" aria-hidden="true" />
  </a>
);

const ElectricChecklist = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        <section className="pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h1 className="mb-8">
              Not sure what saunas could work in your home?
            </h1>
            <div className="mb-10">
              <BookButton />
            </div>

            <div className="text-left space-y-6 mb-10">
              <p>
                On this 30-minute video call, we'll determine what saunas are a good fit for your home.
              </p>
              <p>We'll review:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Available electrical outlets</li>
                <li>Installation location</li>
                <li>Space requirements</li>
                <li>Expected temperatures</li>
                <li>Any questions you have</li>
              </ul>
            </div>

            <BookButton />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ElectricChecklist;
