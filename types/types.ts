export interface RawgGame {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number;
  genres: Genre[];
  tags: Tag[];
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
  stores: StoreEntry[];
  reddit_url: string;
  website: string;
  tags: Tag[];
  publishers: Publisher[];
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Developer {
  image_background: string;
  name: string;
  slug: string;
}

export interface PlatformEntry {
  platform: Platform;
  released_at: string;
  requirements?: PlatformRequirements;
}

export interface Platform {
  id: number;
  slug: string;
  name: string;
}

interface PlatformRequirements {
  minimum: string;
  recommended: string;
}

export interface PCRequirements {
  minimum?: SystemRequirements | null;
  recommended?: SystemRequirements | null;
  rawMinimumText?: string | null;
  rawRecommendedText?: string | null;
}

export interface SystemRequirements {
  os: string;
  processor: string;
  gpu: string;
  memory: string;
  storage: string;
  soundCard: string;
}

export interface Screenshot {
  image: string;
}

export interface Publisher {
  name: string;
  slug: string;
}

export type HydratedGame = {
  user_game: UserGame | undefined;
  rawg_game: RawgGame;
};

export interface Genre {
  id: number;
  games_count: number;
  name: string;
  slug: string;
  image_background: string;
}

export type Category =
  | "uncategorized"
  | "playing"
  | "completed"
  | "played"
  | "not played";
export type LibraryCategory = "all games" | Category;
export type UserRating =
  | "meh"
  | "recommended"
  | "exceptional"
  | null
  | undefined;

export interface Store {
  domain: string;
  slug: string;
  name: string;
  url?: string;
}

export type Social =
  | "steam"
  | "playstation-store"
  | "xbox-store"
  | "gog"
  | "nintendo"
  | "reddit";

export interface StoreEntry {
  store: Store;
}

export type InsertResponse<T> =
  | {
      success: true;
      inserted: T;
    }
  | {
      success: false;
      error: string;
    };

export interface SuccessResponse<T> {
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

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface GetGamesParams {
  page?: number;
  search?: string;
  ids?: number[];
  genres?: string[];
  ordering?: string;
  dates?: string[];
  page_size?: number;
  metacritic?: number[];
  tags?: string[];
  platforms?: string[];
}

export interface Page {
  link: string;
  pageNumber: number;
}

export interface SocialEntryLink {
  slug: string;
  url: string;
  brandColor: string;
}

export type GameStatKey = "total" | Category;