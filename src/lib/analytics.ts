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

function buildPayload(
  eventName: string,
  params: Record<string, any>,
  extra: Record<string, any> = {}
) {
  const payload: Record<string, any> = {
    ...params,
    page_location:
      typeof window !== "undefined" ? window.location.href : undefined,
    page_title: typeof document !== "undefined" ? document.title : undefined,
    transport_type: "beacon",
    ...extra,
  };
  if (CONVERSION_EVENTS.has(eventName)) {
    payload.conversion = true;
    payload.send_to = GA_ID;
  }
  return payload;
}

export function trackEvent(
  eventName: string,
  params: Record<string, any> = {}
) {
  if (typeof window === "undefined") return;

  const payload = buildPayload(eventName, params);

  const gtag = (window as any).gtag as Gtag | undefined;
  if (typeof gtag === "function") {
    gtag("event", eventName, payload);
  }

  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(`[GA4] ${eventName}`, payload);
  }
}

/**
 * Fire a GA4 event, then navigate after the hit is sent (via event_callback).
 * Falls back to navigating after 300ms if gtag never calls back (or is missing).
 * Use for any click that immediately changes the page (router push, external link, new tab).
 */
export function trackAndNavigate(
  eventName: string,
  params: Record<string, any>,
  navigateFn: () => void
) {
  let called = false;
  const done = () => {
    if (called) return;
    called = true;
    navigateFn();
  };

  const payload = buildPayload(eventName, params, {
    event_callback: done,
    event_timeout: 300,
  });

  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(`[GA4] ${eventName}`, payload);
  }

  if (
    typeof window !== "undefined" &&
    typeof (window as any).gtag === "function"
  ) {
    (window as any).gtag("event", eventName, payload);
    // Safety net in case event_callback never fires.
    setTimeout(done, 300);
  } else {
    done();
  }
}
