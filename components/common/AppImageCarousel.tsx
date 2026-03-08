import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Skeleton } from "../ui/skeleton";
import { AppImage } from "./AppImage";
import { useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import NotFoundCard from "./NotFoundCard";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  isLoading: boolean;
}

export function AppImageCarousel({ images, isLoading }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (images.length === 0 && !isLoading) return <NotFoundCard />;

  return (
    <Carousel
      setApi={setApi}
      className="w-full flex flex-col gap-4" // flex-col puts children (Content & Div) in a stack
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
        Fade(),
      ]}
    >
      <Content images={images} isLoading={isLoading} />

      <div className="w-full flex justify-between items-center">
        <div className="flex items-center justify-start gap-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>

        <div className="ml-auto flex gap-2">
          {Array.from({ length: images.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "cursor-pointer h-4 w-4 rounded-full transition-all duration-300 border-4 bg-background",
                current === i ? "border-primary" : "border-secondary ",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <div></div>
      </div>
    </Carousel>
  );
}

function Content({ images, isLoading }: Props) {
  return (
    <CarouselContent className="aspect-video lg:aspect-auto lg:h-[375px]">
      {isLoading ? (
        <CarouselItem>
          <Skeleton className="w-full h-full" />
        </CarouselItem>
      ) : (
        images.map((link, index) => (
          <CarouselItem key={index}>
            <div className="h-full relative border rounded-md border-accent">
              <AppImage
                className="object-cover"
                src={link}
                fill
                alt="idk image?"
                wrapperClassName="rounded-md"
              />
            </div>
          </CarouselItem>
        ))
      )}
    </CarouselContent>
  );
}
