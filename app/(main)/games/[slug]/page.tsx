"use client";

import { use } from "react";

import { AppImageCarousel } from "@/components/common/AppImageCarousel";
import { AppImage } from "@/components/common/AppImage";
import { useGameDetails } from "@/hooks/useGameDetails";
import { Frown, Plus } from "lucide-react";

import PageSpinner from "@/components/layout/PageSpinner";
import GameLibraryAction from "@/components/library/GameLibraryAction";
import GameSystemRequirements from "@/components/game/GameSystemRequirements";
import GameSocialLinks from "@/components/game/GameSocialLinks";
import GameMetacriticRating from "@/components/game/GameMetacriticRating";
import GameCommunityRating from "@/components/game/GameCommunityRating";
import GameTags from "@/components/game/GameTags";
import GameDetails from "@/components/game/GameDetails";
import GameGrid from "@/components/game/GameGrid";

import { useQuery } from "@tanstack/react-query";
import { RawgGame } from "@/types/types";
import { getRelatedGames } from "@/services/rawgServices";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

export default function DetailsPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const { session } = useAuth();
  
  const {
    isLoading,
    game,
    gameDescription,
    isError,
    error,
    screenshots,
    isScreenShotsLoading,
    isUserGameLoading,
    userGame,
    uniqueSocialEntries,
    pcRequirements,
    tags,
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

  if (!game)
    return (
      <div>
        No data to show for game <Frown />{" "}
      </div>
    );

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
          <div className="md:order-2 md:col-span-5 lg:col-span-4 min-w-0 flex flex-col gap-8 ">
            {/* Sidebar Banner Image */}
            <div className="relative w-full h-48 lg:h-36 rounded-md overflow-hidden">
              <AppImage
                fill
                src={game.background_image}
                alt={game.name}
                className="object-cover"
              />
            </div>

            {/* Sidebar Content */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {session ? (
                  <GameLibraryAction
                    key={userGame?.id ?? "new-" + game.id}
                    isSessionLoading={isUserGameLoading}
                    userGame={userGame ?? null}
                    title={game.name}
                    rawgId={game.id}
                  />
                ) : (
                  <Button
                    onClick={() => router.push("/login")}
                    className="w-full"
                  >
                    <Plus className="mr-2" /> Add to library
                  </Button>
                )}
                <GameMetacriticRating game={game} />
                <GameCommunityRating />
              </div>

              <div className="h-px w-full bg-border"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
                <div className="sm:col-span-2 md:col-span-auto">
                  <GameDetails game={game} />
                </div>
                <div className="h-full col-span-1 md:col-span-2">
                  <GameTags tags={tags} />
                </div>
                <div className="h-full col-span-1 md:col-span-2">
                  <GameSocialLinks socialEntries={uniqueSocialEntries} />
                </div>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN (Carousel & About) - Takes 7/12 or 8/12 of the space */}
          <div className="md:order-1 md:col-span-7 lg:col-span-8 min-w-0 flex flex-col gap-8">
            {/* Carousel Container */}
            <div className="relative max-h-[500px]">
              <AppImageCarousel
                images={screenshots}
                isLoading={isScreenShotsLoading}
              />
            </div>

            {/* About Section */}
            <div className="flex flex-col gap-2">
              <span className="text-xl font-semibold">About</span>
              <div
                className="prose max-w-none overflow-hidden text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: gameDescription }}
              />
            </div>

            {/* System Requirements */}
            <div className="flex flex-col gap-2">
              <span className="text-xl font-semibold">System Requirements</span>
              {pcRequirements ? (
                <GameSystemRequirements requirements={pcRequirements} />
              ) : (
                <div className="text-muted-foreground">None listed.</div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN (Sidebar) - Takes 5/12 or 4/12 of the space */}
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
