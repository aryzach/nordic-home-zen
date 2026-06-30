import sfStandardLogo from "@/assets/sf-standard-logo.png";
import vitalityDigestLogo from "@/assets/vitality-digest-logo.png";

const AsSeenIn = () => {
  return (
    <section className="pt-6 md:pt-8 pb-12 md:pb-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">As seen in</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <a
              href="https://sfstandard.com/2025/06/21/welcome-to-san-franciscos-summer-of-saunas/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img
                src={sfStandardLogo}
                alt="The San Francisco Standard"
                className="h-12 md:h-16"
              />
            </a>
            <a
              href="https://www.sherisesstudios.com/product-page/vitality-digest-magazine-january-2026-edition"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img
                src={vitalityDigestLogo}
                alt="Vitality Digest"
                className="h-10 md:h-14"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AsSeenIn;
