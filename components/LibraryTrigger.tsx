import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types";
import { forwardRef } from "react";

interface Props {
  gameCategory: Category | undefined;
}

const LibraryTrigger = forwardRef<HTMLButtonElement, Props>(
  ({ gameCategory, ...props }, ref) => (
    <>
      {!gameCategory ? (
        <Button
          {...props}
          ref={ref}
          size={"lg"}
          className="w-full flex justify-start"
        >
          <Plus /> Add to library
        </Button>
      ) : (
        <Button
          {...props}
          ref={ref}
          size={"lg"}
          className="w-full flex justify-start capitalize"
        >
          <ChevronDown /> {gameCategory}
        </Button>
      )}
    </>
  )
);

LibraryTrigger.displayName = "LibraryTrigger";

export default LibraryTrigger;
