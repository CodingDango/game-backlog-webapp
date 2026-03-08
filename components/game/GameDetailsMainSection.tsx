import { AppImageCarousel } from "@/components/common/AppImageCarousel";
import { PCRequirements } from "@/types/types";
import GameSystemRequirements from "@/components/game/GameSystemRequirements";

interface GameDetailsMainSectionProps {
  screenshotUrls: string[];
  isLoading: boolean;
  gameDescription: string;
  pcRequirements: PCRequirements | null;
}

export function GameDetailsMainSection({
  screenshotUrls,
  isLoading,
  gameDescription,
  pcRequirements,
}: GameDetailsMainSectionProps) {
  return (
    <div className="flex flex-col gap-12 min-w-0">
      <div className="relative max-h-[500px]">
        <AppImageCarousel images={screenshotUrls} isLoading={isLoading} />
      </div>

      {/* About Section */}
      <div className="flex flex-col gap-2">
        <span className="text-xl font-semibold">About</span>
        <div
          className="prose max-w-none overflow-hidden text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: gameDescription }}
        />
      </div>

      {/* System Requirements */}
      <div className="flex flex-col gap-2">
        <span className="text-xl font-semibold">System Requirements</span>
        {pcRequirements ? (
          <GameSystemRequirements requirements={pcRequirements} />
        ) : (
          <div className="text-muted-foreground">None listed.</div>
        )}
      </div>
    </div>
  );
}
