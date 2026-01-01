"use client";

import { use } from "react";
import { formatDate } from "@/lib/utils";

import { AppCarousel } from "@/components/Carousel";
import { AppImage } from "@/components/AppImage";
import { useGameDetails } from "@/hooks/useGameDetails";
import { Frown } from "lucide-react";

import PageSpinner from "@/components/PageSpinner";
import AddToLibrary from "@/components/AddToLibrary";
import CommaSeparatedList from "@/components/TextList";
import SystemRequirements from "@/components/SystemRequirements";
import GameSocialLinks from "@/components/GameSocialLinks";
import MetacriticRating from "@/components/MetacriticRating";
import { RawgGame } from "@/lib/types";

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
  } = useGameDetails(slug);

  console.log(game);

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
      <div className="flex flex-col gap-12">
        <span className="text-4xl font-medium">{game.name}</span>

        <div className="grid grid-cols-[5fr_2fr] gap-8">
          <div className="flex flex-col gap-12">
            <div className="relative w-full aspect-video max-h-[400px] rounded-md border border-accent">
              <AppCarousel
                images={screenshots}
                isLoading={isScreenShotsLoading}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <span className="text-muted-foreground">Developers</span>
                <CommaSeparatedList
                  items={game.developers.map((dev) => dev.name)}
                />
              </div>

              <div>
                <span className="text-muted-foreground">Release Date</span>
                <div className="flex flex-wrap gap-1">
                  {formatDate(game.released)}
                </div>
              </div>

              <div>
                <span className="text-muted-foreground">Genres</span>
                <ul className="flex flex-wrap gap-1">
                  <CommaSeparatedList
                    items={game.genres.map((genre) => genre.name)}
                    itemClass="underline"
                  />
                </ul>
              </div>

              <div className="col-span-full">
                <span className="text-muted-foreground">Platforms</span>
                <ul className="flex flex-wrap gap-1">
                  <CommaSeparatedList
                    items={game.platforms.map(
                      (platform) => platform.platform.name
                    )}
                  />
                </ul>
              </div>

              <div className="col-span-full">
                <span className="text-muted-foreground">Description</span>
                <div dangerouslySetInnerHTML={{ __html: gameDescription }} />
              </div>

              <div className="col-span-full">
                <span className="text-muted-foreground">
                  System Requirements
                </span>
                {pcRequirements ? (
                  <SystemRequirements requirements={pcRequirements} />
                ) : (
                  <div>None listed.</div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="w-full h-full max-h-[150px] border border-accent rounded-md">
              <AppImage
                fill
                src={game.background_image}
                alt={`Banner for ${game.name}`}
              />
            </div>

            <div className="space-y-4">
              <AddToLibrary
                key={userGame?.id ?? "new-" + game.id}
                isLoading={isUserGameLoading}
                userGame={userGame}
                title={game.name}
                rawgId={game.id}
              />

              <MetacriticRating game={game} />
            </div>

            <div className="bg-accent h-px w-full"></div>

            <GameSocialLinks socialEntries={uniqueSocialEntries} />
          </div>
        </div>
      </div>
      <div>
        <span className="text-3xl">Games like {game.name}</span>
      </div>
    </div>
  );
}
