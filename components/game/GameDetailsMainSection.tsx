import { AppImageCarousel } from "@/components/common/AppImageCarousel";
import { PCRequirements } from "@/types/types";
import GameSystemRequirements from "@/components/game/GameSystemRequirements";
import { Skeleton } from "../ui/skeleton";

interface GameDetailsMainSectionProps {
  screenshotUrls: string[];
  isLoading: boolean;
  descriptionParagraphs: string[];
  pcRequirements: PCRequirements | null;
}

export function GameDetailsMainSection({
  screenshotUrls,
  isLoading,
  descriptionParagraphs,
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
        <div className="overflow-hidden space-y-4">
          {!descriptionParagraphs.length && "No description provided"}
          {descriptionParagraphs.length &&
            descriptionParagraphs.map((paragraph, idx) => (
              <p key={`paragraph-${idx}`}>{paragraph}</p>
            ))}
        </div>
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
