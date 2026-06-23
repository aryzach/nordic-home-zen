import { ExternalLink, Check, X, Phone, FileText, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackEvent } from "@/lib/analytics";

const BOOKING_URL = "https://cal.com/zach-pretzell/30min";

const BookButton = ({ className = "" }: { className?: string }) => (
  <a
    href={BOOKING_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() =>
      trackEvent("consultation_booking_click", {
        button_text: "Book Free Consultation",
        location: "consultation_page",
      })
    }
    className={`inline-flex items-center justify-center gap-2 bg-white text-[#111111] border border-[#111111] font-bold text-[16px] px-5 py-[11px] hover:bg-[#111111] hover:text-white transition-colors ${className}`}
    style={{ fontFamily: "'Montserrat', ui-sans-serif, system-ui, sans-serif" }}
  >
    Book Free Consultation
    <ExternalLink className="w-4 h-4" aria-hidden="true" />
  </a>
);

type CoverItem = { title: string; question: string; items: string[] };

const coverItems: CoverItem[] = [
  { title: "Space", question: "Where are you considering putting a sauna?", items: ["Indoor or outdoor", "Available dimensions", "HOA or landlord restrictions", "Access for delivery"] },
  { title: "Electrical", question: "What can your home electrical setup support?", items: ["Existing outlets", "120V vs 240V", "Electrical upgrades", "Extension run options"] },
  { title: "Budget", question: "What do you expect to spend all-in?", items: ["Sauna budget", "Installation budget", "Operating costs"] },
  { title: "Goals", question: "What's important to you when choosing a sauna?", items: ["Recovery", "Relaxation", "Heat training", "Family use"] },
  { title: "Aesthetics", question: "Did you have a certain look in mind?", items: ["Barrel sauna", "Cabin sauna", "Modern sauna", "Indoor sauna"] },
  { title: "Questions", question: "Any other considerations you'd like to chat about?", items: ["Compare brands", "Compare models", "Understand tradeoffs", "Anything else"] },
];

type SaunaType = {
  name: string;
  image: string;
  bestFor: string;
  price: string;
  difficulty: string;
};

const saunaTypes: SaunaType[] = [
  {
    name: "Anywhere Sauna",
    image: "/images/sauna-type-anywhere.jpg",
    bestFor: "Renters, apartments, simple installs",
    price: "$4k – $6k",
    difficulty: "Low — plug into a standard outlet",
  },
  {
    name: "Barrel Sauna",
    image: "/images/sauna-type-barrel.jpg",
    bestFor: "Outdoor backyards, traditional look",
    price: "$6k – $12k",
    difficulty: "High — dedicated circuit, electrician required",
  },
  {
    name: "Traditional Cabin Sauna",
    image: "/images/sauna-type-cabin.jpg",
    bestFor: "Maximum performance, full Finnish experience",
    price: "$8k – $20k+",
    difficulty: "High — dedicated circuit, electrician required",
  },
  {
    name: "Infrared Sauna",
    image: "/images/sauna-type-infrared.jpg",
    bestFor: "Indoor use, lower temps, plug-in",
    price: "$2k – $6k",
    difficulty: "Low — standard outlet",
  },
];


const mistakes = [
  "Buying a sauna that won't fit",
  "Unexpected electrical costs",
  "Choosing the wrong sauna type",
  "Overpaying for features you don't need",
  "Buying a sauna that doesn't match your goals",
];

const heroChecks: { label: string; Icon: typeof Phone }[] = [
  { label: "Free 30-minute call", Icon: Phone },
  { label: "Personalized recommendations", Icon: FileText },
  { label: "Cost & installation estimates", Icon: DollarSign },
];

const reportItems = [
  "Recommended sauna models",
  "Estimated purchase costs",
  "Estimated installation costs",
  "Electrical requirements",
  "Expected timeline",
  "Pros and cons",
];

