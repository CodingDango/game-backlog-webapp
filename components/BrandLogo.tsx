import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface BrandLogoProps {
  cardClass?: string;
  iconClass?: string;
  iconWidth?: number;
  iconHeight?: number;
}

export default function BrandLogo({
  cardClass,
  iconClass,
  iconWidth,
  iconHeight,
}: BrandLogoProps) {
  return (
    <Card className={cn("rounded-xl", cardClass)}>
      <Image
        src={"/brand-icon.svg"}
        width={iconWidth ?? 20}
        height={iconHeight ?? 20}
        alt="brand icon"
        className={cn("scale-250", iconClass)}
      />
    </Card>
  );
}
