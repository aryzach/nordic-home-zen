import { Flame, Droplets, ThermometerSun } from "lucide-react";

const features = [
  {
    icon: ThermometerSun,
    text: "Reaches 160–194°F in under an hour",
  },
  {
    icon: Flame,
    text: "Real heater + stones",
  },
  {
    icon: Droplets,
    text: "Pour water, get steam",
  },
];

const SaunaFeatures = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.text} className="flex flex-col items-center text-center">
              <f.icon className="text-accent mb-4" size={40} />
              <p className="text-xl font-heading font-semibold text-heading">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaunaFeatures;
