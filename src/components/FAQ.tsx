import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const faqs = [
  {
    question: "Will this actually work in my home?",
    answer:
      "Yes — it's specifically designed for standard 120V outlets. About ~98% of homes and apartments already have the setup needed.\n\nIf you're unsure, book a free 15-minute video consult and we'll check your outlet + breaker together.",
  },
  {
    question: "I thought a standard outlet couldn't get a sauna hot?",
    answer:
      "Normally, it can't.\n\nTraditional saunas assume a large space and a 240V heater. This sauna is designed differently:\n\n• smaller air volume\n• elevated seating (so your whole body sits in the heat zone)\n• high-efficiency insulation\n\nThat combination allows a 120V heater to reach ~160–194°F in real use.",
  },
  {
    question: "Why doesn't it come with a heater?",
    answer:
      "Three reasons:\n\n• lower cost (no forced bundle markup)\n• flexibility (choose your own heater based on budget or preference)\n• easy replacement (no vendor lock-in)\n\nWe can recommend options during a free consult.",
  },
  {
    question: "What heater should I get?",
    answer:
      "Look for:\n\n• 1.5–2.0kW power\n• fits within 13″ × 22″ × 9″\n• wall-mount compatible\n\nWe can suggest specific models based on your setup.",
  },
  {
    question: "Do I need an electrician or special installation?",
    answer:
      "No.\n\nIt runs on a standard outlet. No permits, no wiring, no contractor coordination.",
  },
  {
    question: "Will this overload my apartment?",
    answer:
      "No — when used on a proper 20A circuit.\n\nWe'll confirm your setup during the free consult to make sure everything is safe.",
  },
  {
    question: "How hot does it actually get?",
    answer:
      "Up to ~194°F (the practical/legal max).\n\nTypical ranges:\n\n• cooler environments → ~150–170°F\n• moderate → ~170–185°F\n• warm → ~185–194°F",
  },
  {
    question: "How long does it take to heat up?",
    answer: "~40–60 minutes depending on the ambient temperature.",
  },
  {
    question: "Can I use it indoors?",
    answer:
      "Yes.\n\nIt's designed for indoor or outdoor use — apartments, garages, patios, and backyards all work.",
  },
  {
    question: "Will it damage my floors or space?",
    answer:
      "No, with normal use.\n\nIt sits on a flat surface and doesn't require permanent installation. For extra protection, you can place a mat underneath.",
  },
  {
    question: "Is this renter-friendly?",
    answer:
      "Yes.\n\nNo electrical work and easy to remove if you move.",
  },
  {
    question: "How much space do I need?",
    answer:
      "Roughly a 63\" × 49\" footprint.\n\nFits in most rooms, patios, or garage spaces. We can help sanity-check your space on a quick call.",
  },
  {
    question: "Can it go outside?",
    answer:
      "Yes.\n\nWorks indoors or outdoors on any level surface. The sauna performs best when the ambient temperature is >50°F",
  },
  {
    question: "How much electricity does it use?",
    answer:
      "About 1.5–2.0 kWh per hour.\n\nTypical cost: ~$0.50 – $2 per session depending on your local electricity rates.",
  },
  {
    question: "Do I need to leave it running all the time?",
    answer:
      "No.\n\nTurn it on ~40–60 minutes before use, then turn it off when you're done.",
  },
  {
    question: "Why not just get a traditional sauna?",
    answer:
      "You can — if you're okay with:\n\n• hiring an electrician\n• running a 240V line\n• permits or landlord approval\n• higher install costs\n\nThis sauna is designed to avoid all of that.",
  },
  {
    question: "What's the catch?",
    answer:
      "It's smaller than traditional saunas, while still comfortably fitting two people.\n\nThat's intentional.\n\nThe reduced volume is what allows it to heat efficiently using just a standard home outlet.\n\nAnd like any sauna, colder outdoor conditions mean longer heat-up times and lower peak temperatures.\n\nThe Anywhere Sauna performs best in climates >50°F or indoors.",
  },
];

const ConsultCallout = ({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) => (
  <div className="rounded-xl bg-card border border-border/60 p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">
        {heading}
      </h3>
      <p className="text-muted-foreground text-sm md:text-base">{body}</p>
    </div>
    <Link to="/electric-checklist" className="shrink-0">
      <Button size="lg" shape="card" className="w-full md:w-auto">
        Book Free Consult
      </Button>
    </Link>
  </div>
);

const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-3 text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-10">
          Everything you need to know before getting your own sauna
        </p>

        <div className="mb-8">
          <ConsultCallout
            heading="Not sure if it'll work in your home?"
            body="Book a free 15-minute video consultation and we'll check your setup together."
          />
        </div>

        <Accordion
          type="single"
          collapsible
          className="mb-10 divide-y divide-border/60 border-y border-border/60"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b-0"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-primary py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground whitespace-pre-line text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <ConsultCallout
          heading="Still unsure?"
          body="We'll tell you in 5 minutes if this will work in your space."
        />
      </div>
    </section>
  );
};

export default FAQ;
