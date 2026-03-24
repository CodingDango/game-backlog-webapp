import { createClient } from "@/lib/supabase/client";

interface Props {
  userId?: string;
  limit?: number;
  rangeFrom?: number;
  rangeTo?: number;
  ascending?: boolean;
}

export async function fetchUserActivity({
  userId,
  limit,
  rangeFrom,
  rangeTo,
  ascending = false,
}: Props) {
  const supabase = createClient();
  const query = supabase
    .from("activity_logs")
    .select("*")
    .order("created_at", { ascending })
    .eq("user_id", userId);

  if (limit) {
    query.limit(limit);
  }

  if (rangeFrom !== undefined && rangeTo !== undefined) {
    query.range(rangeFrom, rangeTo);
  }

  const { data: userHistory, error } = await query;

  if (error) throw error;
  return userHistory;
}
