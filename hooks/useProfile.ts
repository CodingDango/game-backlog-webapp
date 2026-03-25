import { createClient } from "@/lib/supabase/client";
import { UserProfile } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

interface UseProfileProps {
  username?: string;
  userId?: string;
}

export function useProfile({ username, userId }: UseProfileProps) {
  const supabase = createClient();

  const {
    data: profile,
    isLoading: isLoadingProfile,
    isError,
  } = useQuery<UserProfile | null>({
    enabled: !!username || !!userId,
    staleTime: 1000 * 60 * 5,
    queryKey: ["user", username || userId || ""],
    queryFn: async () => {
      const query = supabase.from("profiles").select("*");

      if (username) {
        query.ilike("username", username);
      } else if (userId) {
        query.eq("id", userId);
      } else {
        return null;
      }

      const { data, error } = await query.single();

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!isError) return;
    toast.error("Could not fetch profile");
  }, [isError]);

  return {
    profile,
    isLoadingProfile,
  };
}
