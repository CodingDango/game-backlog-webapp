import { useRouter } from "next/navigation";
import { useState } from "react";

import SearchInput from "./SearchInput";

export default function AppSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/search?q=${query}`);
  };

  return (
    <SearchInput
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      placeholder="Search games by title"
    />
  );
}
