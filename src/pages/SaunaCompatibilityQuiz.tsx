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
  priorities: [],
  temperature: "",
  budget: [],
  timeline: "",
};

const TOTAL_STEPS = 10; // 10 questions (split budget out as Q9, timeline Q10)

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
  helper?: string;
  multi?: boolean;
}) => (
  <div className="mb-6">
    <h2 className="text-[22px] md:text-[26px] leading-[1.2] font-semibold mb-2">
      {title}
    </h2>
    {multi && (
      <p className="text-sm text-muted-foreground">Select all that apply.</p>
    )}
    {helper && <p className="text-sm text-muted-foreground">{helper}</p>}
  </div>
);

/* ---------------- Recommendation engine ---------------- */

type Recommendation = {
  name: string;
  score: number;
  tempRange: string;
  installComplexity: string;
  estInstallCost: string;
  useCase: string;
  whyFit: string;
  image: string;
  totalCost: string;
  plugIn: boolean;
  isAnywhere?: boolean;
};

function buildRecommendations(a: Answers): Recommendation[] {
  const renter = a.ownRent === "Rent";
  const tightSpace =
    a.space === "Less than 4' x 4'" || a.space === "~4' × 4'";
  const wantsHighTemp =
    a.temperature === "200°F" ||
    a.temperature === "230°F" ||
    a.priorities.includes("High temps (190 - 230°F)");
  const wantsInfrared = a.priorities.includes("Red-light therapy");
  const budgetTier =
    a.budget.includes("$12,000+")
      ? 5
      : a.budget.includes("$8,000-$12,000")
        ? 4
        : a.budget.includes("$5,000-$8,000")
          ? 3
          : a.budget.includes("$3,000-$5,000")
            ? 2
            : a.budget.includes("Under $3,000")
              ? 1
              : 3;
  const noElectrician =
    a.twentyAmp !== "Yes" || a.priorities.includes("Low installation cost");
  const outdoor =
    a.placement.includes("Backyard") || a.placement.includes("Deck");

  // Anywhere Sauna
  let anywhereScore = 70;
  if (renter) anywhereScore += 10;
  if (a.outletNearby === "Yes") anywhereScore += 8;
  if (noElectrician) anywhereScore += 8;
  if (wantsHighTemp) anywhereScore += 6;
  if (budgetTier >= 2 && budgetTier <= 3) anywhereScore += 4;
  if (wantsInfrared) anywhereScore -= 15;
  if (a.space === "Less than 4' x 4'") anywhereScore -= 8;
  anywhereScore = Math.min(98, Math.max(40, anywhereScore));

  // SaunaLife (compact prefab traditional)
  let saunaLifeScore = 55;
  if (wantsHighTemp) saunaLifeScore += 8;
  if (outdoor) saunaLifeScore += 8;
  if (budgetTier >= 4) saunaLifeScore += 6;
  if (renter) saunaLifeScore -= 10;
  if (a.twentyAmp !== "Yes") saunaLifeScore -= 8;

  // Almost Heaven (barrel/cabin)
  let almostHeavenScore = 50;
  if (outdoor) almostHeavenScore += 12;
  if (wantsHighTemp) almostHeavenScore += 6;
  if (budgetTier >= 3) almostHeavenScore += 6;
  if (renter) almostHeavenScore -= 12;
  if (tightSpace) almostHeavenScore -= 10;

  // Clearlight Infrared
  let infraredScore = 45;
  if (wantsInfrared) infraredScore += 30;
  if (a.outletNearby === "Yes") infraredScore += 6;
  if (budgetTier >= 2) infraredScore += 4;
  if (wantsHighTemp) infraredScore -= 15;

  const recs: Recommendation[] = [
    {
      name: "Anywhere Sauna",
      score: anywhereScore,
      tempRange: "Up to 200°F",
      installComplexity: "Plug-and-play — no electrician",
      estInstallCost: "$0 install (plugs into standard 120V outlet)",
      useCase: "Traditional steam sauna inside homes, apartments, or rentals",
      whyFit: renter
        ? "Runs on a standard 3-prong outlet, so you can install it without modifying your unit — ideal for renters."
        : "Reaches traditional Finnish temperatures on a normal household outlet, with no permits or electrical work.",
      image: "/images/sauna-type-anywhere.jpg",
      totalCost: "$4,599 delivered",
      plugIn: true,
      isAnywhere: true,
    },
    {
      name: "SaunaLife",
      score: saunaLifeScore,
      tempRange: "170–190°F",
      installComplexity: "Moderate — 240V circuit + electrician",
      estInstallCost: "$800–$2,500 for dedicated 240V circuit",
      useCase: "Compact indoor/outdoor traditional sauna for homeowners",
      whyFit:
        "Solid traditional heat in a smaller prefab footprint, but requires a dedicated high-voltage circuit.",
      image: "/images/compare-nordica.png",
      totalCost: "~$6,000–$8,000 with install",
      plugIn: false,
    },
    {
      name: "Almost Heaven (Barrel / Cabin)",
      score: almostHeavenScore,
      tempRange: "170–195°F",
      installComplexity: "High — site prep + 240V electrician",
      estInstallCost: "$1,500–$4,000 (site prep + electrical)",
      useCase: "Backyard barrel or cabin sauna for homeowners with outdoor space",
      whyFit:
        "Great traditional outdoor experience if you own your home and can run a dedicated 240V line outside.",
      image: "/images/compare-barrel.png",
      totalCost: "~$7,000–$10,500 with install",
      plugIn: false,
    },
    {
      name: "Clearlight Infrared",
      score: infraredScore,
      tempRange: "120–140°F (infrared)",
      installComplexity: "Low — plugs into a standard outlet",
      estInstallCost: "$0 install",
      useCase: "Low-heat infrared + red-light therapy for daily wellness",
      whyFit: wantsInfrared
        ? "Best fit if your priority is infrared heat and red-light therapy rather than steam."
        : "Easy to install, but won't deliver the high heat of a traditional steam sauna.",
      image: "/images/compare-infrared.png",
      totalCost: "~$5,500",
      plugIn: true,
    },
  ];

  return recs.sort((x, y) => y.score - x.score);
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

  const recommendations = useMemo(
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

            {step === 8 && (
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

            {step === 9 && (
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

            {step === 10 && (
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
            recommendations={recommendations}
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

const ResultsView = ({
  recommendations,
  answers,
  onBookConsult,
  onBuyAnywhere,
}: {
  recommendations: Recommendation[];
  answers: Answers;
  onBookConsult: () => void;
  onBuyAnywhere: () => void;
}) => {
  const [best, second, third, ...rest] = recommendations;
  const topThree = [best, second, third].filter(Boolean);
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-white mb-3">
          Your personalized results
        </p>
        <h1 className="text-[32px] md:text-[44px] leading-[1.1] font-semibold mb-3 text-white">
          Best Match
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

      <BestMatchCard rec={best} onBuyAnywhere={onBuyAnywhere} />

      <h2 className="text-[22px] md:text-[28px] font-semibold mt-14 mb-5 text-center text-white">
        Other Options To Consider
      </h2>
      <div className="space-y-4">
        {rest.map((r) => (
          <OtherOptionCard
            key={r.name}
            rec={r}
            onBuyAnywhere={onBuyAnywhere}
          />
        ))}
      </div>

      <div className="mt-16 bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-[26px] md:text-[34px] font-semibold mb-3">
          Still not sure?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          We'll review your space, electrical setup, and goals with you
          personally.
        </p>
        <Button onClick={onBookConsult} size="lg" variant="outline">
          Book Free Sauna Consultation
          <ExternalLink size={16} />
        </Button>
      </div>
    </div>
  );
};

const ScorePill = ({ score }: { score: number }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] text-white text-xs uppercase tracking-[0.15em]">
    {score}% compatibility
  </div>
);

const RankBadge = ({ rank }: { rank: number }) => {
  const labels = ["1st", "2nd", "3rd"];
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] text-white text-xs uppercase tracking-[0.15em]">
      {labels[rank - 1] || `${rank}th`} match
    </div>
  );
};

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
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div className="flex-1 min-w-0">
      <div className="mb-2">
        <RankBadge rank={rank} />
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
            See the Anywhere Sauna
          </Button>
        </div>
      )}
    </div>
  </div>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="py-3 border-b border-border last:border-b-0 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-4">
    <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
      {label}
    </div>
    <div className="text-[15px] text-foreground">{value}</div>
  </div>
);

const BestMatchCard = ({
  rec,
  onBuyAnywhere,
}: {
  rec: Recommendation;
  onBuyAnywhere: () => void;
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
      <ScorePill score={rec.score} />
    </div>
    <div className="mb-6">
      <Row label="Expected temps" value={rec.tempRange} />
      <Row label="Install complexity" value={rec.installComplexity} />
      <Row label="Est. install cost" value={rec.estInstallCost} />
      <Row label="Best use case" value={rec.useCase} />
    </div>
    <p className="text-[15px] leading-relaxed text-foreground mb-7">
      <span className="font-semibold">Why this fits: </span>
      {rec.whyFit}
    </p>
    {rec.isAnywhere && (
      <Button
        onClick={onBuyAnywhere}
        size="lg"
        className="w-full sm:w-auto max-w-full whitespace-normal h-auto py-3 text-center"
      >
        See the Anywhere Sauna
        <ArrowRight size={18} />
      </Button>
    )}
  </div>
);

const OtherOptionCard = ({
  rec,
  onBuyAnywhere,
}: {
  rec: Recommendation;
  onBuyAnywhere: () => void;
}) => (
  <div className="bg-card border border-border rounded-2xl p-6">
    <div className="flex items-start justify-between gap-3 mb-3">
      <h3 className="text-[20px] md:text-[22px] font-semibold leading-tight">
        {rec.name}
      </h3>
      <ScorePill score={rec.score} />
    </div>
    <div className="mb-3">
      <Row label="Expected temps" value={rec.tempRange} />
      <Row label="Install complexity" value={rec.installComplexity} />
      <Row label="Est. install cost" value={rec.estInstallCost} />
      <Row label="Best use case" value={rec.useCase} />
    </div>
    <p className="text-[14px] text-muted-foreground leading-relaxed">
      {rec.whyFit}
    </p>
    {rec.isAnywhere && (
      <div className="mt-5">
        <Button onClick={onBuyAnywhere} variant="outline">
          See the Anywhere Sauna
        </Button>
      </div>
    )}
  </div>
);

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
    priorities: a.priorities.join(", "),
    temperature: a.temperature,
    budget: a.budget.join(", "),
    timeline: a.timeline,
  };
}

export default SaunaCompatibilityQuiz;
