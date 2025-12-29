"use client";

import { use, useMemo } from "react";
import {
  getRawgGameDetails,
  getRawgGameScreenshots,
  getUserGame,
} from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, getStoreUrl } from "@/lib/utils";

import PageSpinner from "@/components/PageSpinner";
import AddToLibrary from "@/components/AddToLibrary";
import CommaSeparatedList from "@/components/TextList";
import { AppCarousel } from "@/components/Carousel";
import { Screenshot, UserGame } from "@/lib/types";
import { toast } from "sonner";
import { AppImage } from "@/components/AppImage";
import { useGameDetails } from "@/hooks/useGameDetails";
import { Frown } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// TODO: Add playtime card,
// TODO: add minimum requirements at the bottom if it has a PC port.

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
  } = useGameDetails(slug);

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
    <div className="flex flex-col gap-12">
      <span className="text-4xl font-medium">{game.name}</span>

      <div className="grid grid-cols-[3fr_1fr] gap-12">
        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
            <div className="w-full h-full min-h-[300px] max-h-[400px] border border-accent rounded-md">
              <AppImage
                fill
                src={game.background_image}
                alt={`Banner for ${game.name}`}
              />
            </div>

            <div className="relative w-full aspect-video min-h-[300px] max-h-[400px] rounded-md border border-accent">
              <AppCarousel
                images={screenshots}
                isLoading={isScreenShotsLoading}
              />
            </div>
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
                  itemClass="underline"
                />
              </ul>
            </div>

            <div className="col-span-full">
              <span className="text-muted-foreground">Description</span>
              <div dangerouslySetInnerHTML={{ __html: gameDescription }} />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <AddToLibrary
              key={userGame?.id ?? "new-" + game.id}
              isLoading={isUserGameLoading}
              userGame={userGame}
              title={game.name}
              rawgId={game.id}
            />

            <Card className="h-12 p-0">
              <div className="flex justify-between items-center h-full">
                <span className="pl-4">Metacritic Rating</span>

                <Badge className="h-full text-base rounded-r-md rounded-l-none bg-muted text-primary px-4">
                  {game.metacritic ? `${game.metacritic}%` : "N/A"}
                </Badge>
              </div>
            </Card>
          </div>

          <div className="bg-accent h-px w-full"></div>
                
          {/* TODO: Turn game links to a component */}
          {/* TODO: Add icons to specific stores */}
          {/* TODO: Add reddit url and metacritic url */}
          <div>
            <Card className="py-2 px-4 gap-4">
              <div className="text-muted-foreground">Links</div>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 flex! flex-wrap">
                {game.stores.map(({ store }, idx) => (
                  <a
                    target="_blank"
                    href={getStoreUrl(store, game.name)}
                    key={idx}
                  >
                    {store.name}
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
