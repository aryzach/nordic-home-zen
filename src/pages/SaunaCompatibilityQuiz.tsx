import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSEO } from "@/hooks/useSEO";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Zap,
} from "lucide-react";
import { trackEvent, trackAndNavigate } from "@/lib/analytics";
import { BOOKING_URL, openBookingUrl } from "@/lib/booking";
import { useNavigate } from "react-router-dom";

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/e0BSsuTXiQlmmnAr79FQ/webhook-trigger/e4b4135b-afe5-4666-88f5-069a0344ad32";
const STORAGE_KEY = "scq_answers_v2";
const LEAD_SOURCE = "Website Sauna Compatibility Quiz";

const US_STATES: { code: string; name: string }[] = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

type Answers = {
  priorities: string[];
  placement: string[];
  placementOther: string;
  outletNearby: string;
  temperature: string;
  homeType: string;
  homeTypeOther: string;
  ownRent: string;
  budget: string;
  timeline: string;
};

const initialAnswers: Answers = {
  priorities: [],
  placement: [],
  placementOther: "",
  outletNearby: "",
  temperature: "",
  homeType: "",
  homeTypeOther: "",
  ownRent: "",
  budget: "",
  timeline: "",
};

const TOTAL_STEPS = 8;

/* ---------------- Small primitives ---------------- */

const Shell = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className={`flex-grow pt-24 ${className ? className : "pb-20"}`}>
      {children}
    </main>
    <Footer />
  </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card text-foreground border border-border rounded-2xl p-6 md:p-10 max-w-2xl mx-auto shadow-xl">
    {children}
  </div>
);

const Progress = ({ step }: { step: number }) => (
  <div className="w-full max-w-2xl mx-auto mb-6">
    <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
      <div
        className="h-full bg-white transition-all duration-500 ease-out"
        style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
      />
    </div>
    <p className="mt-2 text-xs tracking-[0.18em] uppercase text-white/80 text-center">
      Question {step} of {TOTAL_STEPS}
    </p>
  </div>
);

const OptionButton = ({
  label,
  selected,
  onClick,
  multi,
}: {
  label: string;
  selected?: boolean;
  onClick: () => void;
  multi?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "w-full text-left px-5 py-4 border rounded-xl transition-colors duration-150 flex items-center gap-3",
      "text-[15px] leading-snug",
      selected
        ? "border-[#171717] bg-[#171717] text-white"
        : "border-border bg-card hover:border-[#171717]/60 text-foreground",
    ].join(" ")}
  >
    {multi && (
      <span
        aria-hidden
        className={[
          "h-5 w-5 shrink-0 rounded border flex items-center justify-center transition-colors",
          selected
            ? "bg-white border-white text-[#171717]"
            : "bg-transparent border-muted-foreground/50",
        ].join(" ")}
      >
        {selected && <CheckCircle2 size={14} className="text-[#171717]" />}
      </span>
    )}
    <span className="flex-1">{label}</span>
  </button>
);

const QuestionHeader = ({
  title,
  helper,
  multi,
}: {
  title: string;
  helper?: React.ReactNode;
  multi?: boolean;
}) => (
  <div className="mb-6">
    <h2 className="text-[22px] md:text-[26px] leading-[1.2] font-semibold mb-2">
      {title}
    </h2>
    {multi && (
      <p className="text-sm text-muted-foreground">Select all that apply.</p>
    )}
    {helper && <div className="text-sm text-muted-foreground">{helper}</div>}
  </div>
);

/* ---------------- Recommendation engine ---------------- */

type Tier =
  | "Excellent Fit"
  | "Very Good Fit"
  | "Possible Fit"
  | "Poor Fit";

type Recommendation = {
  id: "anywhere" | "saunalife" | "barrel" | "plunge" | "infrared";
  name: string;
  score: number;
  tier: Tier;
  disqualified: boolean;
  tempRange: string;
  installComplexity: string;
  estInstallCost: string;
  useCase: string;
  whyFit: string;
  image: string;
  totalCost: string;
  plugIn: boolean;
  isAnywhere?: boolean;
  requires240V?: boolean;
};

export type RecommendationResult = {
  recommendations: Recommendation[];
  consultationStrongly: boolean;
  allDisqualified: boolean;
  electricalAssessmentRecommended: boolean;
};

function tierFromScore(score: number, disqualified: boolean): Tier {
  if (disqualified) return "Poor Fit";
  if (score >= 22) return "Excellent Fit";
  if (score >= 14) return "Very Good Fit";
  if (score >= 6) return "Possible Fit";
  return "Poor Fit";
}

