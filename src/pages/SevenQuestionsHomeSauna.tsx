import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/analytics";
import { BOOKING_URL } from "@/lib/booking";

const BOOK_LOCATION = "blog_seven_questions";
const trackBooking = (button_text: string) =>
  trackEvent("consultation_booking_click", { button_text, location: BOOK_LOCATION });

const SevenQuestionsHomeSauna = () => {
  useSEO({
    title: "7 Questions To Ask Yourself Before Investing In A Home Sauna",
    description:
      "Before comparing brands and models, answer these 7 questions about space, electrical, authority, and budget to narrow down the right home sauna for you.",
    canonical: "https://sfsaunarental.com/7-questions-before-buying-a-home-sauna",
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold mb-8 text-foreground">
            7 Questions To Ask Yourself Before Investing In A Home Sauna
          </h1>

          <div className="prose prose-lg max-w-none text-foreground space-y-6">
            <p>
              Buying a home sauna can be one of the best wellness investments you'll ever make.
              But before you start comparing brands and models, it's worth stepping back and
              answering a few key questions.
            </p>
            <p>Most people assume the biggest constraint is budget.</p>
            <p>In reality, the four things that matter most are:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Space</li>
              <li>Electrical</li>
              <li>Authority (what you're allowed to modify)</li>
              <li>Budget</li>
            </ul>
            <p>Get those right first, and your sauna search becomes much easier.</p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-10">Not Sure Where To Start?</h2>
            <p>
              The fastest way to figure out what sauna options make sense for your home is to
              schedule a free 15-minute{" "}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackBooking("Free Consultation")}
                className="text-primary underline inline-flex items-baseline gap-1"
              >
                Free Consultation
                <ExternalLink className="w-3 h-3 self-center" aria-hidden="true" />
              </a>
              .
            </p>
            <p>We'll help you determine:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>What electrical service you have</li>
              <li>Which sauna types will work</li>
              <li>Whether modifications are needed</li>
              <li>What options fit your budget</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-semibold mt-10">
              1. Where Could A Sauna Actually Go?
            </h2>
            <p>Most people immediately think about their backyard.</p>
            <p>But before narrowing down your options, consider every space that might work:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Backyard</li>
              <li>Garage</li>
              <li>Basement</li>
              <li>Spare bedroom</li>
              <li>Living room</li>
              <li>Covered patio</li>
              <li>Balcony</li>
              <li>Large bathroom</li>
            </ul>
            <p>
              You may even find that moving a piece of furniture or rearranging a room opens up
              possibilities you hadn't considered.
            </p>
            <p>The best sauna location isn't always the most obvious one.</p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-10">
              2. How Much Space Do You Really Need?
            </h2>
            <p>Many buyers overestimate how much room a sauna requires.</p>
            <p>
              A typical 2-person sauna can fit into spaces smaller than many desks, couches, or
              dining tables.
            </p>
            <p>Before ruling out a location, grab a tape measure and map it out.</p>
            <p>Ask yourself:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Could I comfortably fit a sauna here?</li>
              <li>Can I still access doors, windows, and walkways?</li>
              <li>Is there enough room to enter and exit comfortably?</li>
            </ul>
            <p>You may be surprised by how many locations work.</p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-10">
              3. What Electrical Service Is Available?
            </h2>
            <p>This is the most overlooked question, and often the most important one.</p>
            <p>
              Most people assume their available space determines what sauna they can buy.
            </p>
            <p>
              In reality, your home's electrical configuration is usually the bigger constraint.
            </p>
            <p>There are three main categories:</p>

            <h3 className="text-xl md:text-2xl font-semibold mt-6">120V / 15 Amp</h3>
            <p>This is the standard outlet found in virtually every home and apartment.</p>
            <p>
              If you only have access to a 15-amp circuit, your best option is typically an
              infrared sauna.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold mt-6">120V / 20 Amp</h3>
            <p>This is the sweet spot.</p>
            <p>Most homes and apartments have at least one 20-amp circuit somewhere in the home.</p>
            <p>
              A 20-amp circuit opens the door to traditional electric saunas that can reach
              substantially higher temperatures than most standard 15-amp options.
            </p>
            <p>
              If you have a 20-amp circuit available, the{" "}
              <a
                href="https://getanywheresauna.com/"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anywhere Sauna
              </a>{" "}
              is specifically designed for this use case.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold mt-6">240V</h3>
            <p>This is the electrical service used by most larger traditional saunas.</p>
            <p>
              If you already have a 240V circuit where you want your sauna, your options expand
              significantly.
            </p>
            <p>
              One option worth considering is the{" "}
              <a
                href="https://premiumsaunas.com/products/saunalife-model-cl4g"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                SaunaLife Nordica series
              </a>
              .
            </p>
            <p>
              If you're not sure whether you have a 15-amp, 20-amp, or 240V circuit available,{" "}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackBooking("schedule a free consultation")}
                className="text-primary underline"
              >
                schedule a free consultation
              </a>{" "}
              and we'll help you figure it out.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-10">4. Do You Own Your Home?</h2>
            <p>Ownership changes your options considerably.</p>
            <p>If you own your home, electrical modifications may be worth considering.</p>
            <p>
              Adding a new 240V circuit often costs a few thousand dollars, but it can unlock a
              much wider range of traditional sauna options.
            </p>
            <p>If you're planning to stay in your home for years, the investment may make sense.</p>
            <p>
              Many homeowners find that spending $2,000 to $4,000 on electrical work dramatically
              expands their sauna options.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-10">
              5. If You Rent, What Would Your Landlord Allow?
            </h2>
            <p>Many renters assume they can't own a sauna.</p>
            <p>That's often not true.</p>
            <p>Some landlords will approve electrical upgrades if:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You pay for the work</li>
              <li>A licensed electrician performs the installation</li>
              <li>The improvement remains with the property</li>
            </ul>
            <p>
              In some cases, spending a few thousand dollars on electrical work can still be
              worthwhile if you plan to stay for several years.
            </p>
            <p>
              Other renters prefer plug-and-play solutions that require no modifications and no
              landlord approval.
            </p>
            <p>
              The Anywhere Sauna was designed specifically for this situation. It plugs into a
              standard household outlet and doesn't require electrical modifications or landlord
              approval.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-10">6. What's Your Real Budget?</h2>
            <p>A home sauna purchase is often larger than the sticker price.</p>
            <p>Consider the total project cost:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Sauna</li>
              <li>Shipping</li>
              <li>Electrical work (if required)</li>
              <li>Installation</li>
              <li>Flooring or site preparation</li>
            </ul>
            <p>Typical ranges look something like this:</p>

            <h3 className="text-xl md:text-2xl font-semibold mt-6">$4,000 - $6,000</h3>
            <p>Plug-and-play options, smaller traditional saunas, and infrared saunas.</p>

            <h3 className="text-xl md:text-2xl font-semibold mt-6">$6,000 - $10,000</h3>
            <p>Larger traditional saunas, premium materials, and more powerful heaters.</p>

            <h3 className="text-xl md:text-2xl font-semibold mt-6">$10,000+</h3>
            <p>Higher-end installations, larger capacities, and custom projects.</p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-10">
              7. Which Category Do You Fall Into?
            </h2>
            <p>For most buyers, the answer ends up being surprisingly straightforward.</p>

            <h3 className="text-xl md:text-2xl font-semibold mt-6">I Have A 120V 15A Circuit</h3>
            <p>Consider an infrared sauna.</p>

            <h3 className="text-xl md:text-2xl font-semibold mt-6">I Have A 120V 20A Circuit</h3>
            <p>
              The{" "}
              <a
                href="https://getanywheresauna.com/"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anywhere Sauna
              </a>{" "}
              is likely the simplest path to a traditional sauna experience without electrical
              work.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold mt-6">
              I Own My Home, Have An $8,000+ Budget, And Don't Mind Electrical Work
            </h3>
            <p>Consider installing a 240V circuit and looking at options like:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <a
                  href="https://premiumsaunas.com/products/saunalife-model-cl4g"
                  className="text-primary underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SaunaLife Nordica
                </a>
              </li>
              <li>
                <a
                  href="https://www.costco.com/saunas.html"
                  className="text-primary underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Costco Saunas
                </a>
              </li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold mt-6">
              I Rent But My Landlord Is Open To Improvements
            </h3>
            <p>
              You may be able to pay for a dedicated 240V circuit and access the same category of
              larger traditional saunas.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-10">Final Thoughts</h2>
            <p>
              Most sauna buyers spend too much time comparing brands and not enough time
              understanding their constraints.
            </p>
            <p>Start with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Space</li>
              <li>Electrical</li>
              <li>Authority</li>
              <li>Budget</li>
            </ul>
            <p>
              Once you've answered those four questions, you'll quickly narrow hundreds of sauna
              options down to the handful that actually make sense for your home.
            </p>
            <p>
              And if you're unsure what electrical service is available or which sauna options are
              realistic for your space,{" "}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackBooking("schedule a Free Consultation")}
                className="text-primary underline"
              >
                schedule a Free Consultation
              </a>
              .
            </p>

            <div className="mt-12 pt-8 border-t border-border">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackBooking("Schedule Your Free Consultation")}
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
              >
                Schedule Your Free Consultation
              </a>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default SevenQuestionsHomeSauna;