const SaunaPlanningConsultation = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        {/* SECTION 1: HERO */}
        <section className="section-y border-b border-border">
          <div className="container-x max-w-3xl text-center">
            <h1 className="mb-6">Not Sure Which Sauna Is Right For Your Home?</h1>
            <div className="flex justify-center mb-6">
              <BookButton />
            </div>
            <p className="text-[15px] md:text-[16px] text-[#1c1d1d] mb-6 max-w-2xl mx-auto">
              After the call, you'll receive personalized recommendations and estimated costs.
            </p>
            <ul className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-12 text-[14px] text-[#1c1d1d]">
              {heroChecks.map(({ label, Icon }) => (
                <li key={label} className="flex sm:flex-col items-center justify-center gap-2">
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-[#111111]" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 2: WHAT WE'LL COVER */}
        <section className="section-y">
          <div className="container-x max-w-[1100px]">
            <p className="eyebrow mb-3 text-center">What we'll cover</p>
            <h2 className="text-center mb-8">On the 30-minute call</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 max-w-3xl md:max-w-[1000px] mx-auto">
              {coverItems.map((item) => (
                <Accordion key={item.title} type="single" collapsible>
                  <AccordionItem value={item.title} className="border-b border-[#e8e8e1]">
                    <AccordionTrigger className="hover:no-underline py-4 text-left">
                      <div>
                        <div className="text-[13px] font-bold tracking-[0.18em] uppercase text-[#1c1d1d]">
                          {item.title}
                        </div>
                        <div className="text-[14px] text-[#1c1d1d]/70 mt-1 font-normal normal-case tracking-normal">
                          {item.question}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[13px] text-[#1c1d1d] pb-3 pt-1">
                        {item.items.map((i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#C28C5C] mt-[1px]">—</span>
                            <span>{i}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: COMMON SAUNA TYPES */}
        <section className="section-y bg-[#f5f5f5]">
          <div className="container-x max-w-[1100px]">
            <p className="eyebrow mb-3 text-center">Common sauna types</p>
            <h2 className="text-center mb-8">What we'll compare</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {saunaTypes.map((s) => (
                <div key={s.name} className="border border-border bg-white flex flex-col">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full aspect-[4/3] object-contain bg-[#f5f5f5]"

                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-[14px] font-bold tracking-[0.025em] uppercase mb-3 text-[#1c1d1d]">
                      {s.name}
                    </h3>
                    <dl className="space-y-2 text-[13px] text-[#1c1d1d]">
                      <div>
                        <dt className="font-bold">Best for</dt>
                        <dd>{s.bestFor}</dd>
                      </div>
                      <div>
                        <dt className="font-bold">Install difficulty</dt>
                        <dd>{s.difficulty}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: WHAT YOU'LL RECEIVE */}
        <section className="section-y">
          <div className="container-x max-w-[1100px]">
            <p className="eyebrow mb-3 text-center">What you'll receive</p>
            <h2 className="text-center mb-8">Your Personalized Sauna Plan</h2>




            <div className="mt-6 max-w-3xl mx-auto">
              <p className="text-[14px] text-[#1c1d1d] mb-3">
                After the consultation we'll send recommendations tailored to your home.
              </p>
              <p className="text-[14px] text-[#1c1d1d] mb-2 font-bold">Your report may include:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[14px] text-[#1c1d1d]">
                {reportItems.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-[#111111]" aria-hidden="true" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: COMMON MISTAKES */}
        <section className="section-y bg-[#f5f5f5]">
          <div className="container-x max-w-3xl">
            <p className="eyebrow mb-3 text-center">Common mistakes</p>
            <h2 className="text-center mb-6">Avoid</h2>
            <ul className="space-y-2 text-[14px] text-[#1c1d1d]">
              {mistakes.map((m) => (
                <li key={m} className="flex items-start gap-3 border border-border bg-white px-4 py-3">
                  <X className="w-4 h-4 mt-[3px] shrink-0 text-[#111111]" aria-hidden="true" /> {m}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 6: FINAL CTA */}
        <section className="section-y bg-[#f3e2d0]">
          <div className="container-x max-w-3xl text-center">
            <h2 className="mb-3">Get Help Choosing The Right Sauna</h2>
            <p className="text-[14px] md:text-[15px] text-[#1c1d1d] mb-6 max-w-xl mx-auto">
              Book a free consultation and get personalized recommendations for your home.
            </p>
            <div className="flex justify-center">
              <BookButton />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SaunaPlanningConsultation;