function buildRecommendations(a: Answers): RecommendationResult {
  const apartment = a.homeType === "Apartment";
  const condo = a.homeType === "Condo";
  const townhouse = a.homeType === "Townhouse";
  const house = a.homeType === "House";
  const renter = a.ownRent === "Rent";
  const owner = a.ownRent === "Own";

  const deckBalcony = a.placement.includes("Deck / Balcony");
  const backyard = a.placement.includes("Backyard");
  const garage = a.placement.includes("Garage");
  const livingRoom = a.placement.includes("Living room");
  const bedroom = a.placement.includes("Bedroom");
  const bathroom = a.placement.includes("Bathroom");

  const outletNo = a.outletNearby === "No";
  const outletUnsure = a.outletNearby === "Not sure";

  const wantsHigh = a.priorities.includes("High temperatures");
  const wantsPortable = a.priorities.includes("Portable / renter-friendly");
  const wantsInfrared = a.priorities.includes("Red-light therapy");
  const wantsAesthetic = a.priorities.includes("Aesthetic design");
  const wantsLowInstall = a.priorities.includes("Low installation cost");
  const wantsRecovery = a.priorities.includes("Muscle recovery");
  const wantsRelax = a.priorities.includes("Relaxation");
  const wantsDaily = a.priorities.includes("Daily wellness routine");

  const temp150 = a.temperature === "150°F";
  const temp170 = a.temperature === "170°F";
  const temp200 = a.temperature === "200°F";
  const temp230 = a.temperature === "230°F";

  const budgetU3k = a.budget === "Under $3,000";
  const budget3to5k = a.budget === "$3,000–$5,000";
  const budget5to8k = a.budget === "$5,000–$8,000";
  const budget8to12k = a.budget === "$8,000–$12,000";
  const budget12kPlus = a.budget === "$12,000+";

  const electricalAssessmentRecommended =
    outletNo || outletUnsure || temp230 || wantsHigh;

  // ---------- Scoring ----------
  const scores = { anywhere: 0, saunalife: 0, barrel: 0, plunge: 0, infrared: 0 };

  // Anywhere Sauna
  if (apartment) scores.anywhere += 6;
  if (condo) scores.anywhere += 4;
  if (townhouse) scores.anywhere += 3;
  if (house) scores.anywhere += 1;
  if (renter) scores.anywhere += 5;
  if (deckBalcony) scores.anywhere += 4;
  if (livingRoom) scores.anywhere += 3;
  if (bedroom) scores.anywhere += 2;
  if (bathroom) scores.anywhere += 1;
  if (garage) scores.anywhere += 2;
  if (backyard) scores.anywhere += 1;
  if (wantsPortable) scores.anywhere += 5;
  if (wantsLowInstall) scores.anywhere += 5;
  if (wantsHigh) scores.anywhere += 3;
  if (wantsRecovery) scores.anywhere += 2;
  if (wantsRelax) scores.anywhere += 1;
  if (wantsDaily) scores.anywhere += 2;
  if (temp200) scores.anywhere += 4;
  if (temp230) scores.anywhere += 4;
  if (temp170) scores.anywhere += 2;
  if (temp150) scores.anywhere -= 2;
  if (budgetU3k) scores.anywhere -= 3;
  if (budget3to5k) scores.anywhere += 4;
  if (budget5to8k) scores.anywhere += 3;

  // Infrared
  if (apartment) scores.infrared += 4;
  if (renter) scores.infrared += 3;
  if (condo) scores.infrared += 2;
  if (townhouse) scores.infrared += 2;
  if (deckBalcony) scores.infrared += 2;
  if (livingRoom) scores.infrared += 3;
  if (bedroom) scores.infrared += 2;
  if (bathroom) scores.infrared += 1;
  if (temp150) scores.infrared += 8;
  if (temp170) scores.infrared -= 2;
  if (temp200) scores.infrared -= 4;
  if (budgetU3k) scores.infrared += 8;
  if (budget3to5k) scores.infrared += 2;
  if (wantsInfrared) scores.infrared += 8;
  if (wantsDaily) scores.infrared += 4;
  if (wantsRelax) scores.infrared += 2;
  if (wantsLowInstall) scores.infrared += 3;
  if (wantsPortable) scores.infrared += 2;

  // SaunaLife
  if (house) scores.saunalife += 3;
  if (owner) scores.saunalife += 3;
  if (backyard) scores.saunalife += 2;
  if (garage) scores.saunalife += 1;
  if (temp200) scores.saunalife += 5;
  if (temp230) scores.saunalife += 5;
  if (temp170) scores.saunalife += 1;
  if (wantsHigh) scores.saunalife += 3;
  if (wantsRecovery) scores.saunalife += 2;
  if (wantsAesthetic) scores.saunalife += 1;
  if (budget5to8k) scores.saunalife += 4;
  if (budget8to12k) scores.saunalife += 3;
  if (budget12kPlus) scores.saunalife += 2;

  // Barrel
  if (house) scores.barrel += 3;
  if (owner) scores.barrel += 3;
  if (backyard) scores.barrel += 5;
  if (temp170) scores.barrel += 5;
  if (temp200) scores.barrel -= 1;
  if (temp230) scores.barrel -= 8;
  if (wantsAesthetic) scores.barrel += 5;
  if (wantsRelax) scores.barrel += 3;
  if (wantsDaily) scores.barrel += 1;
  if (budget5to8k) scores.barrel += 3;
  if (budget8to12k) scores.barrel += 1;

  // Plunge Mini
  if (house) scores.plunge += 3;
  if (owner) scores.plunge += 3;
  if (backyard) scores.plunge += 2;
  if (temp200) scores.plunge += 3;
  if (temp230) scores.plunge += 5;
  if (temp170) scores.plunge += 1;
  if (wantsAesthetic) scores.plunge += 4;
  if (wantsHigh) scores.plunge += 3;
  if (wantsRelax) scores.plunge += 1;
  if (budget5to8k) scores.plunge -= 2;
  if (budget8to12k) scores.plunge += 8;
  if (budget12kPlus) scores.plunge += 10;

  const consultationStrongly =
    electricalAssessmentRecommended ||
    a.timeline === "As soon as possible" ||
    a.timeline === "Within 1 month" ||
    a.timeline === "Within 3 months";

  const reasons = {
    anywhere: renter || apartment || condo || townhouse
      ? "Best fit because you want a real sauna experience without modifying your unit. The Anywhere Sauna runs on a standard 120V outlet, so there's no electrician, no permits, and no 240V install."
      : wantsLowInstall || wantsPortable
        ? "Best fit because you want high temperatures with low installation complexity. The Anywhere Sauna is designed for plug-and-play 120V setups and can reach traditional sauna temperatures."
        : "Likely best option — reaches traditional sauna temperatures on a normal household outlet with no permits or electrical work.",
    saunalife: "Best fit if you want a more permanent traditional sauna for your home and backyard.",
    barrel: "Best fit if aesthetics, backyard design, and relaxation matter more than maximum heat. Barrel saunas look great, but typically don't deliver the same even high-heat experience as cube-style saunas.",
    plunge: "Best fit for a higher-budget buyer who wants a premium, design-forward sauna with high heat.",
    infrared: wantsInfrared
      ? "Best fit if your priority is infrared heat and red-light therapy rather than steam."
      : "Best fit if your priority is a low-cost daily wellness routine around 150°F. It's not a traditional high-heat sauna, but it works well for small spaces and standard outlets.",
  };

  const base: Omit<Recommendation, "score" | "tier" | "disqualified" | "whyFit">[] = [
    {
      id: "anywhere",
      name: "Anywhere Sauna",
      tempRange: "170–230°F",
      installComplexity: "Plug-and-play — no electrician",
      estInstallCost: "$0 install (standard 120V outlet)",
      useCase: "Steam sauna for apartments, rentals, condos, and homes",
      image: "/images/sauna-type-anywhere.jpg",
      totalCost: "$4,599 delivered",
      plugIn: true,
      isAnywhere: true,
    },
    {
      id: "saunalife",
      name: "SaunaLife CL3G Cube",
      tempRange: "170–230°F",
      installComplexity: "High — 240V dedicated circuit + electrician",
      estInstallCost: "$800–$2,500 for 240V circuit",
      useCase: "Compact prefab traditional sauna for homeowners",
      image: "/images/compare-nordica.png",
      totalCost: "$6,149+ all-in",
      plugIn: false,
      requires240V: true,
    },
    {
      id: "barrel",
      name: "Barrel Sauna",
      tempRange: "160–190°F",
      installComplexity: "High — site prep + 240V electrician",
      estInstallCost: "$1,500–$4,000 site prep + electrical",
      useCase: "Outdoor backyard sauna for homeowners",
      image: "/images/compare-barrel.png",
      totalCost: "$5,399+ all-in",
      plugIn: false,
      requires240V: true,
    },
    {
      id: "plunge",
      name: "Plunge Mini Sauna",
      tempRange: "170–230°F",
      installComplexity: "High — 240V dedicated circuit",
      estInstallCost: "$800–$2,500 for 240V circuit",
      useCase: "Premium high-heat sauna with designer aesthetic",
      image: "/images/compare-plunge.png",
      totalCost: "$11,089+ all-in",
      plugIn: false,
      requires240V: true,
    },
    {
      id: "infrared",
      name: "Infrared Sauna",
      tempRange: "~150°F (infrared)",
      installComplexity: "Low — plugs into a standard outlet",
      estInstallCost: "$0 install",
      useCase: "Low-heat infrared + red-light therapy",
      image: "/images/compare-infrared.png",
      totalCost: "$2,299+ all-in",
      plugIn: true,
    },
  ];

  const recs: Recommendation[] = base.map((b) => {
    const score = scores[b.id];
    const tier = tierFromScore(score, false);
    return {
      ...b,
      score,
      disqualified: false,
      tier,
      whyFit: reasons[b.id],
    };
  });

  recs.sort((a, b) => b.score - a.score);

  const INCLUDE_THRESHOLD = 8;
  const trimmed: Recommendation[] = [];
  recs.forEach((r, idx) => {
    if (idx === 0) trimmed.push(r);
    else if (trimmed.length < 3 && r.score >= INCLUDE_THRESHOLD) trimmed.push(r);
  });

  return {
    recommendations: trimmed,
    consultationStrongly,
    allDisqualified: false,
    electricalAssessmentRecommended,
  };
}

