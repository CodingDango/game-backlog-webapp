export interface GameServiceResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  metacritic: number;
  genres: Genre[];
}

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
