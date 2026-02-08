"use server";

import { toFormattedISO } from "@/lib/utils";
import {
  RawgGame,
  RawgGameDetails,
  Screenshot,
  ApiResponse,
  GetGamesParams,
  Genre,
} from "../types/types";

const API_KEY = process.env.RAWG_API_KEY!;
const BASE_URL = process.env.RAWG_ENDPOINT || "https://api.rawg.io/api";

async function rawgFetch<T>(
  endpoint: string,
  params: Record<string, string | number | undefined> = {},
): Promise<ApiResponse<T>> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("key", API_KEY);

  console.log('params', params);
 
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });


  console.log('rawg str', url.toString());

  try {
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(res.statusText);
    const json = await res.json();

    return {
      success: true,
      count: json.count,
      next: json.next,
      previous: json.previous,
      results: Array.isArray(json.results) ? json.results : [json], // Handle details vs list
    };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export const getGames = async ({
  page = 1,
  tags,
  search,
  page_size,
  ids,
  genres,
  ordering,
  dates,
  metacritic,
  platforms
}: GetGamesParams) => {
  return rawgFetch<RawgGame>("/games", {
    page,
    page_size,
    search,
    ordering,
    dates: dates?.join(","),
    ids: ids?.join(","),
    genres: genres?.join(","),
    metacritic: metacritic?.join(","),
    tags: tags?.join(","),
    platforms: platforms?.join(',')
  });
};

export const getGameDetails = async (slug: string) => {
  const res = await rawgFetch<any>(`/games/${slug}`);
  if (res.success) return res.results[0] as RawgGameDetails;
  return { success: false, error: res.error };
};

export const getScreenshots = async (slug: string) => {
  return rawgFetch<Screenshot>(`/games/${slug}/screenshots`);
};

export const getPopularGames = async (count = 10) => {
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() - 30);

  return getGames({
    ordering: "-added",
    dates: [toFormattedISO(lastMonth), toFormattedISO(today)],
    page_size: count,
  });
};

export const getAnticipatedGames = async (count: number = 10) => {
  const today = new Date();
  const nextYear = new Date();
  nextYear.setFullYear(today.getFullYear() + 1);

  return getGames({
    dates: [toFormattedISO(today), toFormattedISO(nextYear)],
    ordering: "-added", // Highest hype
    page_size: count,
  });
};

export const getRecentGames = async (count: number = 10) => {
  const yesterday = new Date();
  const lastMonth = new Date();
  lastMonth.setDate(lastMonth.getDate() - 30);

  return getGames({
    dates: [toFormattedISO(lastMonth), toFormattedISO(yesterday)],
    ordering: "-released", // Sort by Newest first
    page_size: count,
  });
};

export const getRelatedGames = async (game: RawgGame): Promise<RawgGame[]> => {
  const DESIRED_COUNT = 10;
  const MAX_PAGES_TO_SCAN = 5;
  const MINIMUM_GENRE_MATCH = 1; // Changed to 1 to ensure games with fewer genres can find matches
  const COMMON_GENRES = new Set(["action", "adventure", "rpg"]);
  // --- Step 1: Find the game's "DNA" ---
  const allGenres = game.genres.map((g) => g.slug);
  // We prioritize the genres that are NOT in the common list.
  let priorityGenres = allGenres.filter((slug) => !COMMON_GENRES.has(slug));
  // If the game is ONLY made of common genres (like a pure Action-RPG),
  // we have no choice but to use them. This is our fallback.
  if (priorityGenres.length === 0) {
    priorityGenres = allGenres;
  }
  if (priorityGenres.length === 0) {
    return []; // No genres to search for.
  }

  // --- Step 2: The Loop ---
  let accumulatedGames: RawgGame[] = [];
  let currentPage = 1;
  let hasMorePages = true;
  while (
    accumulatedGames.length < DESIRED_COUNT &&
    currentPage <= MAX_PAGES_TO_SCAN &&
    hasMorePages
  ) {
    try {
      const res = await getGames({
        genres: priorityGenres,
        ordering: "-added",
      });

      if (!res.success) {
        throw new Error("Fetching rawg games failed");
      }

      if (!res.next) hasMorePages = false;
      if (!res.results || res.results.length === 0) break;

      // --- Step 3: The Flexible Filter ---
      // We check for matches against the ORIGINAL full list of genres
      const validGames = res.results.filter((relatedGame: RawgGame) => {
        const matchCount = allGenres.reduce(
          (count, genre) =>
            relatedGame.genres.some((g) => g.slug === genre)
              ? count + 1
              : count,
          0,
        );

        return (
          matchCount >= MINIMUM_GENRE_MATCH && relatedGame.slug !== game.slug
        );
      });

      accumulatedGames = [...accumulatedGames, ...validGames];
      currentPage++;
    } catch (error) {
      console.error("API call failed:", error);
      break;
    }
  }
  accumulatedGames.sort((a, b) => {
    const aMatches = a.genres.filter((g) => allGenres.includes(g.slug)).length;
    const bMatches = b.genres.filter((g) => allGenres.includes(g.slug)).length;
    return bMatches - aMatches;
  });
  return accumulatedGames.slice(0, DESIRED_COUNT);
};

export const getGenres = async () => {
  return await rawgFetch<Genre>('/genres');
}

export const getPlatforms = async () => {
  return await rawgFetch<Genre>('/platforms');
}