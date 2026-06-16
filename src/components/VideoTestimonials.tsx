import { trackEvent } from "@/lib/analytics";

const videos = [
  { url: "https://pub-2979dec23e16480f9840f48df8535df6.r2.dev/0615.mp4", label: "Customer testimonial 1" },
  { url: "https://pub-2979dec23e16480f9840f48df8535df6.r2.dev/output.mp4", label: "Customer testimonial 2" },
];

const VideoTestimonials = () => {
  const handlePlay = (i: number) => {
    trackEvent("testimonial_video_play", {
      video_url: videos[i].url,
      video_label: videos[i].label,
      video_index: i,
    });
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-heading text-center text-foreground mb-8">
          Hear From Our Customers
        </h2>
        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
          {videos.map((v, i) => (
            <div
              key={v.url}
              className="relative aspect-[9/16] overflow-hidden rounded-lg bg-charcoal shadow-md"
            >
              <video
                src={v.url}
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
                aria-label={v.label}
                onPlay={() => handlePlay(i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
