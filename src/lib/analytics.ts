// GA4 event tracking helper (gtag direct, no GTM).
// Conversion events are marked in the GA4 Admin UI; we also pass
// `conversion: true` as a param so it's easy to filter in DebugView.

type Gtag = (...args: any[]) => void;

const GA_ID = "G-Q1KB7R2MLG";

// Events we want flagged as GA4 conversions (also marked in GA4 Admin).
const CONVERSION_EVENTS = new Set<string>([
  "consultation_booking_click",
  "quiz_submitted",
  "assessment_submitted",
  "deposit_checkout_started",
]);

const isDev =
  typeof import.meta !== "undefined" &&
  (import.meta as any).env &&
  (import.meta as any).env.DEV;

export function trackEvent(
  eventName: string,
  params: Record<string, any> = {}
) {
  if (typeof window === "undefined") return;

  const payload: Record<string, any> = {
    page_location: window.location.href,
    page_title: document.title,
    ...params,
  };

  if (CONVERSION_EVENTS.has(eventName)) {
    payload.conversion = true;
    payload.send_to = GA_ID;
  }

  const gtag = (window as any).gtag as Gtag | undefined;
  if (typeof gtag === "function") {
    gtag("event", eventName, payload);
  }

  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(`[GA4] ${eventName}`, payload);
  }
}
