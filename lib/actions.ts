"use server";

import { error } from "console";
import { createClient } from "./supabase/server";
import { RawgGamesResponse } from "./types";
import type { Category, InsertResponse, UserGame, UserLibraryResponse, UserRating } from "./types";



export async function getRawgGames(): Promise<RawgGamesResponse> {
  const endpoint = `${process.env.RAWG_ENDPOINT}/games`;
  const apiKey = process.env.RAWG_API_KEY;

  const res = await fetch(`${endpoint}?key=${apiKey}`);

  console.log(endpoint);

  const json = res.json();
  return json;
}

export async function getUserLibrary(): Promise<UserGame[]> {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.log("Error getting user for their library:", authError);
    throw new Error("User not authenticated or session expired.");  
  }
  
  const { data: fetchLibrary, error: fetchErr } = await supabase
    .from("user_games")
    .select("*")
    .eq("user_id", user.id);

  if (fetchErr) {
    throw new Error(fetchErr.message);
  }

  return fetchLibrary || [];
}

export async function addGameToLibrary(
  rawgId: number,
  category: Category = null,
  userRating: UserRating = null
): Promise<InsertResponse> {
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
        ignoreDuplicates: true,
      }
    )
    .select("id")
    .single();

  if (insertErr || !insertedData) {
    console.log("Error inserting game:", insertErr);
    return { success: false, error: insertErr.message };
  }

  return { success: true };
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
