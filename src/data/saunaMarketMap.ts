export type SaunaOption = {
  id: string;
  name: string;
  type: string;
  category: string;
  classification: string;
  experienceScore: number;
  complexityScore: number;
  costs: {
    product: { low: number; high: number };
    shipping: { low: number; high: number };
    installation: { low: number; high: number };
    electrical: { low: number; high: number };
    sitePrep: { low: number; high: number };
  };
  installTime: string;
  electricalRequirement: string;
  maxTypicalTempF: number | null;
  waterOnStones: "Yes" | "No" | "Depends";
  placement: string;
  footprint: string;
  moveability: string;
  summary: string;
  pros: string[];
  cons: string[];
  examples: { brand: string; model?: string; url: string }[];
  label: { offsetX: number; offsetY: number; anchor: "start" | "middle" | "end" };
  featured?: boolean;
  cta?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
};

export type CategoryBlob = {
  id: string;
  label: string;
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
  colorFamily: "green" | "amber" | "blue" | "purple" | "lavender" | "rose";
  opacity: number;
  includedOptionIds: string[];
  summary: string;
  pros: string[];
  cons: string[];
};

export const chartConfig = {
  title: "Traditional Sauna Experience",
  subtitle: "Based on Trumpkin's Principles",
  labels: {
    top: "More Traditional",
    bottom: "Less Traditional",
    left: "Simple Project",
    right: "Complex Project",
  },
  disclaimer:
    "Experience ratings are based on Trumpkin's published sauna design principles and are intended to compare traditional sauna performance, not overall product quality or wellness benefits.",
};

