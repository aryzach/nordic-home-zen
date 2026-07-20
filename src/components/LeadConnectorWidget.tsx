import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Routes that collect a phone number or SMS consent.
 * The LeadConnector chat widget must NOT appear on these pages so that
 * phone-collecting forms remain isolated from the widget (A2P SMS compliance).
 */
const DISALLOWED_ROUTES: readonly string[] = [
  "/contact",
  "/electrical-compatibility-quiz",
  "/sauna-compatibility-quiz",
];

const SCRIPT_ID = "leadconnector-chat-widget-loader";
const WIDGET_ID = "6a5e89c16802349a339ed9f3";
const LOADER_SRC = "https://widgets.leadconnectorhq.com/loader.js";
const RESOURCES_URL = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";

const normalize = (p: string) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p);

const removeWidget = () => {
  document.getElementById(SCRIPT_ID)?.remove();
  // The loader injects a custom element + iframe; remove them so the bubble disappears on route change.
  document
    .querySelectorAll(
      "leadconnector-chat-widget, .lc_text-widget, iframe[src*='leadconnectorhq.com'], iframe[src*='chat-widget']"
    )
    .forEach((el) => el.remove());
};

const injectWidget = () => {
  if (document.getElementById(SCRIPT_ID)) return;
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.src = LOADER_SRC;
  s.async = true;
  s.setAttribute("data-resources-url", RESOURCES_URL);
  s.setAttribute("data-widget-id", WIDGET_ID);
  s.setAttribute("data-source", "WEB_USER");
  document.body.appendChild(s);
};

const LeadConnectorWidget = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = normalize(pathname);
    if (DISALLOWED_ROUTES.includes(path)) {
      removeWidget();
    } else {
      injectWidget();
    }
  }, [pathname]);

  return null;
};

export default LeadConnectorWidget;
