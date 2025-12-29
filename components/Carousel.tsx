import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { AppImage } from "./AppImage";

interface Props {
  images: string[];
  isLoading: boolean;
}

//TODO: ADD SKELETONS AS REPLACEMENT WHILE IMAGES ARE LOADING
export function AppCarousel({ images, isLoading }: Props) {
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
              <div className="h-full relative ">
                <AppImage src={link} fill alt="idk image?" wrapperClassName="rounded-md"/>
              </div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      {!isLoading && images.length > 1 && (
        <>
          <CarouselPrevious
            className="absolute left-2 bg-secondary/80"
            variant={"secondary"}
          />
          <CarouselNext
            className="absolute right-2 bg-secondary/80"
            variant={"secondary"}
          />
        </>
      )}
    </Carousel>
  );
}
