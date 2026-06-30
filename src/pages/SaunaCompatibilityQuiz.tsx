import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const WEB3FORMS_KEY = "91e8aa2d-8afa-4f9b-bab7-bfaca33818bd";
const STORAGE_KEY = "scq_answers_v1";

type Answers = {
  homeType: string;
  homeTypeOther: string;
  ownRent: string;
  placement: string[];
  placementOther: string;
  space: string;
  outletNearby: string;
  twentyAmp: string;
  has240V: string;
  install240V: string;
  priorities: string[];
  temperature: string;
  budget: string[];
  timeline: string;
};

const initialAnswers: Answers = {
  homeType: "",
  homeTypeOther: "",
  ownRent: "",
  placement: [],
  placementOther: "",
  space: "",
  outletNearby: "",
  twentyAmp: "",
  has240V: "",
  install240V: "",
  priorities: [],
  temperature: "",
  budget: [],
  timeline: "",
};

const TOTAL_STEPS = 12;

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
  | "Excellent Match"
  | "Good Match"
  | "Possible Fit"
  | "Not Recommended";

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

const BUDGET_TIER: Record<string, number> = {
  "Under $3,000": 1,
  "$3,000-$5,000": 2,
  "$5,000-$8,000": 3,
  "$8,000-$12,000": 4,
  "$12,000+": 5,
};

function tierFromScore(score: number, disqualified: boolean): Tier {
  if (disqualified) return "Not Recommended";
  if (score >= 130) return "Excellent Match";
  if (score >= 95) return "Good Match";
  if (score >= 60) return "Possible Fit";
  return "Not Recommended";
}