export const saunaOptions: SaunaOption[] = [
  {
    id: "anywhere-sauna",
    name: "Anywhere Sauna",
    type: "Traditional",
    category: "plug-in-traditional",
    classification: "Specific brand",
    experienceScore: 88,
    complexityScore: 24,
    costs: {
      product: { low: 4599, high: 4599 },
      shipping: { low: 0, high: 0 },
      installation: { low: 0, high: 0 },
      electrical: { low: 0, high: 0 },
      sitePrep: { low: 0, high: 0 },
    },
    installTime: "About 30 minutes",
    electricalRequirement: "120 V / 20 A standard outlet",
    maxTypicalTempF: 230,
    waterOnStones: "Yes",
    placement: "Indoor or outdoor",
    footprint: "Approx. 4×4 ft",
    moveability: "High",
    summary:
      "High-temperature traditional sauna designed to avoid the usual electrician and construction burden.",
    pros: ["Traditional high heat", "Low installation burden", "No permanent build-out", "Moveable"],
    cons: ["Smaller than many prefab rooms", "Still needs sensible placement and ventilation"],
    examples: [{ brand: "Anywhere Sauna", model: "Anywhere Sauna", url: "https://getanywheresauna.com" }],
    label: { offsetX: 15, offsetY: -12, anchor: "start" },
    featured: true,
    cta: {
      primary: { label: "See Anywhere Sauna", href: "/specs" },
      secondary: { label: "Check compatibility", href: "/sauna-compatibility-quiz" },
    },
  },
  {
    id: "almost-heaven",
    name: "Almost Heaven",
    type: "Traditional barrel",
    category: "barrel-sauna",
    classification: "Specific brand",
    experienceScore: 69,
    complexityScore: 62,
    costs: {
      product: { low: 4000, high: 10000 },
      shipping: { low: 0, high: 0 },
      installation: { low: 1000, high: 4000 },
      electrical: { low: 1500, high: 5000 },
      sitePrep: { low: 0, high: 2500 },
    },
    installTime: "Several days to several weeks",
    electricalRequirement: "240 V",
    maxTypicalTempF: 190,
    waterOnStones: "Yes",
    placement: "Mostly outdoor",
    footprint: "Approx. 5×6 ft",
    moveability: "Low",
    summary:
      "Popular traditional barrel saunas with credible heat but meaningful site, assembly, and electrical requirements.",
    pros: ["Real heater and stones", "Recognizable traditional format", "Good outdoor fit"],
    cons: ["Barrel geometry can create cold feet", "Usually requires 240 V", "Hard to move"],
    examples: [{ brand: "Almost Heaven", model: "Representative barrel model", url: "https://almostheaven.com" }],
    label: { offsetX: 14, offsetY: -10, anchor: "start" },
  },
  {
    id: "costco-barrel-sauna",
    name: "Costco Barrel Sauna",
    type: "Traditional barrel",
    category: "barrel-sauna",
    classification: "Retail category",
    experienceScore: 56,
    complexityScore: 52,
    costs: {
      product: { low: 3000, high: 7000 },
      shipping: { low: 0, high: 0 },
      installation: { low: 800, high: 3000 },
      electrical: { low: 1500, high: 5000 },
      sitePrep: { low: 0, high: 2500 },
    },
    installTime: "Several days to a few weeks",
    electricalRequirement: "240 V",
    maxTypicalTempF: 170,
    waterOnStones: "Yes",
    placement: "Mostly outdoor",
    footprint: "Approx. 5×6 ft",
    moveability: "Low",
    summary:
      "Lower-cost barrel options with more variability in materials, heater quality, and installation execution.",
    pros: ["Lower entry price", "Traditional heater options", "Outdoor placement"],
    cons: [
      "Quality varies",
      "Barrel geometry can create uneven heat",
      "Electrical work often dominates project complexity",
    ],
    examples: [
      {
        brand: "Costco",
        model: "Representative barrel model",
        url: "https://www.costco.com/CatalogSearch?dept=All&keyword=sauna",
      },
    ],
    label: { offsetX: -14, offsetY: 23, anchor: "end" },
  },
  {
    id: "saunalife",
    name: "SaunaLife",
    type: "Traditional prefab",
    category: "premium-prefab-sauna",
    classification: "Specific brand",
    experienceScore: 85,
    complexityScore: 78,
    costs: {
      product: { low: 3500, high: 20000 },
      shipping: { low: 950, high: 950 },
      installation: { low: 800, high: 3000 },
      electrical: { low: 1500, high: 5000 },
      sitePrep: { low: 0, high: 2500 },
    },
    installTime: "Several days to a few weeks",
    electricalRequirement: "240 V",
    maxTypicalTempF: 210,
    waterOnStones: "Yes",
    placement: "Indoor or outdoor",
    footprint: "Usually 5×5 ft or larger",
    moveability: "Low",
    summary:
      "Premium prefabricated sauna rooms with strong materials and substantial shipping, assembly, and electrical demands.",
    pros: ["Strong materials", "Excellent sauna potential", "Indoor and outdoor formats"],
    cons: ["High total cost", "Freight and access complexity", "Semi-permanent"],
    examples: [{ brand: "SaunaLife", model: "Representative premium prefab", url: "https://saunalife.com" }],
    label: { offsetX: 13, offsetY: -12, anchor: "start" },
  },
  {
    id: "plunge-sauna",
    name: "Plunge Sauna",
    type: "Traditional prefab",
    category: "premium-prefab-sauna",
    classification: "Specific brand",
    experienceScore: 90,
    complexityScore: 71,
    costs: {
      product: { low: 10000, high: 20000 },
      shipping: { low: 0, high: 950 },
      installation: { low: 800, high: 3000 },
      electrical: { low: 1500, high: 5000 },
      sitePrep: { low: 0, high: 2500 },
    },
    installTime: "Several days to several weeks",
    electricalRequirement: "240 V",
    maxTypicalTempF: 230,
    waterOnStones: "Yes",
    placement: "Indoor or outdoor",
    footprint: "Approx. 5×5 ft",
    moveability: "Low",
    summary:
      "Premium design-forward traditional sauna with high heat and significant delivery and electrical requirements.",
    pros: ["High heat", "Strong design", "Integrated consumer experience"],
    cons: ["Premium price", "Large footprint", "240 V and delivery complexity"],
    examples: [{ brand: "Plunge", model: "Sauna", url: "https://plunge.com/pages/sauna" }],
    label: { offsetX: -12, offsetY: -15, anchor: "end" },
  },
  {
    id: "premium-prefab-sauna",
    name: "Premium Prefab Sauna",
    type: "Traditional prefab",
    category: "premium-prefab-sauna",
    classification: "Broad category",
    experienceScore: 82,
    complexityScore: 83,
    costs: {
      product: { low: 10000, high: 30000 },
      shipping: { low: 500, high: 5000 },
      installation: { low: 800, high: 5000 },
      electrical: { low: 1500, high: 5000 },
      sitePrep: { low: 0, high: 2500 },
    },
    installTime: "Several days to several weeks",
    electricalRequirement: "240 V",
    maxTypicalTempF: 210,
    waterOnStones: "Yes",
    placement: "Indoor or outdoor",
    footprint: "Usually 5×5 ft or larger",
    moveability: "Low",
    summary:
      "High-quality modular sauna rooms capable of an excellent experience at substantial total project cost.",
    pros: ["Excellent materials", "Broad configurations", "Strong traditional experience"],
    cons: ["Expensive", "Longer lead times", "Semi-permanent"],
    examples: [
      { brand: "Finnleo", model: "Representative model", url: "https://www.finnleo.com" },
      { brand: "TyloHelo", model: "Representative model", url: "https://www.tylohelo.com" },
    ],
    label: { offsetX: -12, offsetY: 24, anchor: "end" },
  },
  {
    id: "custom-built-sauna",
    name: "Custom-Built Sauna",
    type: "Traditional custom",
    category: "custom-built-sauna",
    classification: "Broad category",
    experienceScore: 96,
    complexityScore: 94,
    costs: {
      product: { low: 8000, high: 25000 },
      shipping: { low: 0, high: 5000 },
      installation: { low: 3000, high: 8000 },
      electrical: { low: 1500, high: 5000 },
      sitePrep: { low: 0, high: 2500 },
    },
    installTime: "1 to 4 months or more",
    electricalRequirement: "240 V",
    maxTypicalTempF: 230,
    waterOnStones: "Yes",
    placement: "Indoor or outdoor",
    footprint: "Custom",
    moveability: "Very low",
    summary:
      "Highest ceiling for quality and personalization, paired with the greatest coordination burden and construction risk.",
    pros: ["Best possible ergonomics", "Fully customized", "Architecturally integrated"],
    cons: ["Most expensive", "Contractor quality risk", "Difficult to reverse or move"],
    examples: [],
    label: { offsetX: -12, offsetY: -14, anchor: "end" },
  },
  {
    id: "infrared-sauna",
    name: "Infrared Sauna",
    type: "Infrared",
    category: "infrared-sauna",
    classification: "Broad category",
    experienceScore: 35,
    complexityScore: 22,
    costs: {
      product: { low: 1500, high: 8000 },
      shipping: { low: 0, high: 1000 },
      installation: { low: 0, high: 500 },
      electrical: { low: 0, high: 1500 },
      sitePrep: { low: 0, high: 2500 },
    },
    installTime: "About 30 minutes for a simple plug-in unit",
    electricalRequirement: "120 V",
    maxTypicalTempF: 150,
    waterOnStones: "No",
    placement: "Mostly indoor",
    footprint: "Approx. 4×4 ft",
    moveability: "High",
    summary:
      "Easy to install and widely available, but provides radiant heat rather than a traditional hot-room sauna experience.",
    pros: ["Easy installation", "Indoor friendly", "Many options"],
    cons: ["Not a traditional sauna", "No löyly", "Lower air temperature"],
    examples: [
      { brand: "Clearlight", model: "Representative 2-person model", url: "https://infraredsauna.com" },
      { brand: "Sunlighten", model: "Representative 2-person model", url: "https://www.sunlighten.com" },
    ],
    label: { offsetX: 14, offsetY: -10, anchor: "start" },
  },
  {
    id: "sauna-blanket",
    name: "Sauna Blanket",
    type: "Infrared",
    category: "portable-heat-products",
    classification: "Broad category",
    experienceScore: 14,
    complexityScore: 8,
    costs: {
      product: { low: 70, high: 300 },
      shipping: { low: 0, high: 50 },
      installation: { low: 0, high: 0 },
      electrical: { low: 0, high: 0 },
      sitePrep: { low: 0, high: 0 },
    },
    installTime: "Minutes",
    electricalRequirement: "120 V standard outlet",
    maxTypicalTempF: 150,
    waterOnStones: "No",
    placement: "Indoor",
    footprint: "Stored when not in use",
    moveability: "Very high",
    summary:
      "Portable personal heating product that is convenient but not comparable to sitting inside a sauna room.",
    pros: ["Portable", "Low cost", "Easy to store"],
    cons: ["Not a room sauna", "No stones or steam", "No shared spatial experience"],
    examples: [
      {
        brand: "HigherDOSE",
        model: "Infrared Sauna Blanket",
        url: "https://higherdose.com/products/infrared-sauna-blanket",
      },
    ],
    label: { offsetX: 12, offsetY: -10, anchor: "start" },
  },
];