/* ---------------- Personalized match bullets ---------------- */

function buildMatchBullets(rec: Recommendation, a: Answers): string[] {
  const bullets: string[] = [];
  const home = a.homeType || "your home";
  const homeLc = home.toLowerCase();
  const renter = a.ownRent === "Rent";
  const owner = a.ownRent === "Own";
  const apartmentLike =
    a.homeType === "Apartment" ||
    a.homeType === "Condo" ||
    a.homeType === "Townhouse";
  const wantsLowInstall = a.priorities.includes("Low installation cost");
  const wantsPortable = a.priorities.includes("Portable / renter-friendly");
  const wantsHigh = a.priorities.includes("High temperatures");
  const wantsInfrared = a.priorities.includes("Red-light therapy");
  const wantsAesthetic = a.priorities.includes("Aesthetic design");
  const budgetU5k =
    a.budget === "Under $3,000" || a.budget === "$3,000–$5,000";
  const budget5to8 = a.budget === "$5,000–$8,000";
  const budget8plus =
    a.budget === "$8,000–$12,000" || a.budget === "$12,000+";
  const temp = a.temperature;
  const backyard = a.placement.includes("Backyard");

  if (rec.id === "anywhere") {
    if (apartmentLike) bullets.push(`Works in ${homeLc}s — no modifications required`);
    else if (a.homeType === "House") bullets.push("Works in your house without renovation");
    if (renter || wantsPortable) bullets.push("Renter-friendly — moves with you");
    if (wantsLowInstall) bullets.push("No electrician, permits, or 240V circuit");
    else bullets.push("Runs on a standard 120V outlet");
    if (temp === "200°F" || temp === "230°F" || wantsHigh)
      bullets.push(`Reaches your desired ${temp || "high"} temperature`);
    else if (temp) bullets.push(`Comfortably reaches ${temp}`);
    if (budgetU5k) bullets.push("Fits inside your budget ($4,599 delivered)");
    else if (budget5to8) bullets.push("Well under your budget at $4,599 delivered");
  } else if (rec.id === "saunalife") {
    if (a.homeType === "House") bullets.push("Suited for houses with dedicated space");
    if (owner) bullets.push("You own your home — permanent install is realistic");
    if (temp === "200°F" || temp === "230°F" || wantsHigh)
      bullets.push(`Reaches your desired ${temp || "high"} temperature`);
    if (budget5to8 || budget8plus) bullets.push("Fits inside your budget once install is included");
    bullets.push("Requires a 240V circuit and licensed electrician");
  } else if (rec.id === "barrel") {
    if (backyard) bullets.push("Designed for backyard placement");
    if (wantsAesthetic) bullets.push("Matches your interest in a design-forward look");
    if (temp === "150°F" || temp === "170°F")
      bullets.push(`Reaches your desired ${temp}`);
    if (owner) bullets.push("Best for homeowners — permanent outdoor install");
    bullets.push("Requires site prep and 240V electrical");
  } else if (rec.id === "plunge") {
    if (wantsAesthetic) bullets.push("Premium, design-forward aesthetic");
    if (temp === "200°F" || temp === "230°F" || wantsHigh)
      bullets.push(`Reaches your desired ${temp || "high"} temperature`);
    if (budget8plus) bullets.push("Fits inside your higher budget range");
    bullets.push("Requires a 240V circuit");
  } else if (rec.id === "infrared") {
    if (wantsInfrared) bullets.push("Matches your interest in red-light therapy");
    if (apartmentLike) bullets.push(`Works in ${homeLc}s on a standard outlet`);
    if (a.budget === "Under $3,000" || wantsLowInstall)
      bullets.push("Low upfront cost, no install required");
    bullets.push("Tops out around 150°F — not a traditional steam sauna");
  }

  return bullets.slice(0, 5);
}

