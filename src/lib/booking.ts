// Centralized scheduling link for "Book Free Consultation" CTAs.
export const BOOKING_URL = "https://cal.com/sf-sauna/30min";

export const openBookingUrl = () => {
  if (typeof window === "undefined") return;
  window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
};
