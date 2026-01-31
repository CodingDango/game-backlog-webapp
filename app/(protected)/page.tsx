"use client";

import { useRawgGames } from "@/hooks/useGames";
import { AppImage } from "@/components/AppImage";
import { RawgGame } from "@/types/types";
import { formatDate } from "@/utils/utils";
import {
  getAnticipatedGames,
  getPopularGames,
  getRecentGames,
} from "@/services/rawgServices";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import Link from "next/link";
import GameGrid from "@/components/GameGrid";

// TODO: Add carousel to anticipated games

export default function Home() {
  const { data: popularGames, isLoading: isLoadingPopular } = useQuery({
    queryKey: ["popularGames"],
    queryFn: async () => {
      const res = await getPopularGames();

      debugger;

      if (res.success) {
        return res.results.slice(0, 5) || [];
      } else {
        toast.error(res.error);
        return [];
      }
    },
  });

  const { data: anticipatedGames, isLoading: isLoadingAnticipated } = useQuery({
    queryKey: ["anticipatedGames"],
    queryFn: async () => {
      const res = await getAnticipatedGames();

      debugger;

      if (res.success) {
        return res.results.slice(0, 4) || [];
      } else {
        toast.error(res.error);
        return [];
      }
    },
  });

  const { data: recentlyReleased, isLoading: isLoadingRecent } = useQuery({
    queryKey: ["recentlyReleased"],
    queryFn: async () => {
      const res = await getRecentGames();

      debugger;

      if (res.success) {
        return res.results.slice(0, 8) || [];
      } else {
        toast.error(res.error);
        return [];
      }
    },
  });

  return (
    <div className="space-y-20">
      <div className="space-y-8">
        <h2 className="text-4xl font-semibold">Popular</h2>
        <GameGrid
          rawgGames={popularGames ?? []}
          isLoading={isLoadingPopular}
          length={5}
        />
      </div>
      <div className="space-y-8">
        <h2 className="text-4xl font-semibold">Most Anticipated </h2>
        <div className="grid grid-cols-2 gap-8">
          {anticipatedGames &&
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
            ))}
        </div>
      </div>

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
    </div>
  );
}
