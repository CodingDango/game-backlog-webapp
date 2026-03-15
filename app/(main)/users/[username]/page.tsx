"use client";

import Profile from "@/components/dashboard/Profile";
import StatCard from "@/components/dashboard/StatCard";
import UserChart from "@/components/dashboard/UserChart";

import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/client";
import { getUserGames } from "@/services/libraryService";
import { GameStatKey, UserProfile } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Gamepad2, Play, Check, History } from "lucide-react";
import { UNSTABLE_REVALIDATE_RENAME_ERROR } from "next/dist/lib/constants";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";

const statCards = [
  { title: "Total Games", Icon: Gamepad2, keyValue: "total" },
  { title: "Currently Playing", Icon: Play, keyValue: "playing" },
  { title: "Completed Games", Icon: Check, keyValue: "completed" },
  { title: "Played Games", Icon: History, keyValue: "played" },
] as const;

export default function ProfilePage() {
  const supabase = createClient();
  const { username } = useParams<{ username: string }>();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryKey: ["user", UNSTABLE_REVALIDATE_RENAME_ERROR],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (error) {
        toast.error(error.message);
        return undefined;
      }

      return data as UserProfile;
    },
  });

  const { data: userGames, isLoading: isLoadingGames } = useQuery({
    enabled: !!profile,
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryKey: ["user", username, "games"],
    queryFn: async () => {
      const res = await getUserGames(profile?.id);

      if (!res.success) {
        toast.error(res.error);
        throw new Error(res.error);
      }

      return res.results;
    },
  });

  const isLoading = isLoadingProfile || isLoadingGames;

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

  console.log(profile);

  return (
    <div className="flex flex-col gap-12">
      <header>
        <Profile profile={profile}/>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={`stats-skeleton-${idx}`} className="h-[130px]" />
            ))
          : statCards.map(({ title, Icon, keyValue }) => (
              <StatCard
                key={title}
                title={title}
                value={gamesCounterMap[keyValue] ?? 0}
                Icon={Icon}
              />
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full h-full">
        <div className="col-span-3 w-full h-full">
          {isLoading ? (
            <Skeleton className="w-full h-full min-h-[410px]" key="graph-skeleton"/>
          ) : (
            <UserChart gamesCounterMap={gamesCounterMap} />
          )}
        </div>
      </div>
    </div>
  );
}