import { ExternalLink, Phone, FileText, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackEvent } from "@/lib/analytics";

const BOOKING_URL = "https://cal.com/zach-pretzell/30min";

const BookButton = () => (
  <a
    href={BOOKING_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() =>
      trackEvent("consultation_booking_click", {
        button_text: "Book Free Consultation",
        location: "contact_thanks_page",
      })
    }
    className="inline-flex items-center justify-center gap-2 bg-white text-[#111111] border border-[#111111] font-bold text-[16px] px-5 py-[11px] hover:bg-[#111111] hover:text-white transition-colors"
    style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
  >
    Book Free Consultation
    <ExternalLink className="w-4 h-4" aria-hidden="true" />
  </a>
);

const ContactThanks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4 text-heading">
              Thanks for getting in touch!
            </h1>
            <p className="text-lg text-text mb-12">
              We've received your message and will get back to you shortly.
            </p>

            <div className="border-t border-[#e8e8e1] pt-12">
              <p className="text-base text-text mb-6">
                If you'd like an even faster response, we suggest booking a free video consultation.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-10">
                <div className="flex flex-col items-center gap-2">
                  <Phone className="w-6 h-6 text-heading" aria-hidden="true" />
                  <p className="text-sm text-text">30-minute video call</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <FileText className="w-6 h-6 text-heading" aria-hidden="true" />
                  <p className="text-sm text-text">Personalized recommendations</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <DollarSign className="w-6 h-6 text-heading" aria-hidden="true" />
                  <p className="text-sm text-text">Completely free, no pressure</p>
                </div>
              </div>

              <BookButton />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactThanks;
