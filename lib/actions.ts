"use server";

import { createClient } from "./supabase/server";
import { GameServiceResponse } from "./types";
import type { Category, InsertResponse, UserRating } from "./types";

export async function getGames(): Promise<GameServiceResponse> {
  const endpoint = `${process.env.RAWG_ENDPOINT}/games`;
  const apiKey = process.env.RAWG_API_KEY;

  const res = await fetch(`${endpoint}?key=${apiKey}`);

  console.log(endpoint);

  const json = res.json();
  return json;
}

export async function getUserGames() {}

export async function addGameToLibrary(
  gameId: number,
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

  const { error: insertErr } = await supabase.from("user-games").insert({
    user_id: userId,
    game_id: gameId,
    user_rating: userRating,  
    category,
  });

  if (insertErr) {
    console.log("Error inserting game:", insertErr);
    return { success: false, error: insertErr.message };
  }

  return { success: true };
}
