import { Button } from "@/components/ui/button";
import { AppImage } from "@/components/common/AppImage";
import { Plus } from "lucide-react";
import { RawgGameDetails, SocialEntryLink, UserGame } from "@/types/types";
import { Session } from "@supabase/supabase-js";

import GameLibraryDialog from "@/components/library/GameLibraryDialog";
import GameSocialLinks from "@/components/game/GameSocialLinks";
import GameMetacriticRating from "@/components/game/GameMetacriticRating";
import GameCommunityRating from "@/components/game/GameCommunityRating";
import GameTags from "@/components/game/GameTags";
import GameDetails from "@/components/game/GameDetails";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface GameDetailsSidebarProps {
  gameDetails: RawgGameDetails;
  userGame?: UserGame;
  session: Session | null;
  isUserGameLoading: boolean;
  router: AppRouterInstance;
  socialEntryLinks: SocialEntryLink[]
}

export default function GameDetailsSidebar({
  gameDetails,
  userGame,
  session,
  isUserGameLoading,
  router,
  socialEntryLinks,
}: GameDetailsSidebarProps) {
  return (
    <div className="flex flex-col gap-8 min-w-0">
      <div className="relative w-full h-48 lg:h-36 rounded-md overflow-hidden">
        <AppImage
          fill
          src={gameDetails.background_image}
          alt={gameDetails.name}
          className="object-cover"
        />
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          {session ? (
            <GameLibraryDialog
              key={userGame?.id ?? "new-" + gameDetails.id}
              isSessionLoading={isUserGameLoading}
              userGame={userGame ?? null}
              title={gameDetails.name}
              rawgId={gameDetails.id}
            />
          ) : (
            <Button onClick={() => router.push('/login')} className="w-full">
              <Plus className="mr-2" /> Add to library
            </Button>
          )}
          <GameMetacriticRating metacriticScore={gameDetails.metacritic} />
          <GameCommunityRating />
        </div>

        <div className="h-px w-full bg-border"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
          <div className="sm:col-span-2 md:col-span-auto">
            <GameDetails game={gameDetails} />
          </div>
          <div className="max-h-56 h-full col-span-1 md:col-span-2">
            <GameTags tags={gameDetails.tags} />
          </div>
          <div className="w-full h-full col-span-1 md:col-span-2 flex">
            <GameSocialLinks socialEntryLinks={socialEntryLinks} />
          </div>
        </div>
      </div>
    </div>
  );
}
