import { useQuery } from "@tanstack/react-query";
import { getPopularGames } from "@/services/rawgServices";
import { toast } from "sonner";

import GameGrid from "@/components/GameGrid";

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
      <GameGrid
        rawgGames={popularGames ?? []}
        isLoading={isLoadingPopular}
        length={5}
      />
    </div>
  );
}
