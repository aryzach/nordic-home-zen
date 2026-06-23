import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { trackAndNavigate } from "@/lib/analytics";
import { openBookingUrl } from "@/lib/booking";

const ContactCTA = () => (
  <section className="bg-[#f3e2d0]">
    <div className="mx-auto max-w-[1320px] px-5 md:px-10 py-14 md:py-20 text-center">
      <h2
        className="font-bold text-[#1c1d1d] mb-6"
        style={{ fontSize: "clamp(22px, 3vw, 28px)", lineHeight: 1.2, letterSpacing: 0 }}
      >
        Ready to bring sauna home?
      </h2>
      <p className="text-[14px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d] max-w-[52ch] mx-auto mb-8">
        Reserve your Anywhere Sauna or book a free 30-minute consult — we'll review your
        outlet, your space, and your setup together.
      </p>
      <div className="flex flex-col sm:flex-row sm:justify-center gap-3 max-w-md mx-auto sm:max-w-none">
        <Link
          to="/reserve-your-sauna"
          className="group block sm:inline-block bg-[#111111] text-white text-center font-bold text-[16px] tracking-[0.025em] px-6 py-[11px] hover:bg-black transition-colors"
        >
          Reserve Yours
          <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
        </Link>
        <button
          type="button"
          onClick={() =>
            trackAndNavigate(
              "consultation_booking_click",
              { button_text: "Book Free Consultation", location: "product_contact_cta" },
              openBookingUrl
            )
          }
          className="group inline-flex items-center justify-center gap-2 sm:inline-flex border border-[#111] text-[#111] text-center font-bold text-[16px] tracking-[0.025em] px-6 py-[11px] hover:bg-[#111] hover:text-white transition-colors"
        >
          Book Free Consultation
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </section>
);

export default ContactCTA;
