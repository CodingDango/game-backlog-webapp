import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Store } from "./types";

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

export function formatDate(dateString: string): string {
  if (!dateString) return '';

  const options: Intl.DateTimeFormatOptions = { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  };

  const date = new Date(dateString + 'T00:00:00');

  return date.toLocaleDateString('en-US', options);
}

export function keyByMap(array: any[], key: string) {
  return array.reduce((map, item) => {
    const keyForMap = item[key];
    map.set(keyForMap, item);
    return map;
  }, new Map());
}

export const getStoreUrl = (store: Store, gameName: string) => {
  const encodedName = encodeURIComponent(gameName);

  switch (store.slug) {
    case "steam":
      return `https://store.steampowered.com/search/?term=${encodedName}`;
    case "playstation-store":
      return `https://store.playstation.com/search/${encodedName}`;
    case "xbox-store":
      return `https://www.xbox.com/search?q=${encodedName}`;
    case "epic-games":
      return `https://store.epicgames.com/browse?q=${encodedName}`;
    case "gog":
      return `https://www.gog.com/en/games?query=${encodedName}`;
    case "nintendo":
      return `https://www.nintendo.com/search/#q=${encodedName}`;
    default:
      // Fallback to Google if it's some obscure store
      const query = encodeURIComponent(`${gameName} ${store.name}`);
      return `https://www.google.com/search?q=${query}`;
  }
};