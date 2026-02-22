"use client";

import { use } from "react";

import { AppImageCarousel } from "@/components/Carousel";
import { AppImage } from "@/components/AppImage";
import { useGameDetails } from "@/hooks/useGameDetails";
import { Frown, Plus } from "lucide-react";

import PageSpinner from "@/components/PageSpinner";
import AddToLibrary from "@/components/AddToLibrary";
import SystemRequirements from "@/components/SystemRequirements";
import GameSocialLinks from "@/components/GameSocialLinks";
import MetacriticRating from "@/components/MetacriticRating";
import CommunityRating from "@/components/CommunityRating";
import GameTags from "@/components/GameTags";
import GameMetadata from "@/components/GameMetadata";
import GameGrid from "@/components/GameGrid";

import { useQuery } from "@tanstack/react-query";
import { RawgGame } from "@/types/types";
import { getRelatedGames } from "@/services/rawgServices";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

// TODO: Add playtime card,

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
    <div className="flex flex-col gap-40  ">
      <div className="flex flex-col gap-12">
        <span className="text-4xl font-semibold">{game.name}</span>

        <div className="grid grid-cols-[5fr_2fr] grid-rows-[auto_1fr] gap-16">
          <div className="relative w-full aspect-video max-h-[400px] rounded-md ">
            <AppImageCarousel
              images={screenshots}
              isLoading={isScreenShotsLoading}
            />
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="w-full h-full max-h-[200px]  rounded-md">
              <AppImage
                fill
                src={game.background_image}
                alt={`Banner for ${game.name}`}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col gap-4">
              {session ? (
                <AddToLibrary
                  key={userGame?.id ?? "new-" + game.id}
                  isLoading={isUserGameLoading}
                  userGame={userGame ?? null}
                  title={game.name}
                  rawgId={game.id}
                />
              ) : (
                <Button onClick={() => router.push("/login")}>
                  <Plus /> Add to library
                </Button>
              )}

              <MetacriticRating game={game} />

              {/* Community rating */}
              <div className="flex-1 h-full">
                <CommunityRating />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="col-span-full flex flex-col gap-1">
              <span className="text-xl font-semibold">About</span>
              <div dangerouslySetInnerHTML={{ __html: gameDescription }} />
            </div>

            <div className="col-span-full flex flex-col gap-2">
              <span className="text-xl font-semibold">System Requirements</span>
              {pcRequirements ? (
                <SystemRequirements requirements={pcRequirements} />
              ) : (
                <div>None listed.</div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <GameTags tags={tags} />
            <GameMetadata game={game} />
            <GameSocialLinks socialEntries={uniqueSocialEntries} />
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
