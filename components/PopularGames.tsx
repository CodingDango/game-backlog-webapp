import { useQuery } from "@tanstack/react-query";
import { getPopularGames } from "@/services/rawgServices";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import GameGrid from "@/components/GameGrid";
import GameCard from "./GameCard";

export default function PopularGames() {
  const { data: popularGames, isLoading: isLoadingPopular } = useQuery({
    queryKey: ["popularGames"],
    queryFn: async () => {
      const res = await getPopularGames(10);

      if (res.success) return res.results;
      else toast.error(res.error);
    },
  });

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-semibold">Popular</h2>

      {popularGames && popularGames.length > 0 ? (
        <Carousel className="relative">
          <CarouselContent className="-ml-6">
            {popularGames.map((game, idx) => (
              <CarouselItem key={idx} className="sm:basis-1/2 md:basis-1/4 lg:basis-1/5 pl-6">
                <GameCard rawgGame={game} isLoading={isLoadingPopular}/>
              </CarouselItem>
            ))}
          </CarouselContent>


          <CarouselPrevious className="absolute -left-5 top-[42%]" size={'icon-lg'}/>
          <CarouselNext className="absolute -right-5 top-[42%]" size={'icon-lg'}/>
        </Carousel>
      ) : (
        <GameGrid rawgGames={[]} isLoading={isLoadingPopular} length={5}/>
      )}
    </div>
  );
}
