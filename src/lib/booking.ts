// Centralized scheduling link for "Book Free Consultation" CTAs.
export const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/lMhJlRG69K4GP2OaI5EQ";

export const openBookingUrl = () => {
  if (typeof window === "undefined") return;
  window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
};
