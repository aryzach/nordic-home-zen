import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { trackAndNavigate } from "@/lib/analytics";
import { faqs } from "@/data/faqs";



const ConsultCallout = ({
  heading,
  body,
}: {
  heading: string;
  body?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl bg-card border border-border/60 p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">
          {heading}
        </h3>
        {body && <p className="text-muted-foreground text-sm md:text-base">{body}</p>}
      </div>
      <Button
        shape="pill"
        className="shrink-0 w-full md:w-auto bg-[hsl(var(--color-accent))] text-[hsl(var(--color-white))] font-sans font-medium h-auto px-[28px] py-[14px] text-sm md:text-base"
        onClick={() =>
          trackAndNavigate(
            "consultation_booking_click",
            { button_text: "Book Free Consultation", location: "faq_callout" },
            () => navigate("/sauna-planning-consultation")
          )
        }
      >
        Book Free Consultation
      </Button>
    </div>
  );
};

const FAQ = () => {
  const navigate = useNavigate();
  return (
    <section id="faq" className="pt-2 pb-12 md:pt-2 md:pb-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">

        <div className="mb-8">
          <ConsultCallout
            heading="Not sure if it'll work in your home?"
            body="Book a 30-minute video consultation and we'll check your setup together."
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

        <div className="flex justify-center">
          <Button
            shape="pill"
            className="bg-[hsl(var(--color-accent))] text-[hsl(var(--color-white))] font-sans font-medium h-auto px-[52px] py-[18px] text-base"
            onClick={() =>
              trackAndNavigate(
                "consultation_booking_click",
                { button_text: "More Questions?", location: "faq_footer" },
                () => navigate("/sauna-planning-consultation")
              )
            }
          >
            More Questions?
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
