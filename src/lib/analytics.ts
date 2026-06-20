// Event tracking helper — routes events through the GTM dataLayer.
// GTM (container GTM-K9D5GSR6) is the source of truth; configure GA4 tags
// inside GTM to forward these events. Conversion events are tagged with
// `conversion: true` so they can be filtered in GTM/GA4.

// Events we want flagged as conversions.
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

function getDataLayer(): any[] | undefined {
  if (typeof window === "undefined") return undefined;
  (window as any).dataLayer = (window as any).dataLayer || [];
  return (window as any).dataLayer as any[];
}

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
    ...extra,
  };
  if (CONVERSION_EVENTS.has(eventName)) {
    payload.conversion = true;
  }
  return payload;
}

export function trackEvent(
  eventName: string,
  params: Record<string, any> = {}
) {
  const dl = getDataLayer();
  if (!dl) return;

  const payload = buildPayload(eventName, params);
  dl.push({ event: eventName, ...payload });

  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(`[GTM] ${eventName}`, payload);
  }
}

/**
 * Fire an event via GTM dataLayer, then navigate after the hit is queued.
 * Uses an eventCallback when GTM is present; falls back to a 300ms timeout
 * to guarantee navigation always proceeds.
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
    eventCallback: done,
    eventTimeout: 300,
  });

  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(`[GTM] ${eventName}`, payload);
  }

  const dl = getDataLayer();
  if (dl) {
    dl.push({ event: eventName, ...payload });
    // Safety net in case GTM never invokes eventCallback.
    setTimeout(done, 300);
  } else {
    done();
  }
}
