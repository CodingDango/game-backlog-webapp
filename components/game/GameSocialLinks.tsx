import { Card } from "../ui/card";
import SocialIcon from "../common/SocialIcon";
import { SocialEntryLink } from "@/types/types";

interface Props {
  socialEntryLinks: SocialEntryLink[]
}

export default function GameSocialLinks({ socialEntryLinks }: Props) {
  return (
    <Card className="py-4 px-4 gap-4">
      <div className="text-muted-foreground font-semibold">Links</div>
      <div className="flex flex-wrap gap-4">
        {socialEntryLinks.map((store, idx) => (
          <div key={idx}>
            <a target="_blank" href={store.url}>
              <div
                className="w-8 h-8 grid place-items-center rounded-md"
                style={{ background: store.brandColor }}
              >
                <SocialIcon slug={store.slug} className="w-5 h-5" />
              </div>
            </a>
          </div>
        ))}
      </div>
    </Card>
  );
}
