import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, Calendar } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { seoData } from "@/lib/seoData";
import { useState } from "react";
import { Link } from "react-router-dom";

const ReservationPaymentOrScheduleCall = () => {
  useSEO(seoData.reservationPayment);
  const [noHeater, setNoHeater] = useState(false);
  const [tempAck, setTempAck] = useState(false);
  const [setupAck, setSetupAck] = useState(false);

  const allChecked = noHeater && tempAck && setupAck;

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
              A cheap sauna built to make you sweat. That's it.
            </p>

            {/* Acknowledgement checkboxes */}
            <div className="bg-card p-6 rounded-lg border border-border mb-8 space-y-4">
              <h2 className="text-xl font-heading font-semibold text-heading mb-2">Before you buy, please confirm:</h2>
              
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={noHeater}
                  onCheckedChange={(v) => setNoHeater(v === true)}
                  className="mt-0.5"
                />
                <span className="text-foreground">I understand the sauna <strong>does not include a heater</strong>. I will source my own (max dimensions: 13″ × 22″ × 9″).</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={tempAck}
                  onCheckedChange={(v) => setTempAck(v === true)}
                  className="mt-0.5"
                />
                <span className="text-foreground">
                  I understand the sauna works best in <strong>50°F and above</strong> —{" "}
                  <Link to="/service-areas" className="text-accent hover:underline">see the Service Areas</Link>.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={setupAck}
                  onCheckedChange={(v) => setSetupAck(v === true)}
                  className="mt-0.5"
                />
                <span className="text-foreground">
                  I understand setup takes <strong>~3 hours with two people</strong> —{" "}
                  <Link to="/how-it-works" className="text-accent hover:underline">see the setup video</Link>.
                </span>
              </label>
            </div>

            {/* Buy options */}
            <div className="space-y-6 mb-8">
              <div className="bg-card p-8 rounded-lg border-2 border-accent">
                <h2 className="text-2xl font-heading font-semibold mb-2 text-heading">
                  Cedar Sauna
                </h2>
                <p className="text-3xl font-heading font-semibold text-accent mb-4">$7,499</p>
                <p className="text-muted-foreground mb-6">
                  Premium cedar construction with natural aroma and durability.
                </p>
                <Button 
                  asChild 
                  size="lg"
                  className="w-full"
                  disabled={!allChecked}
                >
                  <a 
                    href={allChecked ? "https://buy.stripe.com/eVqdR999Z8xo98w0Lh6Vq0i" : undefined}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={!allChecked ? "pointer-events-none opacity-50" : ""}
                  >
                    Buy Cedar Sauna
                    <ExternalLink className="ml-2" size={18} />
                  </a>
                </Button>
              </div>

              <div className="bg-card p-8 rounded-lg border border-border">
                <h2 className="text-2xl font-heading font-semibold mb-2 text-heading">
                  Fir Sauna
                </h2>
                <p className="text-3xl font-heading font-semibold text-accent mb-4">$4,499</p>
                <p className="text-muted-foreground mb-6">
                  Affordable fir construction. Note: waterproof coating has a strong pine smell for the first ~2 months.
                </p>
                <Button 
                  asChild 
                  size="lg"
                  className="w-full"
                  disabled={!allChecked}
                >
                  <a 
                    href={allChecked ? "https://buy.stripe.com/eVqdR999Z8xo98w0Lh6Vq0i" : undefined}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={!allChecked ? "pointer-events-none opacity-50" : ""}
                  >
                    Buy Fir Sauna
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
                <a 
                  href="https://calendar.app.google/tn9D96XCvg1sYfZGA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Calendar className="mr-2" size={18} />
                  Schedule Electrical Consult
                </a>
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
