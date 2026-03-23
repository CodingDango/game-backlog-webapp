import { createClient } from "@/lib/supabase/client";
import { fetchUserActivity } from "@/services/userService";
import { UserActivity, UserProfile } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

interface UseActivityProps {
  userId?: string;
  limit?: number;
}

export function useActivity({ userId, limit = 15 }: UseActivityProps) {
  const {
    data: userActivity,
    isLoading: isLoadingActivity,
    isError,
  } = useQuery<UserActivity[]>({
    enabled: !!userId,
    queryKey: ["user", userId, "activity"],
    queryFn: () => fetchUserActivity({ userId, limit }),
  });

  useEffect(() => {
    if (!isError) return;
    toast.error("Could not fetch user activity");
  }, [isError]);

  return {
    userActivity,
    isLoadingActivity,
  };
}
