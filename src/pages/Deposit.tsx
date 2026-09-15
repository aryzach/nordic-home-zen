import Header from "@/components/Header";
import Footer from "@/components/Footer";
const saunaExterior = "/installs/specs-1.jpg";
import { useSEO } from "@/hooks/useSEO";
import { trackAndNavigate } from "@/lib/analytics";

const Deposit = () => {
  useSEO({
    title: "Reserve Your Anywhere Sauna | $500 Deposit",
    description:
      "Reserve your Anywhere Sauna with a $500 deposit credited toward your purchase.",
    canonical: "https://getanywheresauna.com/deposit",
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[78px] lg:pt-24">
        <section className="bg-white">
          <div className="mx-auto max-w-[1320px] px-5 md:px-10 py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-20">
              {/* Image */}
              <div>
                <div className="aspect-square w-full bg-[#f5f5f5] overflow-hidden">
                  <img
                    src={saunaExterior}
                    alt="Anywhere Sauna exterior"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Buy box */}
              <div className="lg:pt-2">
                <h1
                  className="font-bold text-[#1c1d1d] mb-1.5 md:mb-2.5"
                  style={{ fontSize: "clamp(22px, 4vw, 28px)", lineHeight: 1.2, letterSpacing: 0 }}
                >
                  Anywhere Sauna Deposit
                </h1>
                <p className="text-[20px] font-bold tracking-[0.025em] text-[#1c1d1d] mb-1.5">
                  $500.00
                </p>
                <p className="text-[14px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d] mb-6">
                  Heater not included.
                </p>

                <div className="flex flex-col mb-3">
                  <a
                    href="https://buy.stripe.com/8x214ngCrbJA1G451x6Vq0B"
                    onClick={(e) => {
                      e.preventDefault();
                      trackAndNavigate(
                        "deposit_checkout_started",
                        { location: "deposit_page", amount: 500, currency: "USD" },
                        () => {
                          window.location.href =
                            "https://buy.stripe.com/8x214ngCrbJA1G451x6Vq0B";
                        }
                      );
                    }}
                    className="group block w-full bg-[#111111] text-white text-center font-bold text-[16px] tracking-[0.025em] px-5 py-[11px] hover:bg-black transition-colors"
                  >
                    Reserve Yours Now
                    <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
                <p className="text-[13px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d]/70 mb-8">
                  Pay $500 today, remaining $7,985 plus applicable taxes due when your sauna ships
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Deposit;
