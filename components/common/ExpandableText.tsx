import { Button } from "../ui/button";
import { ReactNode, useState, useRef, useEffect } from "react";

export default function ExpandableText({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        // max-h-56 is exactly 224px in Tailwind.
        // If the text inside is taller than 224px, we need the button.
        // This stops the button from disappearing when expanded.
        const isTooTall = contentRef.current.scrollHeight > 224;
        setShouldShowButton(isTooTall);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [children]);

  return (
    <div className="space-y-2">
      <div
        ref={contentRef}
        className={`relative overflow-hidden ${
          isExpanded ? "max-h-none" : "max-h-56"
        }`}
      >
        <div>{children}</div>

        {shouldShowButton && !isExpanded && (
          <div className="absolute bottom-0 left-0 h-32 w-full bg-linear-to-b from-transparent to-background pointer-events-none"></div>
        )}
      </div>

      {shouldShowButton && (
        <Button
          size={"sm"}
          className="text-sm"
          variant={"secondary"}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
}