import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const videos = [
  { url: "https://pub-2979dec23e16480f9840f48df8535df6.r2.dev/0615.mp4", label: "Customer testimonial 1" },
  { url: "https://pub-2979dec23e16480f9840f48df8535df6.r2.dev/output.mp4", label: "Customer testimonial 2" },
];

const VideoTestimonials = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
    trackEvent("testimonial_video_play", {
      video_url: videos[i].url,
      video_label: videos[i].label,
      video_index: i,
    });
  };

  const next = () => setIndex((i) => (i + 1) % videos.length);
  const prev = () => setIndex((i) => (i - 1 + videos.length) % videos.length);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [open, index]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-heading text-center text-foreground mb-8">
          Hear From Our Customers
        </h2>
        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
          {videos.map((v, i) => (
            <button
              key={v.url}
              onClick={() => openAt(i)}
              className="group relative aspect-[9/16] overflow-hidden rounded-lg bg-charcoal shadow-md hover:shadow-xl transition-shadow"
              aria-label={`Play ${v.label}`}
            >
              <video
                src={v.url}
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-charcoal ml-1" fill="currentColor" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-0 bg-black border-none overflow-hidden">
          <div className="relative">
            <video
              ref={videoRef}
              src={videos[index].url}
              className="w-full max-h-[85vh] object-contain bg-black"
              controls
              autoPlay
              playsInline
            />
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center"
              aria-label="Next video"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VideoTestimonials;
