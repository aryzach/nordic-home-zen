import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const LeaveReview = () => {
  useSEO({
    title: "Leave a Review | SF Sauna",
    description: "Share your experience with SF Sauna. Your feedback helps us improve and helps others discover our service.",
    canonical: "https://getanywheresauna.com/leave-review",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <section className="py-24 md:py-32 w-full">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="mb-6 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={32}
                  className="text-[hsl(var(--color-accent))] fill-[hsl(var(--color-accent))]"
                />
              ))}
            </div>

            <h1 className="font-heading text-[32px] md:text-[42px] font-semibold text-heading mb-6">
              Leave us a review
            </h1>

            <p className="font-sans text-[17px] md:text-[18px] text-text leading-relaxed mb-8">
              Your feedback means the world to us. Share your experience with The Anywhere Sauna on Trustpilot and help others discover what makes our saunas special.
            </p>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-ui">
              <p className="font-sans text-[16px] text-text">
                A Trustpilot review form will appear shortly. If it doesn't load,
                please refresh the page or reach out to us directly.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LeaveReview;
