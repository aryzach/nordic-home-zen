import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export type LightboxImage = { src: string; alt: string };

interface ImageLightboxProps {
  images: LightboxImage[];
  open: boolean;
  startIndex?: number;
  onOpenChange: (open: boolean) => void;
}

const ImageLightbox = ({ images, open, startIndex = 0, onOpenChange }: ImageLightboxProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (open && api) {
      api.scrollTo(startIndex, true);
    }
  }, [open, api, startIndex]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] p-2 sm:p-4 bg-background border-border rounded-none sm:rounded-none">
        <Carousel setApi={setApi} opts={{ startIndex, loop: true }} className="w-full">
          <CarouselContent>
            {images.map((img, i) => (
              <CarouselItem key={i} className="flex items-center justify-center">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="max-h-[80vh] w-auto mx-auto object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-2 sm:-left-12" />
              <CarouselNext className="right-2 sm:-right-12" />
            </>
          )}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;
