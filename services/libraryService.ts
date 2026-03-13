"use server";

import { createClient } from "../lib/supabase/server";
import { RawgGame } from "../types/types";
import type {
  Category,
  HydratedGame,
  InsertResponse,
  UserGame,
  SuccessResponse,
  ErrorResponse,
  ApiResponse,
} from "../types/types";
import { getGames } from "./rawgServices";

export async function getUserGames(
  userId?: string,
): Promise<ApiResponse<UserGame>> {
  const supabase = await createClient();

  if (!userId) {
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

    userId = user.id;
  }

  const { data: fetchLibrary, error: fetchErr } = await supabase
    .from("user_games")
    .select("*")
    .eq("user_id", userId);

  if (fetchErr) {
    console.error(fetchErr.message);
    return {
      success: false,
      error: fetchErr.message,
    };
  }

  return {
    success: true,
    next: null,
    previous: null,
    count: fetchLibrary.length,
    results: fetchLibrary || [],
  };
}

export async function addGameToLibrary(
  rawgId: number,
  category: Category = "uncategorized",
  userRating: number | null = 0,
): Promise<InsertResponse<RawgGame>> {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) {
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
      },
    )
    .select("*")
    .single();

  if (insertErr) {
    return { success: false, error: insertErr.message };
  }

  return { success: true, inserted: insertedData };
}

export async function removeGameFromLibrary(rawgId: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "No user" };

  const { data: checkData, error: checkError } = await supabase
    .from("user_games")
    .select("id")
    .eq("user_id", user.id)
    .eq("rawg_id", rawgId)
    .maybeSingle();

  if (!checkData) {
    return { success: false, error: "Game not found or permission denied" };
  }

  const { error, count } = await supabase
    .from("user_games")
    .delete()
    .eq("id", checkData.id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function getHydratedUserLibrary(
  userId?: string,
): Promise<SuccessResponse<HydratedGame> | ErrorResponse> {
  const page_size = 20;
  const userGamesRes = await getUserGames(userId);

  if (!userGamesRes.success) {
    return { success: false, error: userGamesRes.error };
  }

  const userGameIds = userGamesRes.results.map((userGame) => userGame.rawg_id);
  const promises = [];

  for (let i = 0; i < userGameIds.length; i += page_size) {
    const ids = userGameIds.slice(i, i + page_size);
    promises.push(getGames({ ids }));
  }

  const rawgGamesRes = await Promise.all(promises);

  const allRawgGames = rawgGamesRes
    .filter((res) => res.success)
    .flatMap((res) => res.results);

  if (allRawgGames.length === 0) {
    return { success: false, error: "Failed to load any games from RAWG" };
  }

  const userGamesMap = new Map(
    userGamesRes.results.map((entry) => [entry.rawg_id, entry]),
  );

  const hydrated = allRawgGames.map((rawgGame) => {
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
export async function getUserGame(
  rawgId: number,
): Promise<UserGame | ErrorResponse> {
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
