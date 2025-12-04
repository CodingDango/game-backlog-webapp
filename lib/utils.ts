import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface MetascoreColor {
  bgCol: string;
  textCol: string;
  borderCol: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMetascoreColor(metascore: number): MetascoreColor {
  if (metascore >= 75) {
    return { bgCol: "bg-green-400", textCol: "text-green-400", borderCol: 'border-green-400'};
  } else if (metascore >= 50) {
    return { bgCol: "bg-yellow-400", textCol: "text-yellow-400", borderCol: 'border-yellow-400'};
  } else {
    return { bgCol: "bg-red-400", textCol: "text-red-400", borderCol: 'border-red-400'};
  }
}
