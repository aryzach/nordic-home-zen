import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Target,
  MapPin,
  Zap,
  Scale,
  MessageCircleQuestion,
  CheckCircle2,
} from "lucide-react";

const BOOKING_URL = "https://calendar.app.google/tn9D96XCvg1sYfZGA";

const covered = [
  {
    icon: Target,
    title: "Your Sauna Goals",
    body: "We'll discuss what you're looking for in a sauna, including temperature, size, indoor vs outdoor placement, budget, and how often you plan to use it.",
  },
  {
    icon: MapPin,
    title: "Placement Options",
    body: "We'll review your space and identify potential sauna locations.",
  },
  {
    icon: Zap,
    title: "Electrical Assessment",
    body: "We'll evaluate your electrical setup and determine which sauna options are compatible with your home.",
  },
  {
    icon: Scale,
    title: "Compare Your Options",
    body: "We'll explain the costs, timelines, installation requirements, and tradeoffs for each available option.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Q&A",
    body: "Ask anything you'd like about saunas, installation, landlords, apartments, power requirements, maintenance, or ownership.",
  },
];

const steps = [
  { n: "1", title: "Schedule", body: "Book a consultation time that works for you." },
  { n: "2", title: "Join the Video Call", body: "FaceTime, Zoom, or Google Meet." },
  { n: "3", title: "Walk Us Through Your Space", body: "We'll review your intended location and electrical setup." },
  { n: "4", title: "Receive Recommendations", body: "You'll leave with a clear understanding of what sauna options are available and what each would cost." },
];

const outcomes = [
  "Ready to rent a sauna immediately",
  "Ready to purchase a sauna",
  "Need a small electrical upgrade first",
  "Need to evaluate a different location",
  "Decide a sauna isn't the right fit",
];

const BookButton = ({ className = "" }: { className?: string }) => (
  <Button asChild size="lg" className={`bg-accent hover:bg-accent/90 text-white ${className}`}>
    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
      <Calendar className="mr-2" size={18} />
      Book Electrical Compatibility Consultation
    </a>
  </Button>
);

const ElectricChecklist = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-semibold mb-6 text-heading">
              Electrical Compatibility Consultation
            </h1>
            <p className="text-xl text-foreground mb-4">
              Thinking about getting a sauna but not sure what's possible at your home?
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              In a 30-minute video consultation, we'll review your goals, assess your space and electrical setup, and walk through the sauna options available to you.
            </p>

            <div className="bg-card p-6 rounded-lg border border-border mb-8">
              <p className="text-2xl font-heading font-semibold text-heading mb-2">
                $109 consultation fee
              </p>
              <p className="text-muted-foreground">
                If you move forward with a sauna purchase or rental, the full consultation fee is credited toward your order.
              </p>
            </div>

            <BookButton className="w-full md:w-auto" />
          </div>
        </section>

        {/* What's Covered */}
        <section className="py-16 bg-cedar-section">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-heading mb-10 text-center">
              What's Covered
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {covered.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-card p-6 rounded-lg border border-border">
                  <Icon className="text-accent mb-4" size={28} />
                  <h3 className="text-xl font-heading font-semibold text-heading mb-2">{title}</h3>
                  <p className="text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-heading mb-10 text-center">
              How It Works
            </h2>
            <ol className="space-y-6">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-heading mb-1">{s.title}</h3>
                    <p className="text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-cedar-section">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-heading mb-6 text-center">
              Pricing
            </h2>
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <p className="text-2xl font-heading font-semibold text-heading mb-4">
                Consultation Fee: $109
              </p>
              <p className="text-muted-foreground mb-2">
                The consultation fee is fully credited toward any sauna purchase or rental.
              </p>
              <p className="text-muted-foreground">
                If you move forward, your consultation was effectively free.
              </p>
            </div>
            <p className="text-center text-muted-foreground mt-8 max-w-xl mx-auto">
              Most homes and apartments already have at least one viable sauna option available. We'll help determine what's possible in your specific situation.
            </p>
          </div>
        </section>

        {/* Common Outcomes */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-heading mb-4 text-center">
              Common Outcomes
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              After the consultation, most people leave with one of the following:
            </p>
            <ul className="space-y-3 mb-8">
              {outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border">
                  <CheckCircle2 className="text-accent flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-foreground">{o}</span>
                </li>
              ))}
            </ul>
            <p className="text-center text-muted-foreground italic">
              The goal is clarity before spending thousands of dollars.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-cedar-section">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-heading mb-4">
              Ready to see what's possible?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book an Electrical Compatibility Consultation and get a clear understanding of your sauna options.
            </p>
            <BookButton className="w-full md:w-auto" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ElectricChecklist;
