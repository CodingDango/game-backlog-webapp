"use client";

import { use } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

import { AppCarousel } from "@/components/Carousel";
import { AppImage } from "@/components/AppImage";
import { useGameDetails } from "@/hooks/useGameDetails";
import { Frown } from "lucide-react";

import SocialIcon from "@/components/SocialIcon";
import PageSpinner from "@/components/PageSpinner";
import AddToLibrary from "@/components/AddToLibrary";
import CommaSeparatedList from "@/components/TextList";
import SystemRequirements from "@/components/SystemRequirements";

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
                />
              </ul>
            </div>

            <div className="col-span-full">
              <span className="text-muted-foreground">Description</span>
              <div dangerouslySetInnerHTML={{ __html: gameDescription }} />
            </div>

            <div className="col-span-full">
              <span className="text-muted-foreground">System Requirements</span>
              {pcRequirements ? (
                <SystemRequirements requirements={pcRequirements}/>
              ) : (
                <div>None listed.</div>
              )}
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

          {/* TODO: Use the api to get the store links instead */}
          <div>
            <Card className="py-4 px-4 gap-4">
              <div className="text-muted-foreground">Links</div>
              <div className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 grid">
                {uniqueSocialEntries.map((store, idx) => (
                  <div key={idx}>
                    <a target="_blank" href={store.url}>
                      <div
                        className="w-8 h-8 grid place-items-center rounded-md"
                        style={{ background: store.brandColor }}
                      >
                        <SocialIcon slug={store.slug} className="w-5 h-5" />
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}