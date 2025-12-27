export interface RawgGame {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number;
  genres: Genre[];
}

export interface UserGame {
  id: number;
  created_at: string;
  user_id: string;
  category: Category;
  user_rating: number;
  rawg_id: number;
}

export interface RawgGameDetails {
  id: number;
  name: string;
  description: string;
  metacritic: number;
  playtime: number;
  released: string;
  background_image: string;
  background_image_additional: string;
  platforms: PlatformEntry[];
  genres: Genre[];
  developers: Developer[];
}

export interface Developer {
  image_background: string;
  name: string;
  slug: string;
}

export interface PlatformEntry {
  platform: Platform;
  released_at: string;
}

export interface Platform {
  id: number,
  slug: string,
  name: string
}

export interface Screenshot {
  image: string;
}

export type HydratedGame = { user_game: UserGame | undefined, rawg_game: RawgGame };
  
export interface Genre {
  id: number;
  games_count: number;
  name: string;
  slug: string;
  image_background: string;
}

export type Category = 'uncategorized' | 'currently playing' | 'completed' | 'played' | 'not played';
export type LibraryCategory = 'all games' | Category;
export type UserRating = 'meh' | 'recommended' | 'exceptional' | null | undefined;

export type InsertResponse<T> = {
  success: true;
  inserted: T
} | {
  success: false;
  error: string;
};