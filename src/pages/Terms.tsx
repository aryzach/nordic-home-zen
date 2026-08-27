import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Terms = () => {
  useSEO({
    title: "Reservation Terms & Conditions | Anywhere Sauna",
    description:
      "SF Sauna Reservation Terms and Conditions for the Anywhere Sauna $500 refundable deposit.",
    canonical: "https://getanywheresauna.com/terms",
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-[78px] lg:pt-24">
        <section className="bg-white">
          <div className="mx-auto max-w-[900px] px-5 md:px-10 py-12 md:py-16">
            <p className="uppercase text-[12px] font-bold tracking-[0.18em] text-[#1c1d1d]/70 mb-3">
              Terms
            </p>
            <h1
              className="font-bold text-[#1c1d1d] mb-8"
              style={{ fontSize: "clamp(22px, 3vw, 28px)", lineHeight: 1.2, letterSpacing: 0 }}
            >
              SF Sauna Reservation Terms and Conditions
            </h1>

            <div className="space-y-6 text-[14px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d]">
              <div>
                <h2 className="font-bold mb-1.5">1. Reservation Deposit</h2>
                <p>
                  By placing a $500 refundable deposit, you are reserving your spot in the
                  production queue for the Anywhere Sauna. This deposit ensures that your order is
                  prioritized in our production schedule.
                </p>
              </div>
              <div>
                <h2 className="font-bold mb-1.5">2. Refund Policy</h2>
                <p>
                  The deposit is fully refundable up until 21 days after payment is received. If you
                  choose to cancel your reservation within this period, your deposit will be
                  refunded in full. Cancellations after the 21-day period will result in the
                  forfeiture of the deposit.
                </p>
              </div>
              <div>
                <h2 className="font-bold mb-1.5">3. Returns</h2>
                <p>
                  If you return your sauna, the product purchase price ($8,485) is refundable.
                  Shipping and delivery charges ($495) are non-refundable because they cover
                  transportation and logistics costs already incurred.
                </p>
              </div>
              <div>
                <h2 className="font-bold mb-1.5">4. Production Queue</h2>
                <p>
                  Your reservation secures your position in the production queue. The deposit does
                  not guarantee a specific delivery date, as production timelines are subject to
                  change based on demand and material availability.
                </p>
              </div>
              <div>
                <h2 className="font-bold mb-1.5">5. Order Confirmation</h2>
                <p>
                  Once your deposit is made, a representative from SF Sauna will contact you to
                  confirm your order details. The production process will commence upon the
                  finalization of these details and full payment.
                </p>
              </div>
              <div>
                <h2 className="font-bold mb-1.5">6. Non-Transferability</h2>
                <p>
                  This deposit and reservation are non-transferable and are applicable only to the
                  original purchaser.
                </p>
              </div>
              <div>
                <h2 className="font-bold mb-1.5">7. Agreement to Terms</h2>
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

export default Terms;
