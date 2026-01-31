import { Frown } from "lucide-react";

export default function NotFoundCard() {
  return (
    <div className="w-full h-full rounded-md bg-secondary grid place-items-center text-muted-foreground">
      <Frown />
    </div>
  );
}