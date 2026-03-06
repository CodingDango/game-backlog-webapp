import RatingSelector from "../common/Rating";
import { Card } from "../ui/card";

export default function GameCommunityRating() {
  return (
    <Card className="flex flex-row justify-between items-center gap-2 h-13">
      <span className="font-semibold">Community</span>
      <RatingSelector readOnly value={4} starSize={20} />
    </Card>
  );
}
