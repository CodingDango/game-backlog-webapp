import { Card } from "../ui/card";
import SocialIcon from "../common/SocialIcon";
import { SocialEntryLink } from "@/types/types";
import { Frown } from "lucide-react";

interface Props {
  socialEntryLinks: SocialEntryLink[];
}

export default function GameSocialLinks({ socialEntryLinks }: Props) {
  return (
    <Card className="w-full py-4 px-4 gap-4">
      <div className="text-muted-foreground font-semibold">Links</div>
      <div className="flex flex-wrap gap-4">        
        {socialEntryLinks.length ? (
          socialEntryLinks.map((store, idx) => (
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
          ))
        ) : (
          <span className="text-muted-foreground flex gap-3">
            <Frown /> No links provided 
          </span>
        )}
      </div>
    </Card>
  );
}
