import { ChevronDown, Plus } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Category } from "@/types/types";
import { forwardRef } from "react";
import AppButton from "./AppButton";

interface Props extends ButtonProps {
  gameCategory?: Category;
  isAdding?: boolean;
}

const LibraryTrigger = forwardRef<HTMLButtonElement, Props>(
  ({ gameCategory, isAdding = false, ...props }, ref) => (
    <>
      {!gameCategory ? (
        <AppButton
          {...props}
          ref={ref}
          className="w-full flex justify-start"
          isLoading={isAdding}
          icon={<Plus />}
        >
          Add to library
        </AppButton>
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
