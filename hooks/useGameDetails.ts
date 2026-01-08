import { useQuery } from "@tanstack/react-query";
import { getUserGame } from "@/services/libraryService";
import { useMemo } from "react";
import { toast } from "sonner";
import {
  extractRequirements,
  formatRawRequirements,
  getStoreUrl,
  truncateDescription,
} from "@/utils/utils";
import { getBrandColor, isSocialInRecords } from "@/components/SocialIcon";
import { isEmpty } from "lodash";
import { PCRequirements, PlatformEntry, StoreEntry } from "@/types/types";
import { getGameDetails, getScreenshots } from "@/services/rawgServices";

export function useGameDetails(slug: string) {
  const gameQuery = useQuery({
    queryKey: ["rawgGames", slug],
    queryFn: () => getGameDetails(slug),
  });

  const gameData =
    gameQuery.data && !("error" in gameQuery.data) ? gameQuery.data : null;

  const userGameQuery = useQuery({
    enabled: !!gameData?.id,
    queryKey: ["userGames", slug],
    queryFn: async () => {
      const res = await getUserGame(gameData!.id);

      if (res && "success" in res) {
        toast.error(res.error);
        return null;
      }

      return res;
    },
  });

  const screenshotQuery = useQuery({
    queryKey: ["rawgGames", slug, "screenshots"],
    queryFn: () => getScreenshots(slug),
  });

  const descriptionHtml = useMemo(() => {
    if (!gameData?.description) return "";

    const parts = gameData.description.split("</p>");
    const englishPart = parts[0] ? parts[0] + "</p>" : gameData.description;
    const firstParagraph = englishPart.split("<br />")[0] + "</p>";

    return firstParagraph;
  }, [gameData?.description]);

  const screenshotLinks: string[] = useMemo(() => {
    const data = screenshotQuery.data;

    if (!data || "error" in data) return [];

    return data.results.map((screenshot) => screenshot.image);
  }, [screenshotQuery]);

  const uniqueSocialEntries = useMemo(() => {
    if (!gameData?.stores || !gameData) return [];

    const entries: { slug: string; url: string; brandColor: string }[] = [];

    gameData.stores.forEach(({ store }: StoreEntry) => {
      if (isSocialInRecords(store.slug)) {
        entries.push({
          slug: store.slug,
          url: getStoreUrl(store, gameData.name),
          brandColor: getBrandColor(store.slug),
        });
      }
    });

    const redditSlug = "reddit";
    const officialSlug = "official-website";

    if (gameData.reddit_url.length) {
      entries.push({
        slug: redditSlug,
        url: gameData.reddit_url,
        brandColor: getBrandColor(redditSlug),
      });
    }

    if (gameData.website.length) {
      entries.push({
        slug: officialSlug,
        url: gameData.website,
        brandColor: getBrandColor(officialSlug),
      });
    }

    return entries;
  }, [gameData?.stores]);

  const pcRequirements = useMemo<PCRequirements | null>(() => {
    if (!gameData?.platforms) return null;

    const pcPlatform = gameData.platforms.find(( { platform }: PlatformEntry ) => platform.slug === "pc");

    if (
      !pcPlatform ||
      !pcPlatform.requirements ||
      isEmpty(pcPlatform.requirements)
    )
      return null;

    const minimum = extractRequirements(pcPlatform.requirements.minimum);
    const recommended = extractRequirements(
      pcPlatform.requirements.recommended
    );

    return {
      minimum,
      recommended,
      rawMinimumText: formatRawRequirements(pcPlatform.requirements.minimum),
      rawRecommendedText: formatRawRequirements(
        pcPlatform.requirements.recommended
      ),
    };
  }, [gameData?.platforms]);

  const tags: string[] = useMemo(() => {
    if (!gameData) return [];

    return gameData.tags.map((tag) => tag.name);
  }, [gameData?.tags]);

  return {
    game: gameData,
    gameDescription: truncateDescription(descriptionHtml),
    userGame: userGameQuery.data,
    screenshots: screenshotLinks,
    error: gameQuery.error,
    isLoading: gameQuery.isLoading,
    isError: gameQuery.isError,
    isScreenShotsLoading: screenshotQuery.isLoading,
    isUserGameLoading: userGameQuery.isLoading,
    uniqueSocialEntries: uniqueSocialEntries,
    pcRequirements,
    tags,
  };
}
