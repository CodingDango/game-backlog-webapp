import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { InputHTMLAttributes, DetailedHTMLProps } from "react";

export default function SearchInput(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) {
  return (
    <InputGroup>
      <InputGroupInput {...props} />
      <InputGroupAddon align={"inline-end"}>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
