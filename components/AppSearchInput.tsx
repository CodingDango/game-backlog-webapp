import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AppSearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/search?q=${query}`);
  };

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      className="px-4 py-4 rounded-2xl border-0 bg-card!"
      placeholder="Search games by title"
    />
  );
}
