import { AppImageCarousel } from "@/components/common/AppImageCarousel";
import { PCRequirements } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

import GameSystemRequirements from "@/components/game/GameSystemRequirements";
import ExpandableText from "../common/ExpandableText";

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
      <div className="relative max-h-125">
        <AppImageCarousel images={screenshotUrls} isLoading={isLoading} />
      </div>

      {/* About Section */}
      <div className="flex flex-col gap-2">
        <span className="text-xl font-semibold">About</span>
        <ExpandableText>
          <div className="space-y-3">
            {!descriptionParagraphs.length
              ? "No description provided"
              : descriptionParagraphs.map((paragraph, idx) => (
                  <p key={`paragraph-${idx}`}>{paragraph}</p>
                ))}
          </div>
        </ExpandableText>
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
