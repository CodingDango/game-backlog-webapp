import { useQuery } from "@tanstack/react-query";
import { getRecentGames } from "@/services/rawgServices";
import { toast } from "sonner";
import GameCardAlt from "./GameCardAlt";

export default function GamesRecent() {
  const { data: recentlyReleased, isLoading } = useQuery({
    queryKey: ["recentlyReleased"],
    queryFn: async () => {
      const res = await getRecentGames(8);

      if (res.success) return res.results;
      else toast.error(res.error);
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl font-semibold">Recently Released</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {(recentlyReleased || Array.from({ length: 6 })).map((game, idx) => (
          <GameCardAlt
            key={`recent-${idx}`}
            game={game}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}
