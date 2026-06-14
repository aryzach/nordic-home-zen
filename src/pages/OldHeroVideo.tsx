import Header from "@/components/Header";
import Footer from "@/components/Footer";

const OldHeroVideo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Old Hero Video
          </h1>
          <video
            src="/hero-video.mp4"
            poster="/hero-fallback.avif"
            controls
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-lg"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OldHeroVideo;
