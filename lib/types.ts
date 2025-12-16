export interface RawgGame {
  id: number;
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
  user_rating: UserRating;
  rawg_id: number;
}

export type HydratedGame = { user_game: UserGame | undefined, rawg_game: RawgGame };
  
export interface Genre {
  name: string;
  games_count: number;
}

export type Category = 'uncategorized' | 'playing' | 'played' | 'unplayed' | null | undefined;
export type UserRating = 'meh' | 'recommended' | 'exceptional' | null | undefined;

export interface InsertResponse {
  success: boolean;
  error?: string;
}