import { Layers } from "lucide-react";

interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({ className }: BrandLogoProps) {
  return <Layers className={className} />;
}
