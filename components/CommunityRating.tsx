import RatingSelector from "./Rating";
import { Card } from "./ui/card";

export default function CommunityRating() {
  return (
    <Card className="flex flex-row justify-between items-center gap-2 h-14">
      <div>Community</div>
      <RatingSelector readOnly value={4} starSize={20}/>
    </Card>
  )
}
