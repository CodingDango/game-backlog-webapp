import { formatDate } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { AppImage } from "./AppImage";
import { getRecentGames } from "@/services/rawgServices";
import { toast } from "sonner";

import Link from "next/link";

export default function RecentGames() {
  const { data: recentlyReleased, isLoading: isLoadingRecent } = useQuery({
    queryKey: ["recentlyReleased"],
    queryFn: async () => {
      const res = await getRecentGames(8);

      if (res.success) return res.results;
      else toast.error(res.error);
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl font-semibold">Recently Released</h2>
      <div className="grid grid-cols-2 gap-12">
        {recentlyReleased &&
          recentlyReleased.map((game, idx) => (
            <div
              key={`recent-${idx}`}
              className="grid grid-cols-[auto_1fr] rounded-xl gap-6"
            >
              <div className="relative h-48 w-40">
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
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">{game.name}</h2>
                <div className="text-muted-foreground ">
                  {formatDate(game.released)}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