function buildRecommendations(a: Answers): RecommendationResult {
  const apartment = a.homeType === "Apartment";
  const condo = a.homeType === "Condo";
  const house = a.homeType === "House";
  const renter = a.ownRent === "Rent";
  const owner = a.ownRent === "Own";

  const balcony = a.placement.includes("Balcony");
  const backyard = a.placement.includes("Backyard");
  const livingRoom = a.placement.includes("Living Room");
  const homeGym = a.placement.includes("Home Gym");

  const spaceLt4 = a.space === "Less than 4' x 4'";
  const space4 = a.space === "~4' × 4'";
  const space5x6 = a.space === "~5' × 6'";
  const spaceLarger = a.space === "Larger than 5' × 6'";
  const spaceUnsure = a.space === "Not sure";
  const smallerThan5x5 = spaceLt4 || space4;
  const smallerThan5x6 = spaceLt4 || space4; // ~5×6 counts as 5×6+

  const outletYes = a.outletNearby === "Yes";
  const outletNo = a.outletNearby === "No";
  const outletUnsure = a.outletNearby === "Not sure";

  const ampYes = a.twentyAmp === "Yes";
  const ampNo = a.twentyAmp === "No";
  const ampUnsure = a.twentyAmp === "Not sure";

  const has240VYes = a.has240V === "Yes";
  const has240VUnsure = a.has240V === "Not sure";
  const install240VYes = a.install240V === "Yes";
  const install240VMaybe = a.install240V === "Maybe";
  const install240VNo = a.install240V === "No";
  const install240VUnsure = a.install240V === "Not sure";

  const wantsHigh = a.priorities.includes("High temps (190 - 230°F)");
  const wantsPortable = a.priorities.includes("Portable/renter-friendly");
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
  const wants200plus = temp200 || temp230 || wantsHigh;

  const budgetTiers = a.budget.map((b) => BUDGET_TIER[b]).filter(Boolean);
  const maxBudget = budgetTiers.length ? Math.max(...budgetTiers) : 0;
  const multipleBudgets = a.budget.length > 1;
  const budgetU3k = a.budget.includes("Under $3,000");
  const budget3to5k = a.budget.includes("$3,000-$5,000");
  const budget5to8k = a.budget.includes("$5,000-$8,000");
  const budget8to12k = a.budget.includes("$8,000-$12,000");
  const budget12kPlus = a.budget.includes("$12,000+");

  // Initialize
  const scores = { anywhere: 50, saunalife: 50, barrel: 50, plunge: 50, infrared: 50 };
  const disq = { anywhere: false, saunalife: false, barrel: false, plunge: false, infrared: false };

  // Stage 1: hard disqualifiers
  if (outletNo) disq.anywhere = true;

  if (renter || apartment || balcony || (maxBudget && maxBudget < 3) || smallerThan5x5 || outletNo)
    disq.saunalife = true;

  if (apartment || (maxBudget && maxBudget < 3) || wants200plus || smallerThan5x6 || outletNo)
    disq.barrel = true;

  if ((maxBudget && maxBudget < 4) || apartment || renter || smallerThan5x5 || outletNo)
    disq.plunge = true;

  if (wants200plus) disq.infrared = true;

  // Stage 2: weighted scoring
  // Home type
  if (apartment) {
    scores.anywhere += 40; scores.infrared += 35;
    scores.saunalife -= 100; scores.barrel -= 100; scores.plunge -= 100;
  } else if (condo) {
    scores.anywhere += 20; scores.saunalife += 10; scores.infrared += 20;
  } else if (house) {
    scores.anywhere += 10; scores.saunalife += 25; scores.barrel += 25;
    scores.plunge += 25; scores.infrared += 5;
  }

  // Own / rent
  if (renter) {
    scores.anywhere += 35; scores.infrared += 30;
    scores.saunalife -= 40; scores.barrel -= 40; scores.plunge -= 50;
  } else if (owner) {
    scores.anywhere += 10; scores.saunalife += 20; scores.barrel += 20;
    scores.plunge += 20; scores.infrared += 5;
  }

  // Location
  if (balcony) {
    scores.anywhere += 40; scores.infrared += 30;
    scores.saunalife -= 100; scores.barrel -= 100; scores.plunge -= 100;
  }
  if (backyard) {
    scores.barrel += 25; scores.saunalife += 20; scores.plunge += 20; scores.anywhere += 10;
  }
  if (livingRoom) {
    scores.anywhere += 25; scores.infrared += 25; scores.plunge += 10;
  }
  if (homeGym) {
    scores.plunge += 20; scores.anywhere += 15; scores.infrared += 15;
  }

  // Space
  if (spaceLt4) {
    scores.anywhere -= 50; scores.saunalife -= 100; scores.barrel -= 100;
    scores.plunge -= 100; scores.infrared -= 20;
  } else if (space4) {
    scores.anywhere += 20; scores.infrared += 20;
    scores.saunalife -= 30; scores.barrel -= 100; scores.plunge -= 30;
  } else if (space5x6) {
    scores.anywhere += 10; scores.saunalife += 20; scores.barrel += 20;
    scores.plunge += 20; scores.infrared += 10;
  } else if (spaceLarger) {
    scores.anywhere += 5; scores.saunalife += 15; scores.barrel += 20;
    scores.plunge += 20; scores.infrared += 5;
  }

  // Outlet
  if (outletNo) {
    disq.anywhere = true; disq.saunalife = true; disq.barrel = true;
    disq.plunge = true; disq.infrared = true;
  } else if (outletUnsure) {
    scores.anywhere -= 10; scores.saunalife -= 10; scores.barrel -= 10;
    scores.plunge -= 10; scores.infrared -= 10;
  }

  // 20 amp
  if (ampYes) scores.anywhere += 30;
  else if (ampNo) scores.anywhere -= 25;
  else if (ampUnsure) scores.anywhere += 10;

  // Priorities
  if (wantsHigh) {
    scores.anywhere += 35; scores.saunalife += 35; scores.plunge += 35;
    scores.barrel -= 20; scores.infrared -= 100;
  }
  if (wantsPortable) {
    scores.anywhere += 50; scores.infrared += 30;
    scores.saunalife -= 25; scores.barrel -= 25; scores.plunge -= 25;
  }
  if (wantsInfrared) scores.infrared += 50;
  if (wantsAesthetic) {
    scores.barrel += 35; scores.plunge += 30; scores.saunalife += 25;
  }
  if (wantsLowInstall) {
    scores.anywhere += 40; scores.infrared += 30;
    scores.saunalife -= 30; scores.barrel -= 30; scores.plunge -= 30;
  }
  if (wantsRecovery) {
    scores.anywhere += 20; scores.saunalife += 20; scores.plunge += 20;
  }
  if (wantsRelax) {
    scores.barrel += 15; scores.infrared += 15; scores.anywhere += 10;
  }
  if (wantsDaily) {
    scores.infrared += 20; scores.anywhere += 15;
  }

  // Desired temperature
  if (temp150) scores.infrared += 40;
  else if (temp170) { scores.barrel += 15; scores.anywhere += 10; }
  else if (temp200) {
    scores.anywhere += 30; scores.saunalife += 30; scores.plunge += 30;
  } else if (temp230) {
    scores.anywhere += 35; scores.saunalife += 35; scores.plunge += 40;
    scores.barrel -= 40; scores.infrared -= 100;
  }

  // Budget
  if (budgetU3k) {
    scores.infrared += 50; scores.anywhere -= 50;
    scores.saunalife -= 100; scores.barrel -= 100; scores.plunge -= 100;
  }
  if (budget3to5k) {
    scores.anywhere += 40; scores.infrared += 20;
    scores.barrel -= 20; scores.saunalife -= 30; scores.plunge -= 100;
  }
  if (budget5to8k) {
    scores.anywhere += 20; scores.barrel += 20; scores.saunalife += 20;
  }
  if (budget8to12k) {
    scores.plunge += 30; scores.saunalife += 20; scores.barrel += 15;
  }
  if (budget12kPlus) {
    scores.plunge += 40; scores.saunalife += 20;
  }

  // 240V availability / willingness
  if (has240VYes) {
    scores.saunalife += 30; scores.barrel += 30; scores.plunge += 30;
  } else if (install240VYes) {
    scores.saunalife += 15; scores.barrel += 15; scores.plunge += 15;
  } else if (install240VMaybe) {
    scores.saunalife += 5; scores.barrel += 5; scores.plunge += 5;
  } else if (install240VNo) {
    scores.saunalife -= 50; scores.barrel -= 50; scores.plunge -= 50;
    scores.anywhere += 15; scores.infrared += 15;
  } else if (install240VUnsure) {
    scores.anywhere += 5; scores.infrared += 5;
  }

  // Anywhere tie-breaker
  if (!disq.anywhere) {
    const competitors = (["saunalife", "barrel", "plunge", "infrared"] as const)
      .filter((k) => !disq[k])
      .map((k) => scores[k]);
    const top = competitors.length ? Math.max(...competitors) : -Infinity;
    if (top > scores.anywhere && Math.abs(scores.anywhere - top) <= 15) {
      scores.anywhere += 16;
    }
  }

  const electricalAssessmentRecommended =
    ampUnsure ||
    has240VUnsure ||
    install240VMaybe ||
    install240VUnsure ||
    outletUnsure;

  const consultationStrongly =
    electricalAssessmentRecommended ||
    spaceUnsure ||
    multipleBudgets ||
    a.timeline === "This week" ||
    a.timeline === "This month" ||
    a.timeline === "Within 3 months";

  const reasons = {
    anywhere: renter
      ? "Runs on a standard 3-prong outlet, so you can install it without modifying your unit — ideal for renters."
      : apartment || balcony
        ? "The only steam sauna that works in apartments and balconies — no electrician, no permits."
        : "Reaches traditional Finnish temperatures on a normal household outlet, with no permits or electrical work.",
    saunalife:
      "Solid traditional prefab heat at a compact footprint, but requires a dedicated 240V circuit and an electrician.",
    barrel:
      "Beautiful outdoor traditional experience for homeowners with backyard space and a dedicated 240V line.",
    plunge:
      "Premium high-heat experience with great design — best if you have the budget and a dedicated circuit.",
    infrared: wantsInfrared
      ? "Best fit if your priority is infrared heat and red-light therapy rather than steam."
      : "Easy to plug in, but won't deliver the high heat or steam of a traditional sauna.",
  };

  const base: Omit<Recommendation, "score" | "tier" | "disqualified" | "whyFit">[] = [
    {
      id: "anywhere",
      name: "Anywhere Sauna",
      tempRange: "200–230°F",
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
      tempRange: "200–230°F",
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
      tempRange: "Up to 230°F",
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
    const disqualified = disq[b.id];
    let tier = tierFromScore(score, disqualified);
    // Downgrade confidence by one level for 240V saunas if electrical is uncertain
    if (electricalAssessmentRecommended && b.requires240V && !disqualified) {
      if (tier === "Excellent Match") tier = "Good Match";
      else if (tier === "Good Match") tier = "Possible Fit";
    }
    return {
      ...b,
      score,
      disqualified,
      tier,
      whyFit: reasons[b.id],
    };
  });

  // Sort: non-disqualified first by score desc, then disqualified by score desc
  recs.sort((a, b) => {
    if (a.disqualified !== b.disqualified) return a.disqualified ? 1 : -1;
    return b.score - a.score;
  });

  const allDisqualified = recs.every((r) => r.disqualified);
  return {
    recommendations: recs,
    consultationStrongly,
    allDisqualified,
    electricalAssessmentRecommended,
  };
}

