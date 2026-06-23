// Centralized scheduling link for "Book Free Consultation" CTAs.
// All CTAs that previously routed to /sauna-planning-consultation now open
// the Cal.com scheduler directly in a new tab.
export const BOOKING_URL = "https://cal.com/zach-pretzell/30min";

export const openBookingUrl = () => {
  if (typeof window === "undefined") return;
  window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
};
