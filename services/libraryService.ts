"use server";

import axios from "axios";
import { createClient } from "../lib/supabase/server";
import { RawgGame } from "../types/types";
import type {
  Category,
  HydratedGame,
  InsertResponse,
  UserGame,
  SuccessResponse,
  ErrorResponse,
  ApiResponse
} from "../types/types";
import { getGames } from "./rawgServices";

export async function getUserGames(): Promise<ApiResponse<UserGame>> {
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
    next: null,
    previous: null,
    count: fetchLibrary.length,
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
  const rawgGamesRes = await getGames({ ids: userGameRawgIds });

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
export async function getUserGame(
  rawgId: number
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