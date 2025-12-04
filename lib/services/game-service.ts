import { getGames as getGamesServerAction } from '@/lib/actions';
import { GameServiceResponse } from '../types';

export const gameService = {
  async getGames(): Promise<GameServiceResponse> {
    console.log("Fetching games using a Server Action...");
    return getGamesServerAction();
  }
};