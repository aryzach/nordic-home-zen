import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { seoData } from "@/lib/seoData";
import { useNavigate } from "react-router-dom";
import { trackAndNavigate } from "@/lib/analytics";
import { openBookingUrl } from "@/lib/booking";


const ReservationPaymentOrScheduleCall = () => {
  useSEO(seoData.reservationPayment);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-4 text-heading">
              Buy Your Anywhere Sauna
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              The only sauna built for a standard outlet that makes you sweat.
            </p>

            <img
              src="/installs/specs-1.jpg"
              alt="Anywhere Sauna set up in a backyard patio"
              className="w-full h-auto object-contain mb-8"
              loading="lazy"
            />


            {/* Buy options */}
            <div className="space-y-6 mb-8">
              <div className="bg-card p-8 rounded-lg border-2 border-accent">
                <h2 className="text-2xl font-heading font-semibold mb-2 text-heading">
                  Anywhere Sauna
                </h2>
                <p className="text-3xl font-heading font-semibold text-accent mb-4">$4,599</p>
                <p className="text-muted-foreground mb-6">
                  Pay a $500 deposit now, and the remainder once shipped. Your sauna will be delivered within 45 days.
                </p>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    try {
                      (window as any).fbq?.('track', 'InitiateCheckout', {
                        content_name: 'Anywhere Sauna - Deposit',
                        content_category: 'Sauna',
                        value: 500,
                        currency: 'USD',
                      });
                    } catch {}
                    trackAndNavigate(
                      "deposit_checkout_started",
                      { location: "buy_page", amount: 500, currency: "USD" },
                      () => {
                        window.open(
                          "https://buy.stripe.com/8x214ngCrbJA1G451x6Vq0B",
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }
                    );
                  }}
                >
                  Pay $500 deposit
                  <ExternalLink className="ml-2" size={18} />
                </Button>
              </div>
            </div>

            <div className="text-center py-4">
              <span className="text-lg text-muted-foreground">or</span>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-heading font-semibold mb-4 text-heading">
                Book Free Consultation
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Thinking about a sauna but not sure what's possible at your home? Book a 30-minute video consultation ($109, credited toward any purchase or rental).
              </p>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() =>
                  trackAndNavigate(
                    "consultation_booking_click",
                    { button_text: "Book Free Consultation", location: "buy_page" },
                    openBookingUrl
                  )
                }
              >
                <Calendar className="mr-2" size={18} />
                Book Free Consultation
                <ExternalLink className="ml-2" size={16} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReservationPaymentOrScheduleCall;
