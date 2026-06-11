import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSEO } from "@/hooks/useSEO";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";


const BOOKING_URL = "https://calendar.app.google/Q9nw6fTEBMnyNbDf8";
const WEB3FORMS_KEY = "02180c68-7a47-43d5-9a5a-38b9e1d73d59";
const STORAGE_KEY = "ecq_answers_v1";

type Answer = "Yes" | "No" | "Not Sure" | "";

type Answers = {
  q1: Answer;
  q2: Answer;
};

type View =
  | { kind: "step"; step: 1 | 2 | 3 | 4 }
  | { kind: "result"; from: 2 | 3 };

const ProgressBar = ({ step }: { step: number }) => (
  <div className="w-full max-w-xl mx-auto mb-6">
    <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
      <div
        className="h-full bg-[hsl(var(--color-accent))] transition-all duration-500 ease-out"
        style={{ width: `${(step / 4) * 100}%` }}
      />
    </div>
    <p className="mt-2 text-xs font-sans text-muted-foreground text-center">Step {step} of 4</p>
  </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-10 max-w-xl mx-auto shadow-sm">
    {children}
  </div>
);

const BookConsultationCTA = ({ subtext }: { subtext?: string }) => (
  <div className="flex flex-col items-center">
    <Button
      asChild
      shape="pill"
      className="bg-[hsl(var(--color-accent))] text-[hsl(var(--color-white))] font-sans font-medium h-auto px-8 py-4 text-base w-full sm:w-auto"
    >
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
        <Calendar className="mr-1" size={18} />
        Book Electrical Compatibility Consultation — $129
      </a>
    </Button>
    {subtext && (
      <p className="text-xs font-sans text-muted-foreground mt-3 text-center max-w-[320px]">
        {subtext}
      </p>
    )}
  </div>
);

const AnswerButton = ({
  label,
  variant,
  onClick,
}: {
  label: string;
  variant: "primary" | "outline";
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={
      variant === "primary"
        ? "w-full h-14 rounded-full bg-[hsl(var(--color-accent))] text-[hsl(var(--color-white))] font-sans font-medium text-base transition-[filter] hover:brightness-[0.92]"
        : "w-full h-14 rounded-full border-[1.5px] border-[hsl(var(--color-accent))] text-[hsl(var(--color-accent))] bg-transparent font-sans font-medium text-base transition-[filter] hover:brightness-[0.92]"
    }
  >
    {label}
  </button>
);

const ElectricalCompatibilityQuiz = () => {
  useSEO({
    title: "Electrical Compatibility Quiz | The Anywhere Sauna",
    description:
      "Answer a few quick questions to find out if the Anywhere Sauna will work in your home.",
    canonical: "https://sfsaunarental.com/electrical-compatibility-quiz",
  });

  const [view, setView] = useState<View>({ kind: "step", step: 1 });
  const [answers, setAnswers] = useState<Answers>({ q1: "", q2: "" });
  const [submitting, setSubmitting] = useState(false);

  // Load persisted answers
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist answers
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {}
  }, [answers]);

  // Inject Web3Forms uploader script when reaching step 4
  useEffect(() => {
    if (view.kind === "step" && view.step === 4) {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src="https://web3forms.com/client/script.js"]'
      );
      if (!existing) {
        const s = document.createElement("script");
        s.src = "https://web3forms.com/client/script.js";
        s.async = true;
        document.body.appendChild(s);
      }
    }
  }, [view]);

  const handleQ1 = (ans: Answer) => {
    setAnswers((a) => ({ ...a, q1: ans }));
    if (ans === "Yes") setView({ kind: "step", step: 3 });
    else setView({ kind: "result", from: 2 });
  };

  const handleQ2 = (ans: Answer) => {
    setAnswers((a) => ({ ...a, q2: ans }));
    if (ans === "Yes") setView({ kind: "step", step: 4 });
    else setView({ kind: "result", from: 3 });
  };

  const goBack = () => {
    if (view.kind === "result") {
      setView({ kind: "step", step: view.from });
      return;
    }
    if (view.kind === "step") {
      if (view.step === 2) setView({ kind: "step", step: 1 });
      else if (view.step === 3) setView({ kind: "step", step: 2 });
      else if (view.step === 4) setView({ kind: "step", step: 3 });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Let Web3Forms handle the actual submission + redirect.
    setSubmitting(true);
    const form = e.currentTarget;
    const tsInput = form.querySelector<HTMLInputElement>('input[name="submitted_at"]');
    if (tsInput) tsInput.value = new Date().toISOString();
  };

  const currentStepNumber =
    view.kind === "step" ? view.step : view.from; // progress reflects the originating step

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <ProgressBar step={currentStepNumber} />

          {/* Back button */}
          {!(view.kind === "step" && view.step === 1) && (
            <div className="max-w-xl mx-auto mb-3">
              <button
                onClick={goBack}
                className="inline-flex items-center gap-1 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={16} /> Back
              </button>
            </div>
          )}

          {/* STEP 1: Intro */}
          {view.kind === "step" && view.step === 1 && (
            <Card>
              <div className="flex items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-[hsl(var(--color-accent))]/10 flex items-center justify-center">
                  <Sparkles className="text-[hsl(var(--color-accent))]" size={26} />
                </div>
              </div>
              <h1 className="text-center text-[28px] md:text-[36px] leading-[1.15] font-semibold mb-4">
                Will the Anywhere Sauna Work in Your Home?
              </h1>
              <p className="text-center text-base text-muted-foreground mb-8">
                Answer a few quick questions to find out if your home is likely compatible.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Takes less than 1 minute",
                  "No technical knowledge required",
                  "Get personalized next steps",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <span className="font-sans text-foreground">{t}</span>
                  </li>
                ))}
              </ul>

              <Button
                shape="pill"
                onClick={() => setView({ kind: "step", step: 2 })}
                className="bg-[hsl(var(--color-accent))] text-[hsl(var(--color-white))] font-sans font-medium h-auto px-8 py-4 text-base w-full"
              >
                Start Assessment
                <ArrowRight size={18} />
              </Button>
            </Card>
          )}

          {/* STEP 2: Q1 */}
          {view.kind === "step" && view.step === 2 && (
            <Card>
              <h2 className="text-[24px] md:text-[28px] leading-[1.2] font-semibold mb-4">
                Do you have a standard 3-prong outlet within 50 feet of where you'd like to place your sauna?
              </h2>
              <div className="rounded-xl overflow-hidden bg-secondary/40 mb-4 border border-border">
                <img
                  src="/outlet-3prong.jpg"
                  alt="Standard North American 3-prong electrical outlet"
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="space-y-3">
                <AnswerButton label="Yes" variant="primary" onClick={() => handleQ1("Yes")} />
                <AnswerButton label="No" variant="outline" onClick={() => handleQ1("No")} />
                <AnswerButton label="Not Sure" variant="outline" onClick={() => handleQ1("Not Sure")} />
              </div>
            </Card>
          )}

          {/* STEP 3: Q2 */}
          {view.kind === "step" && view.step === 3 && (
            <div className="space-y-6">
              <Card>
                <h2 className="text-[24px] md:text-[28px] leading-[1.2] font-semibold mb-4">
                  Is that outlet on a 20-amp circuit?
                </h2>
                <div className="rounded-xl overflow-hidden bg-secondary/40 mb-4 border border-border">
                  <img
                    src="/panel-example.jpg"
                    alt="Example residential electrical panel with labeled breakers"
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden bg-secondary/40 mb-4 border border-border aspect-video flex items-center justify-center">
                  <p className="text-sm text-muted-foreground px-4 text-center">
                    Short video walkthrough coming soon — how to find the breaker for your outlet and check if it's 20A.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mb-6 flex items-start gap-2">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <span>The Anywhere Sauna performs best when used with a heater plugged into an outlet on a 20A circuit.</span>
                </p>

                <div className="space-y-3">
                  <AnswerButton label="Yes" variant="primary" onClick={() => handleQ2("Yes")} />
                  <AnswerButton label="No" variant="outline" onClick={() => handleQ2("No")} />
                  <AnswerButton label="Not Sure" variant="outline" onClick={() => handleQ2("Not Sure")} />
                </div>
              </Card>

              {/* Callout */}
              <div className="bg-[hsl(var(--cedar-section))] border border-border rounded-2xl p-6 md:p-8 max-w-xl mx-auto">
                <h3 className="text-[20px] font-semibold mb-2">Need Help Checking?</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  We'll walk you through the process and help determine whether your setup is compatible.
                </p>
                <BookConsultationCTA subtext="Talk directly with a sauna specialist. Consultation fee is credited toward the purchase of an Anywhere Sauna." />
              </div>
            </div>
          )}

          {/* STEP 4: Contact + uploads */}
          {view.kind === "step" && view.step === 4 && (
            <Card>
              <h2 className="text-[24px] md:text-[28px] leading-[1.2] font-semibold mb-3">
                Almost Done. Let's Review Your Setup.
              </h2>
              <p className="text-base text-muted-foreground mb-6">
                Upload photos or a short video of your space and we'll personally review everything before confirming compatibility.
              </p>

              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                <input type="hidden" name="subject" value="New Electrical Compatibility Assessment" />
                <input type="hidden" name="from_name" value="Anywhere Sauna — Compatibility Quiz" />
                <input
                  type="hidden"
                  name="redirect"
                  value={`${window.location.origin}/electrical-assessment-submitted`}
                />
                <input type="hidden" name="question_1_outlet_within_50ft" value={answers.q1} />
                <input type="hidden" name="question_2_on_20a_circuit" value={answers.q2} />
                <input type="hidden" name="submitted_at" value="" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name" className="font-sans">First Name *</Label>
                    <Input id="first_name" name="first_name" required className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="last_name" className="font-sans">Last Name *</Label>
                    <Input id="last_name" name="last_name" required className="mt-1.5" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="font-sans">Email Address *</Label>
                  <Input id="email" name="email" type="email" required className="mt-1.5" />
                </div>

                <div>
                  <Label htmlFor="phone" className="font-sans">Phone Number *</Label>
                  <Input id="phone" name="phone" type="tel" required className="mt-1.5" />
                </div>

                <p className="text-xs text-muted-foreground">
                  We'll use this information to send your compatibility assessment and answer any questions.
                </p>

                <div className="pt-2">
                  <Label className="font-sans block mb-2">Photos & Video Walkthrough</Label>
                  <ul className="space-y-1.5 mb-3 text-sm text-muted-foreground">
                    {[
                      "A photo of the area where you'd like to place the sauna",
                      "A photo of the outlet you'll use",
                      "A photo of your electrical panel",
                      "Optional: a short video walking through the space",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <input
                    type="file"
                    name="attachments"
                    multiple
                    accept="image/*,video/*"
                    data-advanced="true"
                    data-max-files="10"
                    data-max-file-size="25MB"
                    className="w-full border border-dashed border-border rounded-xl p-4 bg-secondary/30 font-sans text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Drag and drop or tap to upload. Up to 10 files, max 25MB each.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    shape="pill"
                    disabled={submitting}
                    className="bg-[hsl(var(--color-accent))] text-[hsl(var(--color-white))] font-sans font-medium h-auto px-8 py-4 text-base w-full"
                  >
                    {submitting ? "Submitting…" : "Submit Assessment"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    We'll review your setup and get back to you personally.
                  </p>
                </div>
              </form>
            </Card>
          )}

          {/* RESULT card (No / Not Sure) */}
          {view.kind === "result" && (
            <Card>
              <div className="flex items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-full bg-[hsl(var(--color-accent))]/10 flex items-center justify-center">
                  <ShieldCheck className="text-[hsl(var(--color-accent))]" size={26} />
                </div>
              </div>
              {view.from === 2 ? (
                <>
                  <h2 className="text-center text-[24px] md:text-[30px] leading-[1.2] font-semibold mb-3">
                    You May Still Have Options
                  </h2>
                  <p className="text-center text-base text-muted-foreground mb-8">
                    Even if you don't currently have a suitable outlet nearby, there may still be ways to install a sauna depending on your home's layout and electrical setup.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-center text-[24px] md:text-[30px] leading-[1.2] font-semibold mb-3">
                    Let's Take a Closer Look
                  </h2>
                  <p className="text-center text-base text-muted-foreground mb-8">
                    Your home may still be compatible. We'll need a little more information about your electrical setup before making a recommendation.
                  </p>
                </>
              )}

              <BookConsultationCTA
                subtext={
                  view.from === 2
                    ? "We'll review your space, electrical setup, and sauna options. Consultation fee is credited toward the purchase of an Anywhere Sauna."
                    : "We'll help evaluate your options."
                }
              />

              <button
                type="button"
                onClick={goBack}
                className="mt-6 w-full h-12 rounded-full border-[1.5px] border-[hsl(var(--color-accent))] text-[hsl(var(--color-accent))] bg-transparent font-sans font-medium text-base transition-[filter] hover:brightness-[0.92]"
              >
                Back to Assessment
              </button>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ElectricalCompatibilityQuiz;
