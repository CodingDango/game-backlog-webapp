"use client";

import { useRawgGames } from "@/hooks/useGames";

import GameGrid from "@/components/GameGrid";
import { AppImage } from "@/components/AppImage";
import { RawgGame } from "@/types/types";
import { formatDate } from "@/utils/utils";
import Link from "next/link";

export default function Home() {
  const {
    games: rawgGames,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useRawgGames();

  const anticipatedGames: RawgGame[] = rawgGames.slice(0, 4) ?? [];
  const recentlyReleased: RawgGame[] = rawgGames.slice(4, 8) ?? [];
  const comingSoon: RawgGame[] = rawgGames.slice(8, 12) ?? [];

  return (
    <div className="space-y-20">
      <div className="space-y-8">
        <h2 className="text-4xl font-semibold">Popular</h2>
        <GameGrid rawgGames={rawgGames.slice(0, 5)} isLoading={isLoading} />
      </div>
      <div className="space-y-8">
        <h2 className="text-4xl font-semibold">Most Anticipated </h2>
        <div className="grid grid-cols-2 gap-8">
          {anticipatedGames.map((game, idx) => (
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

      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl font-semibold">Recently Released</h2>
            {recentlyReleased.map((game, idx) => (
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

          <div className="flex flex-col gap-8">
            <h2 className="text-4xl font-semibold">Coming Soon</h2>
            {comingSoon.map((game, idx) => (
              <div
                key={`recent-${idx}`}
                className="grid grid-cols-[auto_1fr] rounded-xl"
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

                <div className="p-6">
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
    </div>
    );
}
