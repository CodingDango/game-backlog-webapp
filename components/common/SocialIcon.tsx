import React from 'react';

import { 
  SiSteam, 
  SiPlaystation, 
  SiEpicgames, 
  SiGogdotcom, 
  SiNintendoswitch, 
  SiReddit, 
  SiMetacritic,
  SiYoutube,
  SiFacebook,
  SiApple,
  SiAndroid
} from "react-icons/si";
import { FaXbox, FaApple } from "react-icons/fa";
import { TbView360Number } from "react-icons/tb";
import { Globe } from "lucide-react"; // Generic fallback

interface Props {
  slug: string; // Keep this string so it accepts raw data from API
  className?: string; // Good to allow styling from outside
}

const icons: Record<string, React.ElementType> = {
  "steam": SiSteam,
  "playstation-store": SiPlaystation,
  "xbox-store": FaXbox, 
  "xbox360": TbView360Number, 
  "xbox-one": FaXbox,
  "epic-games": SiEpicgames,
  "gog": SiGogdotcom,
  "nintendo": SiNintendoswitch,
  "app-store": SiApple,
  "google-play": SiAndroid,
  'apple-appstore': FaApple,
  
  // Socials
  "reddit": SiReddit,
  "metacritic": SiMetacritic,
  "youtube": SiYoutube,
  "facebook": SiFacebook,
  "official-website" : Globe
};

const brandColors: Record<string, string> = {
  // Stores
  "steam": "#1b2838",           // Dark Navy
  "playstation-store": "#00439c", // PS Blue
  "xbox-store": "#107c10",      // Xbox Green
  "xbox360": "#107c10",
  "xbox-one": "#107c10",
  "epic-games": "#313131",      // Epic Dark Grey
  "gog": "#8e44ad",             // GOG Purple
  "nintendo": "#e60012",        // Nintendo Red
  "app-store": "#000000",       // Apple Black
  "google-play": "#00865f",     // Android Green
  "itch": "#fa5c5c",            // Itch Red/Pink
  'apple-appstore': 'var(--color-zinc-900)',

  // Socials
  "reddit": "#ff4500",          // Reddit Orange
  "metacritic": "#333333",      // Metacritic (Dark Grey looks better with white text than their Yellow)
  "youtube": "#ff0000",         // YouTube Red
  "facebook": "#1877f2",        // FB Blue
  "twitter": "#000000",         // X Black
  "official-website": "#4b5563",         // Generic Grey (Tailwind gray-600)
};

export default function SocialIcon({ slug, className }: Props) {
  const IconComponent = icons[slug];

  return (
    <IconComponent className={className}/>
  );
}

export function isSocialInRecords(slug: string): boolean {
  return Boolean(icons[slug]);
}

// Helper function to safely get color (defaults to grey if unknown)
export const getBrandColor = (slug: string) => {
  return brandColors[slug] || "#4b5563"; // Fallback grey
};