/* ---------------- Page ---------------- */

const SaunaCompatibilityQuiz = () => {
  useSEO({
    title: "Sauna Compatibility Quiz | Anywhere Sauna",
    description:
      "Answer a few questions about your space, electrical setup, budget, and goals to see which sauna options are actually compatible with your home.",
    canonical: "https://sfsaunarental.com/sauna-compatibility-quiz",
  });

  const navigate = useNavigate();
  const [view, setView] = useState<
    "hero" | "quiz" | "capture" | "results"
  >("hero");
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
    key: "placement" | "priorities" | "budget",
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
    if (!email) return;
    setSubmitting(true);
    trackEvent("compatibility_email_submitted", {
      email,
      ...flattenAnswers(answers),
    });
    if (phone.trim()) {
      trackEvent("compatibility_phone_submitted", {
        phone,
        ...flattenAnswers(answers),
      });
    }

    // Fire-and-forget to Web3Forms so we capture the lead, then show results.
    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_KEY);
      formData.append("subject", "New Sauna Compatibility Quiz Submission");
      formData.append("from_name", "Anywhere Sauna — Compatibility Quiz");
      formData.append("email", email);
      if (phone) formData.append("phone", phone);
      Object.entries(flattenAnswers(answers)).forEach(([k, v]) =>
        formData.append(k, String(v ?? ""))
      );
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      }).catch(() => {});
    } catch {}

    trackEvent("compatibility_results_viewed", flattenAnswers(answers));
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
                <QuestionHeader title="What type of home do you live in?" />
                <div className="space-y-3">
                  {["Apartment", "Condo", "House"].map((o) => (
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
                <NextRow
                  disabled={!answers.homeType}
                  onNext={advance}
                />
              </>
            )}

            {step === 2 && (
              <>
                <QuestionHeader title="Do you own or rent?" />
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

            {step === 3 && (
              <>
                <QuestionHeader
                  title="Where are you considering putting the sauna?"
                  multi
                />
                <div className="space-y-3">
                  {[
                    "Living Room",
                    "Backyard",
                    "Bedroom",
                    "Deck",
                    "Balcony",
                    "Basement",
                    "Home Gym",
                  ].map((o) => (
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

            {step === 4 && (
              <>
                <QuestionHeader title="Approximately how much space do you have available?" />
                <div className="space-y-3">
                  {[
                    "Less than 4' x 4'",
                    "~4' × 4'",
                    "~5' × 6'",
                    "Larger than 5' × 6'",
                    "Not sure",
                  ].map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      selected={answers.space === o}
                      onClick={() => setSingle("space", o)}
                    />
                  ))}
                </div>
                <NextRow disabled={!answers.space} onNext={advance} />
              </>
            )}

            {step === 5 && (
              <>
                <QuestionHeader title="Is there an electrical outlet within 50 feet?" />
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

            {step === 6 && (
              <>
                <QuestionHeader
                  title="Do you know if that outlet is on a 20 amp circuit?"
                  helper="Most people aren't sure. That's okay."
                />
                <div className="space-y-3">
                  {["Yes", "No", "Not sure"].map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      selected={answers.twentyAmp === o}
                      onClick={() => setSingle("twentyAmp", o)}
                    />
                  ))}
                </div>
                <NextRow disabled={!answers.twentyAmp} onNext={advance} />
              </>
            )}

            {step === 7 && (
              <>
                <QuestionHeader
                  title="Do you already have a 240V electrical outlet available for a sauna?"
                  helper={
                    <>
                      <p className="mb-2">Examples include:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>An EV charger outlet</li>
                        <li>An electric dryer outlet</li>
                        <li>A hot tub hookup</li>
                        <li>A dedicated 240V circuit installed by an electrician</li>
                      </ul>
                    </>
                  }
                />
                <div className="space-y-3">
                  {["Yes", "No", "Not sure"].map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      selected={answers.has240V === o}
                      onClick={() => setSingle("has240V", o)}
                    />
                  ))}
                </div>
                <NextRow disabled={!answers.has240V} onNext={advance} />
              </>
            )}

            {step === 8 && (
              <>
                <QuestionHeader
                  title="If needed, would you be open to installing a new 240V electrical circuit?"
                  helper="Many traditional saunas require a dedicated 240V circuit installed by an electrician. Typical installation costs range from approximately $1,000–$3,000 depending on your home's electrical setup."
                />
                <div className="space-y-3">
                  {["Yes", "Maybe", "No", "Not sure"].map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      selected={answers.install240V === o}
                      onClick={() => setSingle("install240V", o)}
                    />
                  ))}
                </div>
                <NextRow disabled={!answers.install240V} onNext={advance} />
              </>
            )}

            {step === 9 && (
              <>
                <QuestionHeader
                  title="What's most important to you in a sauna?"
                  multi
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "High temps (190 - 230°F)",
                    "Portable/renter-friendly",
                    "Red-light therapy",
                    "Aesthetic design",
                    "Low installation cost",
                    "Muscle recovery",
                    "Relaxation",
                    "Daily wellness routine",
                  ].map((o) => (
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

            {step === 10 && (
              <>
                <QuestionHeader title="What temperature would you like your sauna?" />
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

            {step === 11 && (
              <>
                <QuestionHeader
                  title="What budget ranges are you considering?"
                  multi
                />
                <div className="space-y-3">
                  {[
                    "Under $3,000",
                    "$3,000-$5,000",
                    "$5,000-$8,000",
                    "$8,000-$12,000",
                    "$12,000+",
                  ].map((o) => (
                    <OptionButton
                      key={o}
                      label={o}
                      multi
                      selected={answers.budget.includes(o)}
                      onClick={() => toggleMulti("budget", o)}
                    />
                  ))}
                </div>
                <NextRow disabled={answers.budget.length === 0} onNext={advance} />
              </>
            )}

            {step === 12 && (
              <>
                <QuestionHeader title="When are you hoping to buy?" />
                <div className="space-y-3">
                  {[
                    "This week",
                    "This month",
                    "Within 3 months",
                    "Within 6 months",
                    "Just researching",
                  ].map((o) => (
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
                <Label htmlFor="phone">Phone number (optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1.5"
                  placeholder="(555) 555-5555"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Add your phone number if you'd like us to text your
                  recommendations.
                </p>
              </div>

              <Button
                type="submit"
                disabled={submitting || !email}
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
            onBuyAnywhere={() => {
              trackEvent("compatibility_buy_now_clicked", {
                location: "compatibility_results",
                ...flattenAnswers(answers),
              });
              navigate("/specs");
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
      className="absolute inset-0 w-full h-full object-cover hidden md:block"
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
        Get personalized recommendations. Answer a few questions about your space, electrical setup, budget, and goals to see which sauna options are compatible.
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
  "Excellent Match": "bg-emerald-600 text-white",
  "Good Match": "bg-[#171717] text-white",
  "Possible Fit": "bg-amber-500 text-white",
  "Not Recommended": "bg-muted text-muted-foreground",
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
    <h2 className="text-[26px] md:text-[34px] font-semibold mb-3">{heading}</h2>
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
      Book Free 15-Minute Consultation
      <ExternalLink size={16} />
    </Button>
  </div>
);

const SummaryCard = ({
  rec,
  rank,
  onBuyAnywhere,
}: {
  rec: Recommendation;
  rank: number;
  onBuyAnywhere: () => void;
}) => (
  <div className="bg-card border border-border rounded-2xl p-5 md:p-6 flex items-center gap-4 md:gap-6">
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
      {rec.isAnywhere && (
        <div className="mt-3">
          <Button onClick={onBuyAnywhere} size="sm" variant="outline">
            Learn More
          </Button>
        </div>
      )}
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

const ElectricalAssessmentBanner = ({
  onBookConsult,
}: {
  onBookConsult: () => void;
}) => (
  <div className="mb-8 rounded-2xl border border-[#171717] bg-[#171717] text-white p-6 md:p-10 shadow-xl">
    <div className="flex items-center gap-3 mb-3">
      <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
        <Zap size={20} />
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-white/70">
        Expert guidance
      </p>
    </div>
    <h2 className="text-[24px] md:text-[30px] leading-[1.2] font-semibold mb-4">
      Recommended: Schedule an Electrical Assessment
    </h2>
    <p className="text-white/85 leading-relaxed mb-4">
      Your home's available electrical power is often the #1 factor in determining:
    </p>
    <ul className="space-y-2 mb-5 text-white/85">
      {[
        "Which sauna options will work in your space",
        "Whether a sauna can reach its advertised temperatures",
        "Whether additional electrical work is required",
        "The true total cost of ownership",
      ].map((t) => (
        <li key={t} className="flex items-start gap-2">
          <CheckCircle2 size={16} className="mt-1 shrink-0 text-white" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/85 leading-relaxed mb-5">
      Many homeowners and renters aren't sure what electrical service they have available, which is completely normal. A quick electrical assessment can often save thousands of dollars and eliminate unsuitable options.
    </p>
    <div className="rounded-xl border border-white/20 bg-white/5 p-4 mb-6">
      <p className="text-white">
        Based on your answers, we recommend confirming your electrical setup before making a final sauna decision.
      </p>
    </div>
    <Button
      onClick={onBookConsult}
      size="lg"
      variant="secondary"
      className="max-w-full whitespace-normal h-auto py-3 text-center"
    >
      Schedule Free Electrical Assessment
      <ExternalLink size={16} />
    </Button>
  </div>
);

const BestMatchCard = ({
  rec,
  onBuyAnywhere,
  showElectricalNote,
}: {
  rec: Recommendation;
  onBuyAnywhere: () => void;
  showElectricalNote?: boolean;
}) => (
  <div className="bg-card border border-[#171717] rounded-2xl p-6 md:p-10">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
          Top recommendation
        </p>
        <h3 className="text-[26px] md:text-[32px] font-semibold leading-tight">
          {rec.name}
        </h3>
      </div>
      <TierBadge tier={rec.tier} />
    </div>
    <div className="mb-6">
      <Row label="Expected temps" value={rec.tempRange} />
      <Row label="Install complexity" value={rec.installComplexity} />
      <Row label="Est. install cost" value={rec.estInstallCost} />
      <Row label="All-in cost" value={rec.totalCost} />
      <Row label="Best use case" value={rec.useCase} />
    </div>
    <p className="text-[15px] leading-relaxed text-foreground mb-2">
      <span className="font-semibold">Why we recommended this: </span>
      {rec.whyFit}
    </p>
    {showElectricalNote && rec.requires240V && <ElectricalNote />}
    {rec.isAnywhere && (
      <Button
        onClick={onBuyAnywhere}
        size="lg"
        className="mt-7 w-full sm:w-auto max-w-full whitespace-normal h-auto py-3 text-center"
      >
        Learn More
        <ArrowRight size={18} />
      </Button>
    )}
  </div>
);

const OtherOptionCard = ({
  rec,
  onBuyAnywhere,
  showElectricalNote,
}: {
  rec: Recommendation;
  onBuyAnywhere: () => void;
  showElectricalNote?: boolean;
}) => (
  <div className="bg-card border border-border rounded-2xl p-6">
    <div className="flex items-start justify-between gap-3 mb-3">
      <h3 className="text-[20px] md:text-[22px] font-semibold leading-tight">
        {rec.name}
      </h3>
      <TierBadge tier={rec.tier} />
    </div>
    <div className="mb-3">
      <Row label="Expected temps" value={rec.tempRange} />
      <Row label="Install complexity" value={rec.installComplexity} />
      <Row label="Est. install cost" value={rec.estInstallCost} />
      <Row label="All-in cost" value={rec.totalCost} />
      <Row label="Best use case" value={rec.useCase} />
    </div>
    <p className="text-[14px] text-muted-foreground leading-relaxed">
      {rec.whyFit}
    </p>
    {showElectricalNote && rec.requires240V && <ElectricalNote />}
    {rec.isAnywhere && (
      <div className="mt-5">
        <Button onClick={onBuyAnywhere} variant="outline">
          Learn More
        </Button>
      </div>
    )}
  </div>
);

const ResultsView = ({
  result,
  answers,
  onBookConsult,
  onBuyAnywhere,
}: {
  result: RecommendationResult;
  answers: Answers;
  onBookConsult: () => void;
  onBuyAnywhere: () => void;
}) => {
  const { recommendations, consultationStrongly, allDisqualified } = result;

  if (allDisqualified) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-white mb-3">
            Your personalized results
          </p>
          <h1 className="text-[32px] md:text-[44px] leading-[1.1] font-semibold mb-3 text-white">
            Let's Find a Creative Fit
          </h1>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 md:p-10 text-center">
          <p className="text-[16px] leading-relaxed text-foreground mb-6">
            No sauna appears to be an ideal fit based on your current space,
            electrical setup, and goals. Schedule a consultation and we'll see
            if there's a creative solution for your home.
          </p>
          <Button
            onClick={onBookConsult}
            size="lg"
            className="max-w-full whitespace-normal h-auto py-3 text-center"
          >
            Book Free 15-Minute Consultation
            <ExternalLink size={16} />
          </Button>
        </div>
      </div>
    );
  }

  const eligible = recommendations.filter((r) => !r.disqualified);
  const disqualified = recommendations.filter((r) => r.disqualified);
  const [best, second, third, ...restEligible] = eligible;
  const topThree = [best, second, third].filter(Boolean);
  const others = [...restEligible, ...disqualified];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white mb-3">
          Your personalized results
        </p>
        <h1 className="text-[32px] md:text-[44px] leading-[1.1] font-semibold mb-3 text-white">
          Your Personalized Sauna Recommendations
        </h1>
        <p className="text-white">
          Based on your space, electrical setup, budget, and goals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8">
        {topThree.map((rec, idx) => (
          <SummaryCard
            key={rec.name}
            rec={rec}
            rank={idx + 1}
            onBuyAnywhere={onBuyAnywhere}
          />
        ))}
      </div>

      {best && <BestMatchCard rec={best} onBuyAnywhere={onBuyAnywhere} />}

      {others.length > 0 && (
        <>
          <h2 className="text-[22px] md:text-[28px] font-semibold mt-14 mb-5 text-center text-white">
            Other Options To Consider
          </h2>
          <div className="space-y-4">
            {others.map((r) => (
              <OtherOptionCard
                key={r.name}
                rec={r}
                onBuyAnywhere={onBuyAnywhere}
              />
            ))}
          </div>
        </>
      )}

      <ConsultCTA
        emphasized={consultationStrongly}
        heading="Want a Second Opinion?"
        body="Book a free 15-minute consultation and we'll review your space, electrical setup, and goals together."
        onBookConsult={onBookConsult}
      />
    </div>
  );
};

/* ---------------- helpers ---------------- */

function flattenAnswers(a: Answers): Record<string, string> {
  return {
    home_type: a.homeType + (a.homeTypeOther ? ` (${a.homeTypeOther})` : ""),
    own_rent: a.ownRent,
    placement:
      a.placement.join(", ") +
      (a.placementOther ? ` | other: ${a.placementOther}` : ""),
    space: a.space,
    outlet_within_50ft: a.outletNearby,
    outlet_20a: a.twentyAmp,
    has_240v_outlet: a.has240V,
    open_to_install_240v: a.install240V,
    priorities: a.priorities.join(", "),
    temperature: a.temperature,
    budget: a.budget.join(", "),
    timeline: a.timeline,
  };
}

export default SaunaCompatibilityQuiz;
