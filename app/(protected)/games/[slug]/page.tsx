"use client";

import { use, useMemo } from "react";
import { getRawgGameDetails, getRawgGameScreenshots } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

import PageSpinner from "@/components/PageSpinner";
import Image from "next/image";
import AddToLibrary from "@/components/AddToLibrary";
import CommaSeparatedList from "@/components/TextList";
import { AppCarousel } from "@/components/Carousel";
import { Screenshot } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// TODO: Add playtime card,
// TODO: add carousel for screeshots,
// TODO: add minimum requirements at the bottom if it has a PC port.

export default function DetailsPage({ params }: PageProps) {
  const { slug } = use(params);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["rawgGames", slug],
    queryFn: () => getRawgGameDetails(slug),
  });

  const { data: screenshotsRes, isLoading: isLoadingScreenshots } = useQuery({
    queryKey: ['rawgGames', slug, 'screenshots'],
    queryFn: () => getRawgGameScreenshots(slug)
  });

  const descriptionHtml = useMemo(() => {
    if (!data || "error" in data || !data.description) return "";

    const parts = data.description.split("</p>");
    const englishPart = parts[0];
    const formatted = englishPart.split("<br />")[0];

    return formatted + "</p>";
  }, [data]);

  const screenshotLinks: string[] = useMemo(() => {
    if (!screenshotsRes || "error" in screenshotsRes) return [];

    return screenshotsRes.results.map(screenshot => screenshot.image);
  });

  if (isLoading) return <PageSpinner />;

  if (!data) return <div>No data</div>;

  if (isError || "error" in data) return <div>{}</div>;

  return (
    <div className="flex flex-col gap-12">
      <span className="text-4xl font-medium">{data.name}</span>

      <div className="grid grid-cols-[3fr_1fr] gap-12">
        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
            <div className="relative w-full h-full min-h-[300px] max-h-[400px]">
              <Image
                fill
                alt={`Banner for ${data.name}`}
                src={data.background_image}
                className="object-cover rounded-lg"
              />
            </div>

            <div className="relative w-full aspect-video min-h-[300px] max-h-[400px]">
              {/* <Image
                fill
                alt={`Image of ${data.name}`}
                src={data.background_image_additional}
                className="object-cover rounded-lg"
              /> */}
              <AppCarousel imageUrls={screenshotLinks} isLoading={isLoadingScreenshots}/>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <span className="text-muted-foreground">Developers</span>
              <CommaSeparatedList
                items={data.developers.map((dev) => dev.name)}
              />
            </div>

            <div>
              <span className="text-muted-foreground">Release Date</span>
              <div className="flex flex-wrap gap-1">
                {formatDate(data.released)}
              </div>
            </div>

            <div>
              <span className="text-muted-foreground">Genres</span>
              <ul className="flex flex-wrap gap-1">
                <CommaSeparatedList
                  items={data.genres.map((genre) => genre.name)}
                  itemClass="underline"
                />
              </ul>
            </div>

            <div className="col-span-full">
              <span className="text-muted-foreground">Platforms</span>
              <ul className="flex flex-wrap gap-1">
                <CommaSeparatedList
                  items={data.platforms.map(
                    (platform) => platform.platform.name
                  )}
                  itemClass="underline"
                />
              </ul>
            </div>

            <div className="col-span-full">
              <span className="text-muted-foreground">Description</span>
              <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <AddToLibrary />
            <Card className="py-2 px-4">
              <CardContent className="flex justify-between items-center">
                <span>Metacritic Rating</span>
                <Badge
                  variant={"secondary"}
                  className="text-base px-2 py-1 rounded-xl"
                >
                  {data.metacritic}%
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="bg-accent h-px w-full"></div>

          <div>
            <Card className="py-2 px-4 gap-4">
              <div className="text-muted-foreground">Links</div>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                <div className="bg-secondary px-2 py-1 rounded-lg grid place-items-center">R</div>
                <div className="bg-secondary px-2 py-1 rounded-lg grid place-items-center">FB</div>
                <div className="bg-secondary px-2 py-1 rounded-lg grid place-items-center">YT</div>
                <div className="bg-secondary px-2 py-1 rounded-lg grid place-items-center">TW</div>
                <div className="bg-secondary px-2 py-1 rounded-lg grid place-items-center">X</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