export const categoryBlobs: CategoryBlob[] = [
  {
    id: "plug-in-traditional",
    label: "Plug-in traditional sauna",
    centerX: 25,
    centerY: 85,
    radiusX: 14,
    radiusY: 12,
    rotation: -8,
    colorFamily: "green",
    opacity: 0.13,
    includedOptionIds: ["anywhere-sauna"],
    summary: "Traditional sauna experience with unusually low installation complexity.",
    pros: ["High heat", "Low electrical burden", "Moveable"],
    cons: ["Smaller room", "Narrower product selection"],
  },
  {
    id: "barrel-sauna",
    label: "Barrel sauna",
    centerX: 55,
    centerY: 62,
    radiusX: 17,
    radiusY: 17,
    rotation: 12,
    colorFamily: "amber",
    opacity: 0.13,
    includedOptionIds: ["almost-heaven", "costco-barrel-sauna"],
    summary:
      "Outdoor traditional saunas with recognizable aesthetics but uneven heat and meaningful project complexity.",
    pros: ["Real stones", "Outdoor friendly", "Many price points"],
    cons: ["Cold-feet risk", "240 V electrical work", "Assembly and foundation requirements"],
  },
  {
    id: "premium-prefab-sauna",
    label: "Premium prefab sauna",
    centerX: 77,
    centerY: 84,
    radiusX: 18,
    radiusY: 14,
    rotation: -10,
    colorFamily: "blue",
    opacity: 0.13,
    includedOptionIds: ["saunalife", "plunge-sauna", "premium-prefab-sauna"],
    summary: "High-quality modular saunas with strong experiences and substantial installed cost.",
    pros: ["Strong materials", "High heat", "Polished design"],
    cons: ["Freight", "Electrical work", "Expensive", "Semi-permanent"],
  },
  {
    id: "custom-built-sauna",
    label: "Custom-built sauna",
    centerX: 91,
    centerY: 94,
    radiusX: 10,
    radiusY: 10,
    rotation: 8,
    colorFamily: "purple",
    opacity: 0.13,
    includedOptionIds: ["custom-built-sauna"],
    summary: "Maximum design freedom and quality ceiling with the largest project burden.",
    pros: ["Best ergonomics", "Custom ventilation", "Architectural integration"],
    cons: ["Cost", "Contractor risk", "Long timeline"],
  },
  {
    id: "infrared-sauna",
    label: "Infrared sauna",
    centerX: 24,
    centerY: 34,
    radiusX: 16,
    radiusY: 14,
    rotation: -12,
    colorFamily: "lavender",
    opacity: 0.13,
    includedOptionIds: ["infrared-sauna"],
    summary: "Easy-to-install radiant heat cabins that differ materially from traditional saunas.",
    pros: ["Plug-in options", "Indoor friendly", "Simple ownership"],
    cons: ["No stones", "Lower air temperature", "Different experience from traditional sauna"],
  },
  {
    id: "portable-heat-products",
    label: "Portable heat products",
    centerX: 10,
    centerY: 14,
    radiusX: 11,
    radiusY: 10,
    rotation: 10,
    colorFamily: "rose",
    opacity: 0.13,
    includedOptionIds: ["sauna-blanket"],
    summary: "Low-cost personal heating products rather than room saunas.",
    pros: ["Portable", "Inexpensive", "No installation"],
    cons: ["Not a room", "No shared experience", "No löyly"],
  },
];

export const blobColorMap: Record<CategoryBlob["colorFamily"], string> = {
  green: "hsl(140, 40%, 55%)",
  amber: "hsl(31, 64%, 55%)",
  blue: "hsl(210, 45%, 55%)",
  purple: "hsl(270, 35%, 55%)",
  lavender: "hsl(250, 40%, 65%)",
  rose: "hsl(350, 45%, 65%)",
};

export function estimatedTotal(o: SaunaOption) {
  const c = o.costs;
  const low = c.product.low + c.shipping.low + c.installation.low + c.electrical.low + c.sitePrep.low;
  const high =
    c.product.high + c.shipping.high + c.installation.high + c.electrical.high + c.sitePrep.high;
  return { low, high };
}

export function formatCostRange(range: { low: number; high: number }) {
  const fmt = (n: number) => `$${n.toLocaleString()}`;
  if (range.low === 0 && range.high === 0) return "Included";
  if (range.low === range.high) return fmt(range.low);
  return `${fmt(range.low)} – ${fmt(range.high)}`;
}
