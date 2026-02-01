import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Skeleton } from "./ui/skeleton";
import { AppImage } from "./AppImage";
import NotFoundCard from "./NotFoundCard";

interface Props {
  images: string[];
  isLoading: boolean;
}

export function AppImageCarousel({ images, isLoading }: Props) {
  if (images.length == 0 && !isLoading) return <NotFoundCard />;

  return (
    <Carousel className="relative w-full h-full">
      <CarouselContent className="h-full">
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
      {!isLoading && images.length > 1 && (
        <>
          <CarouselPrevious className="absolute -left-4" />
          <CarouselNext className="absolute -right-4" />
        </>
      )}
    </Carousel>
  );
}
