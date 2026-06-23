import { ExternalLink } from "lucide-react";
import { trackAndNavigate } from "@/lib/analytics";
import { openBookingUrl } from "@/lib/booking";

const ConsultationCallout = () => {
  return (
    <section className="section-y bg-background">
      <div className="container-x max-w-3xl">
        <div className="border border-border p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="mb-2">Not sure if it'll work in your home?</h2>
            <p className="text-muted-foreground">
              Book a 30-minute video consultation and we'll check your setup together.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-2"
            onClick={() =>
              trackAndNavigate(
                "consultation_booking_click",
                { button_text: "Book Free Consultation", location: "homepage_callout" },
                openBookingUrl
              )
            }
          >
            Book Free Consultation
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCallout;
