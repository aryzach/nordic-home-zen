import { useEffect } from "react";

/**
 * Registers WebMCP tools with the browser so AI agents (via
 * `navigator.modelContext.provideContext`) can invoke site actions.
 *
 * Spec: https://webmachinelearning.github.io/webmcp/
 */
export const WebMCPTools = () => {
  useEffect(() => {
    const nav = navigator as Navigator & {
      modelContext?: {
        provideContext: (ctx: unknown) => void | Promise<void>;
      };
    };
    if (!nav.modelContext?.provideContext) return;

    const tools = [
      {
        name: "get_product_overview",
        description:
          "Returns an overview of the SF Sauna Anywhere: specs, pricing, deposit, and delivery timeline.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () => ({
          name: "SF Sauna Anywhere",
          type: "Plug-in steam sauna",
          voltage: "Standard 120V home outlet",
          temperature_range_f: [180, 230],
          heat_up_minutes: "40-90 depending on ambient temperature",
          assembly_minutes: 30,
          permits_required: false,
          price_usd: 4599,
          shipping: "Included, continental US",
          deposit_usd: 500,
          deposit_refundable_days: 21,
          remaining_balance_usd: 4099,
          planned_delivery: "September 2026",
          product_page: "https://sfsauna.com/specs",
        }),
      },
      {
        name: "open_compatibility_quiz",
        description:
          "Navigates the user to the 2-minute quiz that determines whether the SF Sauna Anywhere will work in their home.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () => {
          window.location.href = "/sauna-compatibility-quiz";
          return { navigated_to: "/sauna-compatibility-quiz" };
        },
      },
      {
        name: "book_consultation",
        description:
          "Opens the Cal.com booking page for a free 30-minute video consultation with the SF Sauna team.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () => {
          const url = "https://cal.com/sf-sauna/30min?overlayCalendar=true";
          window.open(url, "_blank", "noopener,noreferrer");
          return { opened: url };
        },
      },
      {
        name: "reserve_sauna",
        description:
          "Navigates the user to the reservation page to place a $500 refundable deposit.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        execute: async () => {
          window.location.href = "/deposit";
          return { navigated_to: "/deposit" };
        },
      },
      {
        name: "navigate",
        description:
          "Navigate to a known page on sfsauna.com. Allowed pages: home, specs, compare, faq, installs, deposit, terms, contact, schedule.",
        inputSchema: {
          type: "object",
          properties: {
            page: {
              type: "string",
              enum: [
                "home",
                "specs",
                "compare",
                "faq",
                "installs",
                "deposit",
                "terms",
                "contact",
                "schedule",
              ],
            },
          },
          required: ["page"],
          additionalProperties: false,
        },
        execute: async ({ page }: { page: string }) => {
          const path = page === "home" ? "/" : `/${page}`;
          window.location.href = path;
          return { navigated_to: path };
        },
      },
    ];

    try {
      void nav.modelContext.provideContext({ tools });
    } catch {
      // WebMCP unavailable or rejected the context; ignore silently.
    }
  }, []);

  return null;
};

export default WebMCPTools;
