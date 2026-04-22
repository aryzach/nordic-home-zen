import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const LeaveReview = () => {
  useSEO({
    title: "Leave a Review | SF Sauna Rental",
    description: "Share your experience with SF Sauna Rental on Trustpilot. Your feedback helps us improve and helps others discover our service.",
    canonical: "https://sfsaunarental.com/leave-review",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      (function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};
        a=d.createElement(s);a.async=1;a.src=r;a.type='text/java'+s;f=d.getElementsByTagName(s)[0];
        f.parentNode.insertBefore(a,f)})(window,document,'script', 'https://invitejs.trustpilot.com/tp.min.js', 'tp');
        tp('register', 'SAE9BtredtcqCbWn');
    `;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

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
