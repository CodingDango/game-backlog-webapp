import RatingSelector from "./Rating";
import { Card } from "./ui/card";

export default function CommunityRating() {
  return (
    <Card className="flex flex-row justify-between items-center gap-2 h-13">
      <span className="font-medium">Community</span>
      <RatingSelector readOnly value={4} starSize={20}/>
    </Card>
  )
}