/* ---------------- Page ---------------- */

const PRIORITY_OPTIONS = [
  "High temperatures",
  "Portable / renter-friendly",
  "Red-light therapy",
  "Aesthetic design",
  "Low installation cost",
  "Muscle recovery",
  "Relaxation",
  "Daily wellness routine",
];

const PLACEMENT_OPTIONS = [
  "Backyard",
  "Garage",
  "Living room",
  "Bedroom",
  "Bathroom",
  "Deck / Balcony",
];

const HOME_TYPE_OPTIONS = ["Apartment", "Condo", "Townhouse", "House"];

const BUDGET_OPTIONS = [
  "Under $3,000",
  "$3,000–$5,000",
  "$5,000–$8,000",
  "$8,000–$12,000",
  "$12,000+",
  "Not sure",
];

const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 1 month",
  "Within 3 months",
  "Within 6 months",
  "Just researching",
];

const SaunaCompatibilityQuiz = () => {
  useSEO({
    title: "Sauna Compatibility Quiz | Anywhere Sauna",
    description:
      "Answer a few questions about your home, electrical setup, budget, and goals to see which sauna options are actually compatible with your home.",
    canonical: "https://sfsaunarental.com/sauna-compatibility-quiz",
  });

  const navigate = useNavigate();
  const [view, setView] = useState<
    "hero" | "quiz" | "capture" | "results"
  >("hero");
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [questions, setQuestions] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers({ ...initialAnswers, ...JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {}
  }, [answers]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view, step]);

  const recommendationResult = useMemo(
    () => buildRecommendations(answers),
    [answers]
  );

  const startQuiz = () => {
    trackEvent("sauna_compatibility_quiz_started", {
      button_text: "Take the 2-Minute Compatibility Quiz",
    });
    trackEvent("compatibility_quiz_started", {});
    setView("quiz");
    setStep(1);
  };

  const advance = () => {
    if (step >= TOTAL_STEPS) {
      trackEvent("compatibility_quiz_completed", flattenAnswers(answers));
      setView("capture");
    } else {
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (view === "capture") {
      setView("quiz");
      setStep(TOTAL_STEPS);
      return;
    }
    if (view === "results") {
      setView("capture");
      return;
    }
    if (step === 1) {
      setView("hero");
      return;
    }
    setStep((s) => s - 1);
  };

  const toggleMulti = (
    key: "placement" | "priorities",
    value: string
  ) => {
    setAnswers((a) => {
      const current = a[key];
      return current.includes(value)
        ? { ...a, [key]: current.filter((v) => v !== value) }
        : { ...a, [key]: [...current, value] };
    });
  };

  const setSingle = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((a) => ({ ...a, [key]: value }));
  };

  const submitCapture = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !city || !stateVal) return;
    setSubmitting(true);

    const flat = flattenAnswers(answers);
    const analyticsPayload = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone.trim() || undefined,
      city,
      state: stateVal,
      questions: questions.trim() || undefined,
      ...flat,
    };
    trackEvent("sauna_compatibility_quiz_submitted", analyticsPayload);
    trackEvent("compatibility_email_submitted", {
      email,
      questions: questions.trim() || undefined,
      ...flat,
    });
    if (phone.trim()) {
      trackEvent("compatibility_phone_submitted", { phone, ...flat });
    }
    if (questions.trim()) {
      trackEvent("compatibility_questions_submitted", {
        questions,
        ...flat,
      });
    }

    // Fire-and-forget to GoHighLevel so we capture the lead, then show results.
    try {
      const payload: Record<string, string> = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone.trim(),
        city,
        state: stateVal,
        home_type: answers.homeType,
        own_rent: answers.ownRent,
        placement: answers.placement.join(" | "),
        outlet_within_50ft: answers.outletNearby,
        priorities: answers.priorities.join(" | "),
        temperature: answers.temperature,
        budget: answers.budget,
        timeline: answers.timeline,
        message: questions.trim(),
        lead_source: LEAD_SOURCE,
      };
      if (answers.homeType === "Other" && answers.homeTypeOther.trim()) {
        payload.home_type_other = answers.homeTypeOther.trim();
      }
      if (
        answers.placement.includes("Other") &&
        answers.placementOther.trim()
      ) {
        payload.placement_other = answers.placementOther.trim();
      }

      fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            // eslint-disable-next-line no-console
            console.error(
              "[Sauna Compatibility Quiz] Webhook failed",
              res.status,
              res.statusText
            );
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error("[Sauna Compatibility Quiz] Network error", err);
        });
    } catch {}

    trackEvent("compatibility_results_viewed", flat);
    setView("results");
    setSubmitting(false);
  };

  /* ---------------- Render ---------------- */

  return (
    <Shell className="pb-0">
      <HeroShell>
        {view === "hero" && <HeroContent onStart={startQuiz} />}

        {view !== "hero" && (
          <div className="max-w-2xl mx-auto mb-3">
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>
          </div>
        )}

        {view === "quiz" && <Progress step={step} />}

        {view === "quiz" && (
          <Card>
            {step === 1 && (
              <>
                <QuestionHeader
                  title="What's most important to you in a sauna?"
                  multi
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRIORITY_OPTIONS.map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      multi
                      selected={answers.priorities.includes(o)}
                      onClick={() => toggleMulti("priorities", o)}
                    />
                  ))}
                </div>
                <NextRow
                  disabled={answers.priorities.length === 0}
                  onNext={advance}
                />
              </>
            )}

            {step === 2 && (
              <>
                <QuestionHeader
                  title="Where are you considering putting the sauna?"
                  multi
                />
                <div className="space-y-3">
                  {PLACEMENT_OPTIONS.map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      multi
                      selected={answers.placement.includes(o)}
                      onClick={() => toggleMulti("placement", o)}
                    />
                  ))}
                  <OtherInput
                    selected={answers.placement.includes("Other")}
                    onSelect={() => toggleMulti("placement", "Other")}
                    value={answers.placementOther}
                    onChange={(v) => setSingle("placementOther", v)}
                  />
                </div>
                <NextRow
                  disabled={answers.placement.length === 0}
                  onNext={advance}
                />
              </>
            )}

            {step === 3 && (
              <>
                <QuestionHeader title="Is there a standard 3-prong electrical outlet within 50 feet?" />
                <div className="space-y-3">
                  {["Yes", "No", "Not sure"].map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      selected={answers.outletNearby === o}
                      onClick={() => setSingle("outletNearby", o)}
                    />
                  ))}
                </div>
                <NextRow disabled={!answers.outletNearby} onNext={advance} />
              </>
            )}

            {step === 4 && (
              <>
                <QuestionHeader title="What temperature would you like your sauna to reach?" />
                <div className="space-y-3">
                  {["150°F", "170°F", "200°F", "230°F", "Not sure"].map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      selected={answers.temperature === o}
                      onClick={() => setSingle("temperature", o)}
                    />
                  ))}
                </div>
                <NextRow disabled={!answers.temperature} onNext={advance} />
              </>
            )}

            {step === 5 && (
              <>
                <QuestionHeader title="What type of home do you live in?" />
                <div className="space-y-3">
                  {HOME_TYPE_OPTIONS.map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      selected={answers.homeType === o}
                      onClick={() => setSingle("homeType", o)}
                    />
                  ))}
                  <OtherInput
                    selected={answers.homeType === "Other"}
                    onSelect={() => setSingle("homeType", "Other")}
                    value={answers.homeTypeOther}
                    onChange={(v) => setSingle("homeTypeOther", v)}
                  />
                </div>
                <NextRow disabled={!answers.homeType} onNext={advance} />
              </>
            )}

            {step === 6 && (
              <>
                <QuestionHeader title="Do you own or rent your home?" />
                <div className="space-y-3">
                  {["Own", "Rent"].map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      selected={answers.ownRent === o}
                      onClick={() => setSingle("ownRent", o)}
                    />
                  ))}
                </div>
                <NextRow disabled={!answers.ownRent} onNext={advance} />
              </>
            )}

            {step === 7 && (
              <>
                <QuestionHeader title="What's your approximate budget?" />
                <div className="space-y-3">
                  {BUDGET_OPTIONS.map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      selected={answers.budget === o}
                      onClick={() => setSingle("budget", o)}
                    />
                  ))}
                </div>
                <NextRow disabled={!answers.budget} onNext={advance} />
              </>
            )}

            {step === 8 && (
              <>
                <QuestionHeader title="When are you hoping to get a sauna?" />
                <div className="space-y-3">
                  {TIMELINE_OPTIONS.map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      selected={answers.timeline === o}
                      onClick={() => setSingle("timeline", o)}
                    />
                  ))}
                </div>
                <NextRow
                  disabled={!answers.timeline}
                  onNext={advance}
                  label="See My Results"
                />
              </>
            )}
          </Card>
        )}

        {view === "capture" && (
          <Card>
            <h2 className="text-[26px] md:text-[32px] leading-[1.15] font-semibold mb-3">
              Your Results Are Ready
            </h2>
            <p className="text-muted-foreground mb-6">
              We found several sauna options that may work for your home.
            </p>
            <ul className="space-y-2 mb-7">
              {[
                "Compatible sauna types",
                "Electrical requirements",
                "Expected temperatures",
                "Estimated installation costs",
                "Recommended products",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px]">
                  <CheckCircle2
                    className="text-[#171717] flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <form onSubmit={submitCapture} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1.5"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1.5"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1.5"
                  placeholder="(555) 555-5555"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  We'll text your recommendations and may follow up with a quick call.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1.5"
                    placeholder="San Francisco"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <select
                    id="state"
                    required
                    value={stateVal}
                    onChange={(e) => setStateVal(e.target.value)}
                    className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select state…</option>
                    {US_STATES.map((s) => (
                      <option key={s.code} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="questions">Questions? (optional)</Label>
                <Textarea
                  id="questions"
                  name="questions"
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                  className="mt-1.5 min-h-[100px]"
                  placeholder="Tell us about your space, timeline, or anything you'd like us to know..."
                />
              </div>

              <Button
                type="submit"
                disabled={
                  submitting ||
                  !firstName ||
                  !lastName ||
                  !email ||
                  !phone ||
                  !city ||
                  !stateVal
                }
                className="w-full"
                size="lg"
              >
                {submitting ? "Loading…" : "Show My Results"}
              </Button>
            </form>
          </Card>
        )}

        {view === "results" && (
          <ResultsView
            result={recommendationResult}
            answers={answers}
            onBookConsult={() => {
              trackAndNavigate(
                "compatibility_consultation_clicked",
                {
                  location: "compatibility_results",
                  ...flattenAnswers(answers),
                },
                openBookingUrl
              );
            }}
            onCompareClick={() => {
              trackEvent("compatibility_compare_clicked", {
                location: "compatibility_results",
                ...flattenAnswers(answers),
              });
              navigate("/compare");
            }}
          />
        )}
      </HeroShell>
    </Shell>
  );
};

/* ---------------- Sub-components ---------------- */

const HeroShell = ({ children }: { children: React.ReactNode }) => (
  <div className="relative -mt-6 mb-0 overflow-hidden min-h-[max(216vw,calc(100vh-96px))] md:min-h-[calc(100vh-96px)]">
    {/* Mobile hero: portrait */}
    <img
      src="/quiz-hero.jpg"
      alt="Lineup of sauna types with prices: Anywhere Sauna, SaunaLife, Barrel Sauna, Plunge Mini, Infrared Sauna"
      className="absolute inset-0 w-full h-full object-cover object-bottom md:hidden"
      loading="eager"
    />
    {/* Desktop hero: landscape */}
    <img
      src="/quiz-hero-desktop.jpg"
      alt="Lineup of sauna types with prices: Anywhere Sauna, SaunaLife, Barrel Sauna, Plunge Mini, Infrared Sauna"
      className="absolute inset-0 w-full h-full object-cover object-bottom hidden md:block"
      loading="eager"
    />
    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/30" />
    <div className="relative z-10 w-full px-6 md:px-12 pt-10 md:pt-16 pb-16">
      {children}
    </div>
  </div>
);

const HeroContent = ({ onStart }: { onStart: () => void }) => (
  <div className="max-w-xl mx-auto md:mx-0">
    <h1 className="sr-only">What Sauna Will Actually Work In Your Home?</h1>
    <p className="text-white text-[30px] md:text-[54px] leading-[1.1] md:leading-[1.02] font-bold tracking-tight mb-4 text-center md:text-left">
      What Sauna Will Actually Work In Your Home?
    </p>
    <div className="flex flex-col items-center md:items-start gap-3">
      <button
        type="button"
        onClick={onStart}
        className="bg-white text-[#171717] hover:bg-white/90 text-[16px] font-bold px-5 py-[11px] inline-flex items-center gap-2"
      >
        Take the 2-Minute Compatibility Quiz
        <ArrowRight size={16} />
      </button>
      <p className="text-[15px] md:text-[16px] leading-[1.6] text-white/80 font-normal max-w-sm md:max-w-md text-center md:text-left">
        Get personalized recommendations. Answer a few questions about your home, electrical setup, budget, and goals to see which sauna options are compatible.
      </p>
    </div>
  </div>
);

const NextRow = ({
  disabled,
  onNext,
  label = "Continue",
}: {
  disabled?: boolean;
  onNext: () => void;
  label?: string;
}) => (
  <div className="mt-7">
    <Button
      onClick={onNext}
      disabled={disabled}
      className="w-full"
      size="lg"
    >
      {label}
      <ArrowRight size={18} />
    </Button>
  </div>
);

const OtherInput = ({
  selected,
  onSelect,
  value,
  onChange,
}: {
  selected: boolean;
  onSelect: () => void;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div
    className={[
      "border rounded-xl transition-colors",
      selected ? "border-[#171717]" : "border-border",
    ].join(" ")}
  >
    <button
      type="button"
      onClick={onSelect}
      className={[
        "w-full text-left px-5 py-4 text-[15px]",
        selected ? "text-[#171717] font-medium" : "text-foreground",
      ].join(" ")}
    >
      Other
    </button>
    {selected && (
      <div className="px-5 pb-4">
        <Input
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tell us more…"
        />
      </div>
    )}
  </div>
);

const TIER_CLASSES: Record<Tier, string> = {
  "Excellent Fit": "bg-emerald-700 text-white",
  "Very Good Fit": "bg-emerald-600 text-white",
  "Possible Fit": "bg-amber-500 text-white",
  "Poor Fit": "bg-muted text-muted-foreground",
};

const TierBadge = ({ tier }: { tier: Tier }) => (
  <div
    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs uppercase tracking-[0.15em] ${TIER_CLASSES[tier]}`}
  >
    {tier}
  </div>
);

const RankBadge = ({ rank }: { rank: number }) => {
  const labels = ["1st", "2nd", "3rd"];
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] text-white text-xs uppercase tracking-[0.15em]">
      {labels[rank - 1] || `${rank}th`} recommendation
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="py-3 border-b border-border last:border-b-0 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4">
    <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
      {label}
    </div>
    <div className="text-[15px] text-foreground">{value}</div>
  </div>
);

const ConsultCTA = ({
  heading,
  body,
  onBookConsult,
  emphasized,
}: {
  heading: string;
  body: string;
  onBookConsult: () => void;
  emphasized?: boolean;
}) => (
  <div
    className={`mt-12 rounded-2xl p-8 md:p-12 text-center ${
      emphasized
        ? "bg-[#171717] text-white border border-[#171717]"
        : "bg-card text-foreground border border-border"
    }`}
  >
    <h2 className="text-[26px] md:text-[34px] font-semibold mb-3 text-white">{heading}</h2>
    <p
      className={`max-w-xl mx-auto mb-6 ${
        emphasized ? "text-white/80" : "text-muted-foreground"
      }`}
    >
      {body}
    </p>
    <Button
      onClick={onBookConsult}
      size="lg"
      variant={emphasized ? "secondary" : "outline"}
      className="max-w-full whitespace-normal h-auto py-3 text-center"
    >
      Book Free 30-Minute Consultation
      <ExternalLink size={16} />
    </Button>
  </div>
);

const SummaryCard = ({
  rec,
  rank,
  onCardClick,
}: {
  rec: Recommendation;
  rank: number;
  onCardClick: () => void;
}) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onCardClick}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onCardClick();
      }
    }}
    className="bg-card border border-border rounded-2xl p-5 md:p-6 flex items-center gap-4 md:gap-6 cursor-pointer transition-colors hover:border-[#171717]"
  >
    <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden bg-secondary/40">
      <img
        src={rec.image}
        alt={rec.name}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
    <div className="flex-1 min-w-0">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <RankBadge rank={rank} />
        <TierBadge tier={rec.tier} />
      </div>
      <h3 className="text-[18px] md:text-[22px] font-semibold leading-tight mb-1">
        {rec.name}
      </h3>
      <p className="text-[14px] text-muted-foreground">
        {rec.totalCost} · {rec.plugIn ? "Plug-in" : "Not plug-in"}
      </p>
    </div>
  </div>
);

const ElectricalNote = () => (
  <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-300/60 bg-amber-50 px-3 py-2 text-[13px] text-amber-900">
    <Zap size={14} className="mt-0.5 shrink-0" />
    <span>
      Final recommendation depends on confirming your available electrical service.
    </span>
  </div>
);

const CheckLi = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2 text-[15px] text-foreground">
    <CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-600" />
    <span>{children}</span>
  </li>
);

const ConfidenceCard = ({ answers }: { answers: Answers }) => {
  const items: string[] = [];
  if (answers.homeType) items.push("Home type");
  if (answers.placement.length) items.push("Placement");
  if (answers.budget) items.push("Budget");
  if (answers.temperature) items.push("Desired temperature");
  if (answers.priorities.length) items.push("Lifestyle goals");
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-10">
      <div className="flex items-center justify-between gap-4 mb-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Assessment confidence
        </p>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-700 text-white text-xs uppercase tracking-[0.15em]">
          High
        </span>
      </div>
      <p className="text-[15px] leading-relaxed text-foreground mb-2">
        Based on your answers we can narrow your options considerably.
      </p>
      <p className="text-[15px] leading-relaxed text-muted-foreground mb-5">
        However, one important factor still needs to be verified before making a
        final recommendation.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 mb-5">
        {items.map((i) => (
          <CheckLi key={i}>{i}</CheckLi>
        ))}
      </ul>
      <div className="pt-4 border-t border-border">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Remaining uncertainty
        </p>
        <div className="flex items-start gap-2 text-[15px] text-foreground">
          <Zap size={16} className="mt-1 shrink-0 text-amber-600" />
          <span>Available electrical service</span>
        </div>
      </div>
    </div>
  );
};

const RankStripe = ({ rank }: { rank: number }) => {
  const label = rank === 1 ? "1st recommendation" : rank === 2 ? "2nd recommendation" : rank === 3 ? "3rd recommendation" : `${rank}th`;
  return (
    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </p>
  );
};

const RecommendationCard = ({
  rec,
  rank,
  answers,
  primary,
  showElectricalNote,
}: {
  rec: Recommendation;
  rank: number;
  answers: Answers;
  primary?: boolean;
  showElectricalNote?: boolean;
}) => {
  const bullets = buildMatchBullets(rec, answers);
  return (
    <div
      className={`bg-card rounded-2xl transition-shadow ${
        primary
          ? "border border-[#171717] p-6 md:p-10 shadow-sm"
          : "border border-border p-6 md:p-8"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <RankStripe rank={rank} />
          <h3
            className={`font-semibold leading-tight mt-2 ${
              primary ? "text-[26px] md:text-[32px]" : "text-[20px] md:text-[24px]"
            }`}
          >
            {rec.name}
          </h3>
          <p className="text-[14px] text-muted-foreground mt-1">
            {rec.totalCost} · {rec.plugIn ? "Plug-in" : "Requires 240V"}
          </p>
        </div>
        <TierBadge tier={rec.tier} />
      </div>

      {bullets.length > 0 && (
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Why it matches your answers
          </p>
          <ul className="space-y-2">
            {bullets.map((b) => (
              <CheckLi key={b}>{b}</CheckLi>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-border pt-4">
        <Row label="Expected temps" value={rec.tempRange} />
        <Row label="Install complexity" value={rec.installComplexity} />
        <Row label="Est. install cost" value={rec.estInstallCost} />
        <Row label="All-in cost" value={rec.totalCost} />
        <Row label="Best use case" value={rec.useCase} />
      </div>

      {showElectricalNote && rec.requires240V && <ElectricalNote />}
    </div>
  );
};

const FinalCompatibilityCheck = ({
  onBookConsult,
}: {
  onBookConsult: () => void;
}) => (
  <div className="mt-12 rounded-2xl border border-[#171717] bg-[#171717] text-white p-8 md:p-12">
    <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-3">
      Final compatibility check
    </p>
    <h2 className="text-[26px] md:text-[34px] leading-[1.15] font-semibold text-white mb-4">
      One thing still needs to be verified.
    </h2>
    <p className="text-white/85 leading-relaxed mb-3 max-w-2xl">
      Everything in your assessment points toward these recommendations.
    </p>
    <p className="text-white/85 leading-relaxed mb-6 max-w-2xl">
      Before spending thousands of dollars on a sauna, we recommend confirming
      your home's electrical setup.
    </p>
    <p className="text-white/70 text-[13px] uppercase tracking-[0.18em] mb-3">
      In a quick video call we'll determine
    </p>
    <ul className="space-y-2 mb-6 max-w-2xl">
      {[
        "Whether your existing outlets work",
        "Whether a dedicated circuit is needed",
        "Which sauna gives you the best value",
        "Whether there's an even better option than our recommendation",
        "Any installation issues we notice",
      ].map((t) => (
        <li
          key={t}
          className="flex items-start gap-2 text-[15px] text-white/90"
        >
          <CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-400" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/85 leading-relaxed mb-6 max-w-2xl">
      <span className="font-semibold text-white">Bottom line: </span>
      We'll tell you what we'd buy if this were our own house.
    </p>
    <Button
      onClick={onBookConsult}
      size="lg"
      variant="secondary"
      className="max-w-full whitespace-normal h-auto py-3 text-center"
    >
      Verify My Home Compatibility
      <ExternalLink size={16} />
    </Button>
  </div>
);

const ComparisonTable = () => {
  const cols = [
    { name: "Anywhere Sauna", highlight: true },
    { name: "SaunaLife" },
    { name: "Almost Heaven" },
    { name: "Traditional custom" },
  ];
  const rows: { label: string; values: string[] }[] = [
    { label: "Price", values: ["$4,599", "$4,500–$6,000", "$5,000–$8,000", "$15,000+"] },
    { label: "Expected install cost", values: ["$0", "$800–$2,500", "$1,500–$4,000", "$5,000–$20,000"] },
    { label: "Electrician needed", values: ["No", "Yes (240V)", "Yes (240V)", "Yes"] },
    { label: "Expected temperature", values: ["170–230°F", "170–230°F", "160–200°F", "180–230°F"] },
    { label: "Indoor", values: ["Yes", "Yes", "Limited", "Yes"] },
    { label: "Outdoor", values: ["Yes", "Yes", "Yes", "Yes"] },
    { label: "Apartment friendly", values: ["Yes", "No", "No", "No"] },
    { label: "Moveable", values: ["Yes", "No", "No", "No"] },
    { label: "Est. total installed cost", values: ["$4,599", "$5,300–$8,500", "$6,500–$12,000", "$20,000–$35,000"] },
  ];
  return (
    <div className="mt-12">
      <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-3">
        How the options compare
      </p>
      <h2 className="text-[24px] md:text-[30px] font-semibold text-white mb-6">
        Side-by-side comparison
      </h2>
      <div className="bg-card border border-border rounded-2xl overflow-x-auto">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 font-normal text-xs uppercase tracking-[0.15em] text-muted-foreground w-48">
                &nbsp;
              </th>
              {cols.map((c) => (
                <th
                  key={c.name}
                  className={`p-4 font-semibold ${
                    c.highlight ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-border last:border-b-0">
                <td className="p-4 text-xs uppercase tracking-[0.15em] text-muted-foreground align-top">
                  {r.label}
                </td>
                {r.values.map((v, i) => (
                  <td
                    key={i}
                    className={`p-4 align-top ${
                      cols[i].highlight ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StillNotSureCTA = ({ onBookConsult }: { onBookConsult: () => void }) => (
  <div className="mt-12 rounded-2xl border border-border bg-card p-8 md:p-12 text-center">
    <h2 className="text-[26px] md:text-[34px] font-semibold mb-3">
      Still Not Sure?
    </h2>
    <p className="text-muted-foreground max-w-xl mx-auto mb-2">
      Every home is different.
    </p>
    <p className="text-muted-foreground max-w-xl mx-auto mb-6">
      We'll review your assessment together and tell you honestly whether these
      recommendations are correct — or if we'd recommend something else.
    </p>
    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
      Free · 10 minute video call
    </p>
    <Button
      onClick={onBookConsult}
      size="lg"
      className="max-w-full whitespace-normal h-auto py-3 text-center"
    >
      Review My Home Assessment
      <ExternalLink size={16} />
    </Button>
  </div>
);

const TrustSection = () => (
  <div className="mt-12 mb-4">
    <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-3 text-center">
      Why people book the assessment
    </p>
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          "Average homeowner saves thousands by avoiding the wrong sauna",
          "No obligation",
          "We'll recommend competitors if they're genuinely a better fit",
          "Used by homeowners, renters and apartment owners across the US",
        ].map((t) => (
          <CheckLi key={t}>{t}</CheckLi>
        ))}
      </ul>
    </div>
  </div>
);

const ResultsView = ({
  result,
  answers,
  onBookConsult,
  onCompareClick: _onCompareClick,
}: {
  result: RecommendationResult;
  answers: Answers;
  onBookConsult: () => void;
  onCompareClick: () => void;
}) => {
  const {
    recommendations,
    allDisqualified,
    electricalAssessmentRecommended,
  } = result;

  if (allDisqualified) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-white mb-3">
            Your home sauna assessment
          </p>
          <h1 className="text-[32px] md:text-[44px] leading-[1.1] font-semibold mb-3 text-white">
            Let's Find a Creative Fit
          </h1>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 md:p-10 text-center">
          <p className="text-[16px] leading-relaxed text-foreground mb-6">
            No sauna appears to be an ideal fit based on your current setup and
            goals. Book a video call and we'll see if there's a creative
            solution for your home.
          </p>
          <Button
            onClick={onBookConsult}
            size="lg"
            className="max-w-full whitespace-normal h-auto py-3 text-center"
          >
            Verify My Home Compatibility
            <ExternalLink size={16} />
          </Button>
        </div>
      </div>
    );
  }

  const eligible = recommendations.filter((r) => !r.disqualified);
  const [best, ...rest] = eligible;
  const topThree = [best, ...rest].filter(Boolean).slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto">
      {/* SECTION 1 — Hero */}
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/80 mb-3">
          Your home sauna assessment
        </p>
        <h1 className="text-[32px] md:text-[44px] leading-[1.1] font-semibold mb-4 text-white">
          Your Home Sauna Assessment
        </h1>
        <p className="text-white/85 max-w-2xl mx-auto leading-relaxed">
          Based on your home, electrical setup, desired temperature, budget, and
          goals, here are the sauna options most likely to work for your space.
        </p>
      </div>

      <ConfidenceCard answers={answers} />

      {/* SECTION 2 + 4 — Recommendations with personalized bullets and specs */}
      <div className="space-y-6">
        {topThree.map((rec, idx) => (
          <RecommendationCard
            key={rec.name}
            rec={rec}
            rank={idx + 1}
            answers={answers}
            primary={idx === 0}
            showElectricalNote={electricalAssessmentRecommended}
          />
        ))}
      </div>

      {/* SECTION 3 — Final Compatibility Check (moved below recommendations) */}
      <FinalCompatibilityCheck onBookConsult={onBookConsult} />

      {/* SECTION 5 — Comparison table */}
      <ComparisonTable />

      {/* SECTION 6 — Bottom CTA */}
      <StillNotSureCTA onBookConsult={onBookConsult} />

      {/* SECTION 7 — Trust */}
      <TrustSection />
    </div>
  );
};


/* ---------------- helpers ---------------- */

function flattenAnswers(a: Answers): Record<string, string> {
  const out: Record<string, string> = {
    home_type: a.homeType,
    own_rent: a.ownRent,
    placement: a.placement.join(" | "),
    outlet_within_50ft: a.outletNearby,
    priorities: a.priorities.join(" | "),
    temperature: a.temperature,
    budget: a.budget,
    timeline: a.timeline,
  };
  if (a.homeType === "Other" && a.homeTypeOther.trim()) {
    out.home_type_other = a.homeTypeOther.trim();
  }
  if (a.placement.includes("Other") && a.placementOther.trim()) {
    out.placement_other = a.placementOther.trim();
  }
  return out;
}

export default SaunaCompatibilityQuiz;
