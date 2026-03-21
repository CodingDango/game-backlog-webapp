"use client";

import Profile from "@/components/dashboard/Profile";
import StatCard from "@/components/dashboard/StatCard";
import RecentUserActivity from "@/components/dashboard/RecentUserActivity";
import UserChart from "@/components/dashboard/UserChart";

import { Skeleton } from "@/components/ui/skeleton";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { Frown } from "lucide-react";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const {
    profile,
    gamesCounterMap,
    isLoadingUserGames,
    isLoadingProfile,
    isLoadingActivity,
    userActivity,
    statCards,
  } = useUserDashboard(username);

  if (!profile && !isLoadingProfile) {
    return (
      <div className="flex gap-4 text-2xl items-center">
        <Frown /> Could not find user
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <header>
        <Profile profile={profile} />
      </header>

      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {isLoadingUserGames
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 w-full h-full">  
          <div className="lg:col-span-3 w-full h-full">
            {isLoadingUserGames ? (
              <Skeleton
                className="w-full h-full min-h-[410px]"
                key="graph-skeleton"
              />
            ) : (
              <UserChart gamesCounterMap={gamesCounterMap} />
            )}
          </div>
          <div className="max-h-[410px] w-full h-full overflow-hidden">
            {isLoadingActivity ? (
              <Skeleton className="w-full h-full"/>
            ) : (
              <RecentUserActivity userActivity={userActivity || undefined} username={username}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
