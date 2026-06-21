import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";

const ProductFAQTeaser = () => {
  const top = faqs.slice(0, 5);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1000px] px-5 md:px-10 py-10 md:py-16">
        <p className="uppercase text-[12px] font-bold tracking-[0.18em] text-[#1c1d1d]/70 mb-3 text-center">
          Questions
        </p>
        <h2
          className="font-bold text-[#1c1d1d] mb-8 md:mb-10 text-center"
          style={{ fontSize: "clamp(22px, 3vw, 28px)", lineHeight: 1.2, letterSpacing: 0 }}
        >
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="border-t border-[#e8e8e1]">
          {top.map((f, i) => (
            <AccordionItem
              key={i}
              value={`f-${i}`}
              className="border-b border-[#e8e8e1]"
            >
              <AccordionTrigger className="group py-5 hover:no-underline [&>svg:last-child]:hidden">
                <span className="flex items-center gap-4 text-left font-bold text-[14px] md:text-[15px] tracking-[0.025em] text-[#1c1d1d]">
                  <Plus
                    size={18}
                    strokeWidth={2}
                    className="shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-45"
                  />
                  {f.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-[34px] pb-5 text-[14px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d] whitespace-pre-line">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 text-center">
          <Link
            to="/faq"
            className="inline-block text-[13px] font-bold uppercase tracking-[0.18em] text-[#111] border-b border-[#111] pb-1 hover:opacity-70 transition-opacity"
          >
            See all FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductFAQTeaser;
