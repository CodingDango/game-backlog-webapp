"use server";

import { error } from "console";
import { createClient } from "./supabase/server";
import { RawgGame } from "./types";
import type {
  Category,
  HydratedGame,
  InsertResponse,
  RawgGameDetails,
  Screenshot,
  UserGame,
  UserRating,
} from "./types";

interface SuccessResponse<T> {
  success: true;
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ErrorResponse {
  success: false;
  error: string;
}

interface UserLibrarySuccess {
  success: true;
  results: UserGame[];
}

export type RawgScreenshotResponse =
  | SuccessResponse<Screenshot>
  | ErrorResponse;
export type UserGamesResponse = UserLibrarySuccess | ErrorResponse;
export type RawgGamesResponse = SuccessResponse<RawgGame> | ErrorResponse;

// TODO: Understand this function as AI contributed to this a lot
export async function getRawgGameList(
  page = 1,
  search?: string,
  ids?: number[]
): Promise<RawgGamesResponse> {
  const endpoint = `${process.env.RAWG_ENDPOINT}/games`;
  const url = new URL(endpoint);

  url.searchParams.set("key", process.env.RAWG_API_KEY!);
  url.searchParams.set("page", page.toString());

  if (search) {
    url.searchParams.set("search", search);
  }

  if (ids && ids.length > 0) {
    url.searchParams.set("ids", ids.join(","));
  }

  console.log(`Fetching: ${url.toString()}`); // Good for debugging
  const res = await fetch(url.toString());

  if (!res.ok) {
    return {
      success: false,
      error: res.statusText,
    };
  }

  const json = await res.json();

  return {
    success: true,
    count: json.count,
    next: json.next,
    previous: json.previous,
    results: json.results,
  };
}

export async function getRawgGames(
  rawg_ids: number[]
): Promise<RawgGamesResponse> {
  const joinedIds = rawg_ids.join(",");
  const endpoint = `${process.env.RAWG_ENDPOINT}/games`;
  const apiKey = process.env.RAWG_API_KEY;
  const res = await fetch(`${endpoint}?ids=${joinedIds}&key=${apiKey}`);

  if (!res.ok) {
    return {
      success: false,
      error: res.statusText,
    };
  }

  const json = await res.json();

  return {
    success: true,
    next: null,
    previous: null,
    count: json.count,
    results: json.results,
  };
}

export async function getUserGames(): Promise<UserGamesResponse> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    const error = authError?.message || "I don't know, user session is null";
    console.error(error);

    return {
      success: false,
      error: error,
    };
  }

  const { data: fetchLibrary, error: fetchErr } = await supabase
    .from("user_games")
    .select("*")
    .eq("user_id", user.id);

  if (fetchErr) {
    console.error(fetchErr.message);
    return {
      success: false,
      error: fetchErr.message,
    };
  }

  return {
    success: true,
    results: fetchLibrary || [],
  };
}

export async function addGameToLibrary(
  rawgId: number,
  category: Category = "uncategorized",
  userRating: number | null = null
): Promise<InsertResponse<RawgGame>> {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.log("Error getting user for inserting:", authError);
    return { success: false, error: authError.message };
  }

  const userId = authData.user.id;
  const { data: insertedData, error: insertErr } = await supabase
    .from("user_games")
    .upsert(
      {
        user_id: userId,
        rawg_id: rawgId,
        user_rating: userRating,
        category,
      },
      {
        onConflict: "user_id,rawg_id",
      }
    )
    .select("*")
    .single();

  if (insertErr) {
    console.log("Error inserting game:", insertErr);
    return { success: false, error: insertErr.message };
  }

  return { success: true, inserted: insertedData };
}

export async function removeGameFromLibrary(rawgId: number) {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.log("Error getting user for removing:", authError);
    return { success: false, error: authError.message };
  }

  const userId = authData.user.id;
  const { error: removeErr } = await supabase
    .from("user_games")
    .delete()
    .eq("user_id", userId)
    .eq("rawg_id", rawgId);

  if (removeErr) {
    console.log("Error removing game:", removeErr);
    return { success: false, error: removeErr.message };
  }

  return { success: true };
}

export async function modifyUserGameCategory(id: number, category: Category) {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) {
    console.log("Error getting user for modifying:", authError);
    return { success: false, error: authError.message };
  }

  const userId = authData.user.id;
  const { error: removeErr } = await supabase
    .from("user_games")
    .update({ category })
    .eq("user_id", userId)
    .eq("id", id);

  if (removeErr) {
    console.log("Error removing game:", removeErr);
    return { success: false, error: removeErr.message };
  }

  return { success: true };
}

// TODO: Add pagination to getHydratedUserLibrary
export async function getHydratedUserLibrary(): Promise<
  SuccessResponse<HydratedGame> | ErrorResponse
> {
  const userGamesRes = await getUserGames();

  if (!userGamesRes.success) {
    return { success: false, error: userGamesRes.error };
  }

  const userGameRawgIds = userGamesRes.results.map(
    (userGame) => userGame.rawg_id
  );
  const rawgGamesRes = await getRawgGames(userGameRawgIds);

  if (!rawgGamesRes.success) {
    return { success: false, error: rawgGamesRes.error };
  }

  const userGamesMap = new Map(
    userGamesRes.results.map((entry) => [entry.rawg_id, entry])
  );

  const hydrated = rawgGamesRes.results.map((rawgGame) => {
    const userGame = userGamesMap.get(rawgGame.id);

    return {
      rawg_game: rawgGame,
      user_game: userGame,
    };
  });

  return {
    success: true,
    next: null,
    previous: null,
    count: hydrated.length,
    results: hydrated,
  };
}

export async function getRawgGameDetails(
  slug: string
): Promise<ErrorResponse | RawgGameDetails> {
  const apiKey = process.env.RAWG_API_KEY;
  const endpoint = `https://api.rawg.io/api/games/${slug}?key=${apiKey}`;
  const res = await fetch(endpoint);

  if (!res.ok) {
    return { success: false, error: res.statusText };
  }

  const details = await res.json();

  return details as RawgGameDetails;
}

export async function getRawgGameScreenshots(
  slug: string
): Promise<RawgScreenshotResponse> {
  const apiKey = process.env.RAWG_API_KEY;
  const endpoint = `https://api.rawg.io/api/games/${slug}/screenshots?key=${apiKey}`;
  const res = await fetch(endpoint);

  if (!res.ok) {
    return { success: false, error: res.statusText };
  }

  const details = await res.json();

  return details;
}

export async function getUserGame(rawgId: number): Promise<UserGame | ErrorResponse> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    const error = authError?.message || "I don't know, user session is null";
    console.error(error);

    return {
      success: false,
      error: error,
    };
  }

  const { data: userGame, error: fetchErr } = await supabase
    .from("user_games")
    .select("*")
    .eq("user_id", user.id)
    .eq("rawg_id", rawgId)
    .maybeSingle();

  if (fetchErr) {
    return {
      success: false,
      error: fetchErr.message,
    };
  }

  return {
    ...userGame,
  } as UserGame;
}
