"use client";

import { useGameDetails } from "@/hooks/useGameDetails";
import { useQuery } from "@tanstack/react-query";
import { RawgGame } from "@/types/types";
import { getRelatedGames } from "@/services/rawgServices";
import { useAuth } from "@/components/auth/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import { GameDetailsMainSection } from "@/components/game/GameDetailsMainSection";

import PageSpinner from "@/components/layout/PageSpinner";
import GameGrid from "@/components/game/GameGrid";
import GameDetailsSidebar from "@/components/game/GameDetailsSidebar";

export default function DetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { session } = useAuth();
  const router = useRouter();

  const {
    isLoading,
    game,
    gameDescription,
    isError,
    error,
    screenshotUrls,
    isScreenShotsLoading,
    isUserGameLoading,
    userGame,
    socialEntryLinks,
    pcRequirements,
  } = useGameDetails(slug);

  const { data: similarGames, isLoading: similarGamesLoading } = useQuery({
    enabled: !!game?.genres,
    queryKey: ["similarGames", slug],
    queryFn: async () => {
      const result = await getRelatedGames(game as unknown as RawgGame);

      return result || [];
    },
  });

  if (isLoading) return <PageSpinner />;

  if (!game) return <div>No game found</div>;

  if (isError)
    return (
      <div>
        Showing details for game returned with error{" "}
        {error ? error.message : "no error"}
      </div>
    );

  return (
    <div className="flex flex-col gap-40 ">
      <div className="flex flex-col gap-12">
        <span className="text-4xl font-semibold">{game.name}</span>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 xl:gap-12 w-full">
          <div className="md:order-2 md:col-span-5 lg:col-span-4">
            <GameDetailsSidebar
              gameDetails={game}
              userGame={userGame}
              session={session}
              isUserGameLoading={isUserGameLoading}
              router={router}
              socialEntryLinks={socialEntryLinks}
            />
          </div>

          {/* LEFT COLUMN (Carousel & About) - Takes 7/12 or 8/12 of the space */}
          <div className="md:order-1 md:col-span-7 lg:col-span-8">
            <GameDetailsMainSection
              screenshotUrls={screenshotUrls}
              isLoading={isScreenShotsLoading}
              gameDescription={gameDescription}
              pcRequirements={pcRequirements}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <span className="text-4xl font-semibold">Games like {game.name}</span>
        <GameGrid
          rawgGames={similarGames || []}
          isLoading={similarGamesLoading}
          length={10}
        />
      </div>
    </div>
  );
}
