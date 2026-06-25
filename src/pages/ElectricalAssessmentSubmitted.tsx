import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle2 } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { trackAndNavigate } from "@/lib/analytics";

const BOOKING_URL = "https://calendar.app.google/Q9nw6fTEBMnyNbDf8";

const ElectricalAssessmentSubmitted = () => {
  useSEO({
    title: "Assessment Submitted | The Anywhere Sauna",
    description:
      "Thanks! We've received your electrical compatibility assessment and will review your setup within 1 business day.",
    canonical: "https://sfsaunarental.com/electrical-assessment-submitted",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-10 max-w-xl mx-auto shadow-sm text-center">
            <div className="flex items-center justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="text-green-600" size={32} />
              </div>
            </div>

            <h1 className="text-[28px] md:text-[36px] leading-[1.15] font-semibold mb-4">
              Assessment Submitted
            </h1>
            <p className="text-base text-muted-foreground mb-3">
              Thanks! We've received your information and photos.
            </p>
            <p className="text-base text-muted-foreground mb-8">
              We'll personally review your setup and reach out within 1 business day to confirm compatibility and answer any questions.
            </p>

            <div className="flex flex-col items-center gap-4">
              <Button
                shape="pill"
                className="bg-[hsl(var(--color-accent))] text-[hsl(var(--color-white))] font-sans font-medium h-auto px-8 py-4 text-base w-full"
                onClick={() =>
                  trackAndNavigate(
                    "consultation_booking_click",
                    { button_text: "Book Free Consultation", location: "assessment_submitted" },
                    () => window.open(BOOKING_URL, "_blank", "noopener,noreferrer")
                  )
                }
              >
                <Calendar className="mr-1" size={18} />
                Book Free Consultation
              </Button>
              <p className="text-xs text-muted-foreground -mt-2 text-center max-w-[320px]">
                Want immediate feedback? Schedule a call with us.
              </p>


              <Button
                asChild
                shape="pill"
                variant="outline"
                className="font-sans font-medium h-auto px-8 py-4 text-base w-full"
              >
                <Link to="/">Explore Anywhere Sauna</Link>
              </Button>

              <Link
                to="/#faq"
                className="text-sm font-sans text-muted-foreground hover:text-foreground underline underline-offset-4"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ElectricalAssessmentSubmitted;
