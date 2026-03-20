import { Gamepad2, Play, Check, History } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getUserGames } from "@/services/libraryService";
import { GameStatKey, UserActivity, UserProfile } from "@/types/types";
import { useMemo } from "react";
import { toast } from "sonner";

const statCards = [
  { title: "Total Games", Icon: Gamepad2, keyValue: "total" },
  { title: "Currently Playing", Icon: Play, keyValue: "playing" },
  { title: "Completed Games", Icon: Check, keyValue: "completed" },
  { title: "Played Games", Icon: History, keyValue: "played" },
] as const;

export function useUserProfile(username: string) {
  const supabase = createClient();

  // Fetch profile
  const { data: profile, isLoading: isLoadingProfile } =
    useQuery<UserProfile | null>({
      refetchOnWindowFocus: true,
      staleTime: 0,
      queryKey: ["user", username],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", username)
          .single();

        if (error) {
          toast.error("Could not fetch user history.");
          return null;
        }

        return data as UserProfile;
      },
    });

  // Fetch user games
  const { data: userGames, isLoading: isLoadingGames } = useQuery({
    enabled: !!profile,
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryKey: ["user", username, "games"],
    queryFn: async () => {
      if (!profile) return null;

      const res = await getUserGames(profile.id);

      if (!res.success) {
        toast.error("Could not fetch user games");
        throw new Error(res.error);
      }

      return res.results;
    },
  });

  // Fetch user activity
  const { data: userHistory, isLoading: isLoadingHistory } = useQuery({
    enabled: !!profile,
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryKey: ["user", username, "activity"],
    queryFn: async () => {
      if (!profile) return null;

      const { data: userHistory, error } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("user_id", profile.id)
        .limit(15);

      if (error) {
        toast.error("Could not fetch user history.");
        return null;
      }

      return userHistory as UserActivity[];
    },
  });

  // Calculate games counter map
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
    userHistory,
    gamesCounterMap,
    isLoading: isLoadingProfile || isLoadingGames,
    isLoadingHistory,
    isLoadingProfile,
    isLoadingGames,
  };
}
