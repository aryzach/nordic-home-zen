import Header from "@/components/Header";
import Footer from "@/components/Footer";
const saunaExterior = "/installs/specs-1.jpg";
import { useSEO } from "@/hooks/useSEO";

const Deposit = () => {
  useSEO({
    title: "Reserve Your Anywhere Sauna | $500 Refundable Deposit",
    description:
      "Reserve your Anywhere Sauna with a fully refundable $500 deposit. Secure your spot in the production queue today.",
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
                  Fully refundable for 3 weeks.
                </p>

                <div className="flex flex-col mb-3">
                  <a
                    href="https://buy.stripe.com/8x214ngCrbJA1G451x6Vq0B"
                    className="group block w-full bg-[#111111] text-white text-center font-bold text-[16px] tracking-[0.025em] px-5 py-[11px] hover:bg-black transition-colors"
                  >
                    Reserve Yours Now
                    <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
                <p className="text-[13px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d]/70 mb-8">
                  Pay $500 today, remaining $4,099 due before shipment
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms */}
        <section className="bg-white border-t border-[#e8e8e1]">
          <div className="mx-auto max-w-[900px] px-5 md:px-10 py-12 md:py-16">
            <p className="uppercase text-[12px] font-bold tracking-[0.18em] text-[#1c1d1d]/70 mb-3">
              Terms
            </p>
            <h2
              className="font-bold text-[#1c1d1d] mb-8"
              style={{ fontSize: "clamp(22px, 3vw, 28px)", lineHeight: 1.2, letterSpacing: 0 }}
            >
              SF Sauna Reservation Terms and Conditions
            </h2>

            <div className="space-y-6 text-[14px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d]">
              <div>
                <h3 className="font-bold mb-1.5">1. Reservation Deposit</h3>
                <p>
                  By placing a $500 refundable deposit, you are reserving your spot in the
                  production queue for the Anywhere Sauna. This deposit ensures that your order is
                  prioritized in our production schedule.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-1.5">2. Refund Policy</h3>
                <p>
                  The deposit is fully refundable up until 21 days after payment is received. If you
                  choose to cancel your reservation within this period, your deposit will be
                  refunded in full. Cancellations after the 21-day period will result in the
                  forfeiture of the deposit.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-1.5">3. Production Queue</h3>
                <p>
                  Your reservation secures your position in the production queue. The deposit does
                  not guarantee a specific delivery date, as production timelines are subject to
                  change based on demand and material availability.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-1.5">4. Order Confirmation</h3>
                <p>
                  Once your deposit is made, a representative from SF Sauna will contact you to
                  confirm your order details. The production process will commence upon the
                  finalization of these details and full payment.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-1.5">5. Non-Transferability</h3>
                <p>
                  This deposit and reservation are non-transferable and are applicable only to the
                  original purchaser.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-1.5">6. Agreement to Terms</h3>
                <p>
                  By submitting your deposit, you agree to these terms and conditions. SF Sauna
                  reserves the right to modify these terms at any time, with notice provided to
                  affected customers.
                </p>
              </div>
              <p>
                For further inquiries or to request a refund, please contact SF Sauna at{" "}
                <a
                  href="mailto:info@sf-sauna.com"
                  className="underline hover:no-underline font-medium"
                >
                  info@sf-sauna.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Deposit;
