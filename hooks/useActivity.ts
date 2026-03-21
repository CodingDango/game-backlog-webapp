import { createClient } from "@/lib/supabase/client";
import { UserActivity, UserProfile } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

interface UseActivityProps {
  userId?: string;
}

export function useActivity({ userId }: UseActivityProps) {
  const supabase = createClient();

  const { data: userActivity, isLoading: isLoadingActivity, isError } = useQuery<UserActivity[]>({
    enabled: !!userId,
    queryKey: ["user", userId, "activity"],
    queryFn: async () => {
      const { data: userHistory, error } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("user_id", userId)
        .limit(15);

      if (error) throw error;
      return userHistory;
    },
  });

  useEffect(() => {
    if (!isError) return;
    toast.error('Could not fetch user activity');
  }, [isError]);

  return {
    userActivity,
    isLoadingActivity
  };
}
