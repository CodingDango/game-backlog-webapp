"use client";

import StatCard from "@/components/dashboard/StatCard";
import UserChart from "@/components/dashboard/UserChart";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/client";
import { getUserGames } from "@/services/libraryService";
import { GameStatKey } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Gamepad2, Play, Check, History } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";

const statCards = [
  { title: "Total Games", Icon: Gamepad2, keyValue: "total" },
  { title: "Currently Playing", Icon: Play, keyValue: "playing" },
  { title: "Completed Games", Icon: Check, keyValue: "completed" },
  { title: "Played Games", Icon: History    , keyValue: "played" },
] as const;

export default function ProfilePage() {
  const { user_id: userId } = useParams<{ user_id: string }>();
  const { data, isLoading } = useQuery({
    enabled: !!userId,
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryKey: ["userGames", userId],
    queryFn: async () => {
      const res = await getUserGames(userId);

      if (!res.success) {
        toast.error(res.error);
        throw new Error(res.error);
      }

      return res.results;
    },
  });

  const gamesCounterMap: Record<GameStatKey, number> = useMemo(() => {
    const map = {
      total: 0,
      playing: 0,
      completed: 0,
      played: 0,
      "not played": 0,
      uncategorized: 0,
    };

    if (!data) return map;

    for (const game of data) {
      map[game.category]++;
      map.total++;
    }

    return map;
  }, [data]);

  return (
    <div className="flex flex-col gap-12">
      <header className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-semibold">Username</h1>
          <p className="text-muted-foreground">Joined on Dec 22, 2015</p>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={`skeleton-${idx}`} className="h-[130px]" />
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="col-span-3">
          <UserChart gamesCounterMap={gamesCounterMap} />
        </div>
      </div>
    </div>
  );
}
