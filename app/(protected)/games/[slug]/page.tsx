"use client";

import { use } from "react";

import { AppCarousel } from "@/components/Carousel";
import { AppImage } from "@/components/AppImage";
import { useGameDetails } from "@/hooks/useGameDetails";
import { Frown } from "lucide-react";

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

interface PageProps {
  params: Promise<{ slug: string }>;
}

// TODO: Add playtime card,

export default function DetailsPage({ params }: PageProps) {
  const { slug } = use(params);

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
    queryKey: ['similarGames', slug], 
    queryFn: async () => {
      const result = await getRelatedGames(game as unknown as RawgGame);
      
      return result || [];
    }
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
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-16">
        <span className="text-4xl font-medium">{game.name}</span>

        <div className="grid grid-cols-[5fr_2fr] grid-rows-[auto_1fr] gap-16">
          <div className="relative w-full aspect-video max-h-[400px] rounded-md border border-accent">
            <AppCarousel
              images={screenshots}
              isLoading={isScreenShotsLoading}
            />
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="w-full h-full max-h-[200px] border border-accent rounded-md">
              <AppImage
                fill
                src={game.background_image}
                alt={`Banner for ${game.name}`}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col gap-4 ">
              <AddToLibrary
                key={userGame?.id ?? "new-" + game.id}
                isLoading={isUserGameLoading}
                userGame={userGame}
                title={game.name}
                rawgId={game.id}
              />
              <MetacriticRating game={game} />

              {/* Community rating */}
              <div className="flex-1 h-full">
                <CommunityRating />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="col-span-full flex flex-col gap-1">
              <span className="text-xl font-medium">About</span>
              <div dangerouslySetInnerHTML={{ __html: gameDescription }} />
            </div>

            <div className="col-span-full flex flex-col gap-2">
              <span className="text-xl font-medium">System Requirements</span>
              {pcRequirements ? (
                <SystemRequirements requirements={pcRequirements} />
              ) : (
                <div>None listed.</div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <GameTags tags={tags} />
            <GameMetadata game={game}/>
            <GameSocialLinks socialEntries={uniqueSocialEntries} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-16">
        <span className="text-4xl font-medium">Games like {game.name}</span>
        <GameGrid rawgGames={similarGames || []} isLoading={similarGamesLoading}/>
      </div>
    </div>
  );
}