import { Gamepad2, Play, Check, History } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getUserGames } from "@/services/libraryService";
import { GameStatKey, UserActivity, UserProfile } from "@/types/types";
import { useMemo } from "react";
import { toast } from "sonner";
import { useProfile } from "./useProfile";
import { useActivity } from "./useActivity";
import { useUserGames } from "./useGames";

const statCards = [
  { title: "Total Games", Icon: Gamepad2, keyValue: "total" },
  { title: "Currently Playing", Icon: Play, keyValue: "playing" },
  { title: "Completed Games", Icon: Check, keyValue: "completed" },
  { title: "Played Games", Icon: History, keyValue: "played" },
] as const;

export function useUserDashboard(username: string) {
  const supabase = createClient();

  const { profile, isLoadingProfile  } = useProfile({ username });

  const { userGames, isLoadingUserGames } = useUserGames({ userId: profile?.id });

  const { userActivity, isLoadingActivity } = useActivity({ userId: profile?.id });

  const gamesCounterMap: Record<GameStatKey, number> = useMemo(() => {
    const map = {
      total: 0,
      playing: 0,
      completed: 0,
      played: 0,
      "not played": 0,
      uncategorized: 0,
    };

    if (!userGames) return map;

    for (const game of userGames) {
      map[game.category]++;
      map.total++;
    }

    return map;
  }, [userGames]);

  return {
    statCards,
    profile,
    userGames,
    userActivity,
    gamesCounterMap,
    isLoadingProfile,
    isLoadingActivity: !profile ? true : isLoadingActivity,
    isLoadingUserGames: !profile ? true : isLoadingUserGames,
  };
}
