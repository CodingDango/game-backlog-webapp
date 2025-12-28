import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export default function AppSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/search?q=${query}`);
  };

  return (
    <InputGroup>
      <InputGroupInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search games by title"
      />
      <InputGroupAddon align={"inline-end"}>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
