import { formatDate } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppImage } from "./AppImage";
import { getAnticipatedGames } from "@/services/rawgServices";

import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

export default function AnticipatedGames() {
  const { data: anticipatedGames, isLoading: isLoadingAnticipated } = useQuery({
    queryKey: ["anticipatedGames"],
    queryFn: async () => {
      const res = await getAnticipatedGames(4);

      if (res.success) return res.results;
      else toast.error(res.error);
    },
  });

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-semibold">Most Anticipated </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {anticipatedGames ?
          anticipatedGames.map((game, idx) => (
            <div
              key={`anticipated-${idx}`}
              className="relative rounded-xl h-48"
            >
              <Link
                className="absolute inset-0"
                href={`/games/${game.slug}`}
              ></Link>

              <div className="absolute inset-0">
                <AppImage
                  src={game.background_image}
                  alt="image of game"
                  fill
                />
                <div className="bg-linear-to-l from-black/10 to-black/70 absolute inset-0"></div>
              </div>

              <div className="p-6 z-1 relative">
                <h2 className="text-2xl font-semibold">{game.name}</h2>
                <div>Releases on {formatDate(game.released)}</div>
              </div>
            </div>
          )) : (
            <>
              <Skeleton className="rounded-xl h-48"/>
              <Skeleton className="rounded-xl h-48"/>
              <Skeleton className="rounded-xl h-48"/>
              <Skeleton className="rounded-xl h-48"/>
            </>
          )}
      </div>
    </div>
  );
}
