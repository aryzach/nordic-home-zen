import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Terms = () => {
  useSEO({
    title: "Reservation Terms & Conditions | Anywhere Sauna",
    description:
      "Reservation, payment, return, and performance guarantee terms for the Anywhere Sauna.",
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
              Reservations, Payment & Returns
            </h1>

            <div className="space-y-6 text-[14px] leading-[1.6] tracking-[0.025em] text-[#1c1d1d]">
              <div>
                <h2 className="font-bold mb-1.5">1. Reservation & Payment</h2>
                <p>
                  A $500 deposit reserves your place in the production queue and is credited toward
                  your purchase. We will contact you to confirm your order details.
                </p>
                <p className="mt-3">
                  The $8,485 purchase price includes $500 for delivery and $1,000 for installation.
                  The remaining balance, including applicable taxes, is due when your sauna ships.
                </p>
                <p className="mt-3">
                  Production and delivery dates are estimates. We will notify you of changes and
                  provide any cancellation or refund options required by law.
                </p>
              </div>
              <div>
                <h2 className="font-bold mb-1.5">2. Cancellation Before Delivery</h2>
                <p>
                  If you cancel before delivery, your $500 reservation deposit is non-refundable,
                  except where a refund is required by law. Any other payments will be refunded.
                </p>
              </div>
              <div>
                <h2 className="font-bold mb-1.5">3. 30-Day Change-of-Mind Returns</h2>
                <p>
                  You may request a return for any reason within 30 days after installation is
                  completed. Normal sauna use during this period is permitted.
                </p>
                <p className="mt-3">
                  Your refund will equal the amount paid, less the included $500 delivery charge,
                  $1,000 installation charge, and a $500 pickup fee. For an $8,485 purchase, this
                  results in a $6,485 refund before any damage deductions and applicable tax adjustments.
                </p>
                <p className="mt-3">
                  The sauna must be complete and free of customer-caused damage beyond ordinary wear.
                  Any damage deduction will be itemized and supported by documentation.
                </p>
              </div>
              <div>
                <h2 className="font-bold mb-1.5">4. Defects & Performance Guarantee</h2>
                <p>
                  Your sauna is guaranteed to reach at least 180°F within 90 minutes of heating when
                  the outdoor ambient temperature is 50°F or above. Temperature is measured six
                  inches below the interior ceiling.
                </p>
                <p className="mt-3">
                  If you report a defect or failure to meet this guarantee within 30 days after
                  installation, SF Sauna will have up to two repair attempts, to be completed within
                  30 days after your report. You must provide reasonable access for inspection and repairs.
                </p>
                <p className="mt-3">
                  If the issue remains unresolved after two repair attempts, or we do not resolve it
                  within that 30-day period despite reasonable access, you may return the sauna for a
                  full refund of all payments, including your deposit, delivery, installation, and
                  applicable taxes. Disassembly and pickup are free.
                </p>
                <p className="mt-3">
                  A claim reported within the initial 30-day window remains eligible even if repairs
                  extend beyond that window. Customer-caused damage, misuse, and unauthorized
                  modifications are excluded to the extent they caused the issue. This policy does
                  not limit rights provided by applicable law.
                </p>
              </div>
              <div>
                <h2 className="font-bold mb-1.5">5. Requesting a Return & Receiving Your Refund</h2>
                <p>
                  Email <a href="mailto:info@sf-sauna.com" className="underline hover:no-underline font-medium">info@sf-sauna.com</a> within the applicable period to request a return or report a problem.
                  Eligibility is based on the date of your request, not the pickup date.
                </p>
                <p className="mt-3">
                  SF Sauna will coordinate disassembly and pickup. Refunds will be issued to the
                  original payment method within 10 business days after pickup and inspection. Your
                  bank may require additional processing time.
                </p>
              </div>
              <div>
                <h2 className="font-bold mb-1.5">6. Acceptance</h2>
                <p>
                  By paying your reservation deposit, you agree to these terms.
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

export default Terms;
