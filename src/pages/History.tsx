import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const timelineEvents = [
  {
    year: "2024",
    items: [
      "Realize there are no steam saunas that use a standard outlet. All solutions are expensive and require electrical modifications.",
    ],
  },
  {
    year: "2025",
    items: [
      "R&D, design, build, and install early prototypes for customers in the SF Bay Area.",
    ],
  },
  {
    year: "2026",
    items: [
      "Launch the Anywhere Sauna nationwide to enable anyone to have a sauna, no matter if they rent or own their home or apartment.",
      "Develop the Insta-Hot sauna heater.",
    ],
  },
  {
    year: "2027",
    items: [
      "Launch the Insta-Hot sauna heater, compatible with the Anywhere Sauna.",
    ],
  },
];

const History = () => {
  useSEO({
    title: "History | The Anywhere Sauna",
    description:
      "How the Anywhere Sauna came to be — from frustration with expensive installs to a plug-in sauna that works anywhere.",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* Timeline */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-semibold mb-12 text-foreground text-center">
              History
            </h1>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

              <div className="space-y-12">
                {timelineEvents.map((event, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div
                      key={event.year}
                      className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Dot */}
                      <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-1.5 md:mt-0 z-10" />

                      {/* Content */}
                      <div
                        className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                          isLeft ? "md:text-right md:pr-0" : "md:text-left md:pl-0"
                        }`}
                      >
                        <span className="inline-block text-2xl font-semibold text-accent mb-2">
                          {event.year}
                        </span>
                        {event.items.map((item, j) => (
                          <p
                            key={j}
                            className="text-muted-foreground leading-relaxed mt-1"
                          >
                            {item}
                          </p>
                        ))}
                      </div>

                      {/* Spacer for the other side */}
                      <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Writeup */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
              A little about the history of this design and how it came to be
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              A normal wall outlet is severely underpowered for a sauna. In Europe, where saunas are everywhere, and most of the rest of the world, they have 2x the power compared to the US for all their outlets. This makes installing a sauna heater very easy.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I severely wanted a sauna, but found there weren't any good options that didn't require expensive electrical modifications that all other saunas need, and my landlord wouldn't have approved that anyway.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I started with an infrared sauna, which can plug into a normal outlet, but this didn't satiate my desire for real dry heat of the good saunas I've been to.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I bought a 120V heater to put in my infrared sauna and see if it would get to temps that were satisfying. While it got warmer, my legs were still cold and the sauna seemed to be losing a lot of heat.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              From there, I spent months iterating on the design, and trying countless modifications to get the heat I wanted.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I raised the bench and the floor to create more even heat, I insulated the ceiling, walls, and glass, I sealed the cracks around the door. Some of this helped and some didn't. But I ended up with a design that worked, and got just as hot as the good saunas I've used at the spa or my gym.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              So here it is, the Anywhere Sauna. The sauna that can go anywhere, fits most places, inside or out, and can plug into (almost) any standard American outlet.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I hope this sauna enables many others to enjoy sauna at home, whether you have a sprawling backyard or a studio apartment, no matter the temperament of your landlord, and all without breaking the bank.
            </p>

            <p className="text-lg text-foreground leading-relaxed font-medium mt-8">
              Enjoy, and stay sweaty.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              With love,
            </p>
            <p className="text-xl font-semibold text-foreground">Zach</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default History;
