import { formatTimestamp } from "@/lib/utils";
import { UserProfile } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import UserAvatar from "../common/UserAvatar";

interface ProfileProps {
  profile?: UserProfile;
}

export default function DashboardProfile({ profile }: ProfileProps) {

  return (
    <div className="flex items-center gap-6">
      <UserAvatar profile={profile} avatarClass="w-24 h-24"/>

      <div>
        {!profile ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-36"/>
            <Skeleton className="h-4 w-27"/>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-semibold">{profile.username}</h1>
            <p className="text-muted-foreground">
              Joined on{" "}
              {profile?.created_at
                ? formatTimestamp(profile?.created_at)
                : "Invalid date"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
