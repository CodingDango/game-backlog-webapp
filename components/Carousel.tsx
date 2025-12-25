import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

interface Props {
  imageUrls: string[];
  isLoading: boolean;
}

export function AppCarousel({ imageUrls, isLoading }: Props) {
  return (
    <Carousel className="relative w-full h-full">
      <CarouselContent className="h-full rounded-lg!">
        {isLoading ? (
          <CarouselItem>
            <Skeleton className="w-full h-full"/>
          </CarouselItem>
        ) : (
          imageUrls.map((link, index) => (
            <CarouselItem key={index} className="rounded-lg">
              <div className="h-full relative rounded-lg">
                <Image src={link} fill alt="Image object-cover rounded-lg" />
              </div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <CarouselPrevious
        className="absolute left-2 bg-secondary/80"
        variant={"secondary"}
      />
      <CarouselNext
        className="absolute right-2 bg-secondary/80"
        variant={"secondary"}
      />
    </Carousel>
  );
}
