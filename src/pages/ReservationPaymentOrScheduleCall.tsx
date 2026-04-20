import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { seoData } from "@/lib/seoData";
import { Link } from "react-router-dom";

const ReservationPaymentOrScheduleCall = () => {
  useSEO(seoData.reservationPayment);

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
              A sauna built for a standard outlet that makes you sweat. That's it.
            </p>

            {/* Buy options */}
            <div className="space-y-6 mb-8">
              <div className="bg-card p-8 rounded-lg border-2 border-accent">
                <h2 className="text-2xl font-heading font-semibold mb-2 text-heading">
                  Anywhere Sauna
                </h2>
                <p className="text-3xl font-heading font-semibold text-accent mb-4">$4,599</p>
                <p className="text-muted-foreground mb-6">
                  Premium cedar construction with natural aroma and durability.
                </p>
                <Button 
                  asChild 
                  size="lg"
                  className="w-full"
                >
                  <a 
                    href="https://buy.stripe.com/eVqdR999Z8xo98w0Lh6Vq0i"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Buy Anywhere Sauna
                    <ExternalLink className="ml-2" size={18} />
                  </a>
                </Button>
              </div>
            </div>

            <div className="text-center py-4">
              <span className="text-lg text-muted-foreground">or</span>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-heading font-semibold mb-4 text-heading">
                Schedule Free Electrical Consultation
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Not sure your home is ready? Book a free 15-minute video call and we'll confirm your electrical setup.
              </p>
              <Button 
                asChild 
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Link to="/sauna-electrical-fit-consultation">
                  <Calendar className="mr-2" size={18} />
                  Schedule Electrical Consult
                </Link>
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
