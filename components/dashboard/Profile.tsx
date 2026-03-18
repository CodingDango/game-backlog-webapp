import { formatTimestamp } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserProfile } from "@/types/types";
import { Skeleton } from "../ui/skeleton";

interface ProfileProps {
  profile?: UserProfile | null;
}

export default function Profile({ profile }: ProfileProps) {
  const fallbackName = profile
    ? `${profile.username[0]}${profile.username[1]}`
    : "CN";

  return (
    <div className="flex items-center gap-6">
      {!profile ? (
        <Skeleton className="rounded-full w-24 h-24" />
      ) : (
        <Avatar className="h-24 w-24">
          <AvatarImage src={profile?.avatar_url} />
          <AvatarFallback>{fallbackName.toUpperCase()}</AvatarFallback>
        </Avatar>
      )}

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
