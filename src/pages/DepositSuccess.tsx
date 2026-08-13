import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/analytics";

const DepositSuccess = () => {
  useSEO({
    title: "Deposit Received | Anywhere Sauna",
    description:
      "Thank you for reserving your Anywhere Sauna. Your $500 deposit has been received.",
    canonical: "https://getanywheresauna.com/deposit-success",
  });

  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackEvent("deposit_paid", {
      value: 500,
      currency: "USD",
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-[78px] lg:pt-24">
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[640px] px-5 md:px-10 text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle2 size={64} className="text-[#1c1d1d]" />
            </div>
            <h1
              className="font-bold text-[#1c1d1d] mb-4"
              style={{ fontSize: "clamp(24px, 4vw, 32px)", lineHeight: 1.2 }}
            >
              Deposit Received
            </h1>
            <p className="text-[16px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d] mb-3">
              Thank you for reserving your Anywhere Sauna. Your $500 deposit
              has been received and your spot in the production queue is
              secured.
            </p>
            <p className="text-[14px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d]/70 mb-8">
              A representative from SF Sauna will be in touch shortly with next
              steps. The remaining $6,950 will be due before shipment.
            </p>
            <Link
              to="/"
              className="inline-block bg-[#111111] text-white font-bold text-[16px] tracking-[0.025em] px-6 py-[11px] hover:bg-black transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DepositSuccess;
