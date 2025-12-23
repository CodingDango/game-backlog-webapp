"use client";

import { use, useMemo } from "react";
import { getRawgGameDetails } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";

import PageSpinner from "@/components/PageSpinner";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// TODO: Add playtime card, add social links card, add carousel, add function to add library, add color to rating
export default function DetailsPage({ params }: PageProps) {
  const { slug } = use(params);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["rawgGames", slug],
    queryFn: () => getRawgGameDetails(slug),
  });

  const parsedDescription = useMemo(() => {
    if (!data || "error" in data) return "";

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.description, "text/html");
    const textContent = doc.body.textContent || "";

    return textContent.trim();
  }, [data]);

  if (isLoading) return <PageSpinner />;

  if (!data) return <div>No data</div>;

  if (isError || "error" in data) return <div>{}</div>;

  return (
    <div className="flex flex-col gap-8">
      <span className="text-4xl font-medium">{data.name}</span>

      <div className="grid grid-cols-[3fr_1fr] gap-8">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
            <div className="relative w-full h-full min-h-[300px] max-h-[400px]">
              <Image
                fill
                alt={`Banner for ${data.name}`}
                src={data.background_image}
                className="object-cover rounded-xl"
              />
            </div>

            <div className="relative w-full aspect-video min-h-[300px] max-h-[400px]">
              <Image
                fill
                alt={`Image of ${data.name}`}
                src={data.background_image_additional}
                className="object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <div>
              <span className="text-muted-foreground">Platforms</span>
              <ul className="flex gap-2">
                <li className="underline">PS1,</li>
                <li className="underline">PS2,</li>
                <li className="underline">XBOX 360</li>
              </ul>
            </div>

            <div>
              <span className="text-muted-foreground">Platforms</span>
              <ul className="flex gap-2">
                <li className="underline">PS1,</li>
                <li className="underline">PS2,</li>
                <li className="underline">XBOX 360</li>
              </ul>
            </div>
            <div>
              <span className="text-muted-foreground">Platforms</span>
              <ul className="flex gap-2">
                <li className="underline">PS1,</li>
                <li className="underline">PS2,</li>
                <li className="underline">XBOX 360</li>
              </ul>
            </div>
            <div>
              <span className="text-muted-foreground">Platforms</span>
              <ul className="flex gap-2">
                <li className="underline">PS1,</li>
                <li className="underline">PS2,</li>
                <li className="underline">XBOX 360</li>
              </ul>
            </div>
            <div>
              <span className="text-muted-foreground">Platforms</span>
              <ul className="flex gap-2">
                <li className="underline">PS1,</li>
                <li className="underline">PS2,</li>
                <li className="underline">XBOX 360</li>
              </ul>
            </div>
          </div>

          <div className="col-span-2">{parsedDescription}</div>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="px-4 py-2 bg-card rounded-lg border-accent">
            <div className="flex justify-between items-center">
              <span>Metacritic Rating</span>
              <Badge variant={'secondary'} className="text-base px-2 py-1 rounded-xl">{data.metacritic}%</Badge>
            </div>
          </Card>

          <Button size={'lg'} className="w-full text-start">Add to library</Button>
        </div>
      </div>
    </div>
  );
}
