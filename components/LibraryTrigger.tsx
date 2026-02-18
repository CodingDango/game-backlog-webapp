import { ChevronDown, Plus } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Category } from "@/types/types";
import { forwardRef } from "react";

interface Props extends ButtonProps {
  gameCategory?: Category;

}

const LibraryTrigger = forwardRef<HTMLButtonElement, Props>(
  ({ gameCategory, ...props }, ref) => (
    <>
      {!gameCategory ? (
        <Button
          {...props}
          ref={ref}
          className="w-full flex justify-start"
        >
          <Plus /> Add to library
        </Button>
      ) : (
        <Button
          {...props}
          ref={ref}
          className="w-full flex justify-start capitalize"
        >
          <ChevronDown /> {gameCategory}
        </Button>
      )}
    </>
  ),
);

LibraryTrigger.displayName = "LibraryTrigger";

export default LibraryTrigger;
