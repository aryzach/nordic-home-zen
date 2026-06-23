import { useNavigate } from "react-router-dom";
import { trackAndNavigate } from "@/lib/analytics";

const ConsultationCallout = () => {
  const navigate = useNavigate();
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
            className="btn-primary shrink-0 w-full md:w-auto"
            onClick={() =>
              trackAndNavigate(
                "consultation_booking_click",
                { button_text: "Book Free Consultation", location: "homepage_callout" },
                () => navigate("/sauna-planning-consultation")
              )
            }
          >
            Book Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCallout;
