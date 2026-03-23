import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Store, SystemRequirements } from "../types/types";
import {   format, 
  isToday, 
  isYesterday, 
} from 'date-fns'

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
    return {
      bgCol: "bg-green-400",
      textCol: "text-green-400",
      borderCol: "border-green-400",
    };
  } else if (metascore >= 50) {
    return {
      bgCol: "bg-yellow-400",
      textCol: "text-yellow-400",
      borderCol: "border-yellow-400",
    };
  } else {
    return {
      bgCol: "bg-red-400",
      textCol: "text-red-400",
      borderCol: "border-red-400",
    };
  }
}

/**
 * Formats a date string into a readable format.
 * @param dateString - A date string in YYYY-MM-DD format (e.g., "2026-03-14")
 * @returns The formatted date string (e.g., "March 14, 2026")
 * @example
 * formatDate("2026-03-14") // "March 14, 2026"
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const date = new Date(dateString + "T00:00:00");

  return date.toLocaleDateString("en-US", options);
}

/**
 * Formats an ISO timestamp into a concise date format.
 * @param timestamp - A full ISO timestamp string with timezone info
 * @returns Date formatted as "MMM d, y" (e.g., "Mar 14, 2026")
 * @example
 * formatTimestamp("2026-03-14T09:08:15.789731+00:00") // "Mar 14, 2026"
 */
export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const formattedDate = format(date, 'MMM d, y');

  return formattedDate;
}

export function formatActivityTimestamp(date: Date | string) {
  const d = new Date(date);

  if (isToday(d)) {
    return `Today, ${format(d, "H:mm")}`;
  }

  if (isYesterday(d)) {
    return `Yesterday, ${format(d, "H:mm")}`;
  }

  return format(d, "MMM d, yyyy");
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

export function extractRequirements(
  rawString: string
): SystemRequirements | null {
  if (!rawString) return null;

  const results: Record<string, string> = {};

  // 1. Remove the annoying "Minimum:" or "Recommended:" prefix at the very start
  const cleanInput = rawString.replace(/^(Minimum|Recommended):\s*/i, "");

  // 2. Define the "Boundary" words.
  // We use these to know where one section ends and the next begins.
  const keywords = [
    "OS",
    "Processor",
    "CPU",
    "Memory",
    "RAM",
    "Graphics",
    "Video Card",
    "GPU",
    "Video Card Memory",
    "Storage",
    "Hard Disk Space",
    "Hard Drive",
    "Disk Space",
    "Sound Card",
    "Sound",
    "DirectX",
    "Additional Notes",
    "Other requirements",
    "Notes",
  ];

  // 3. The New Regex:
  // (Key): Matches one of our keywords followed by a colon
  // (Value): Captures everything UNTIL it sees another keyword followed by a colon
  const pattern = new RegExp(
    `(${keywords.join("|")}):\\s*([\\s\\S]*?)(?=\\s*(?:${keywords.join(
      "|"
    )}):|$)`,
    "gi"
  );

  const matches = cleanInput.matchAll(pattern);

  for (const match of matches) {
    const key = match[1].trim();
    const value = match[2].trim();
    results[key] = value;
  }

  try {
    return {
      os: (results["OS"] || "").split(",")[0].split("/")[0].trim(),
      processor: (results["Processor"] || results['CPU'] || "").split("/")[0].trim(),
      memory: results["Memory"] || "",
      gpu: (results["Graphics"] || results["GPU"] || results['Video Card'] || "").split("/")[0].trim(),
      storage: results["Storage"] || results["Hard Disk Space"] || results["Hard Drive"] || results["Disk Space"] || "",
      soundCard: results["Sound Card"] || results["Sound"] || "",
    };
  } catch (err) {
    return null;
  }
}

export function formatRawRequirements(text?: string): string {
  if (!text) return "";

  return text
    .replace(/^(Minimum|Recommended):?\s*/i, "")
    .replace(
      /(Additional Notes|Other requirements|Partner Requirements|Legal)[\s\S]*/i,
      ""
    )
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(
      /([a-z0-9])(Processor|Memory|Hard Disk|Graphics|Video Card|Sound|DirectX)/gi,
      "$1\n$2"
    )
    .trim();
}

export function toFormattedISO(date: Date): string {
  return date.toISOString().split('T')[0];
}