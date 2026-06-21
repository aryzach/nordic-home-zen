import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { useSEO } from "@/hooks/useSEO";

const FAQPage = () => {
  useSEO({
    title: "FAQ | Anywhere Sauna",
    description:
      "Answers to the most common questions about the Anywhere Sauna: electrical requirements, heat-up time, installation, indoor/outdoor use, and more.",
    canonical: "/faq",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28">
        <div className="container-x max-w-3xl text-center section-y">
          <h1>Frequently Asked Questions</h1>
          <p className="text-muted-foreground mt-3">
            Everything you need to know before getting your own sauna.
          </p>
        </div>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
