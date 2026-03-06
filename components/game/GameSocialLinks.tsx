import { Card } from "../ui/card";
import SocialIcon from "../common/SocialIcon";

interface Props {
  socialEntries: {
    slug: string;
    url: string;
    brandColor: string;
  }[];
}

export default function GameSocialLinks({ socialEntries }: Props) {
  return (
    <Card className="py-4 px-4 gap-4">
      <div className="text-muted-foreground font-semibold">Links</div>
      <div className="flex flex-wrap gap-4">
        {socialEntries.map((store, idx) => (
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
