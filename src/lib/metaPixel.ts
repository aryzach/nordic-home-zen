// Meta Pixel helper - safely calls window.fbq if loaded
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export const META_PIXEL_ID = "1724487292335915";

export function fbqTrack(
  event: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.fbq === "function") {
      if (params) window.fbq("track", event, params);
      else window.fbq("track", event);
    }
  } catch {
    // no-op
  }
}
