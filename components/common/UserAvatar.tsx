import { UserProfile } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

interface UserAvatarProps {
  profile?: UserProfile;
  avatarClass?: string;
  fallbackClass?: string;

}

export default function UserAvatar({ profile, avatarClass, fallbackClass }: UserAvatarProps) {
  const fallbackName = profile
    ? `${profile.username[0]}${profile.username[1]}`
    : "AB";

  return (
    <>
      {!profile ? (
        <Skeleton className={avatarClass} />
      ) : (
        <Avatar className={avatarClass}>
          <AvatarImage src={profile?.avatar_url} />
          <AvatarFallback className={fallbackClass}>{fallbackName.toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
    </>
  );
}
