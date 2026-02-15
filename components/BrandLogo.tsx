import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function BrandLogo() {
  return (
    <Card className="rounded-xl">
      <Image
        src={"/brand-icon.svg"}
        width={20}
        height={20}
        alt="brand icon"
        className="scale-250"
      />
    </Card>
  );
}
