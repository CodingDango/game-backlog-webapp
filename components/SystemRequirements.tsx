import { PCRequirements } from "@/lib/types";

export default function SystemRequirements({
  requirements,
}: {
  requirements: PCRequirements;
}) {
  const { minimum, recommended, rawMinimumText, rawRecommendedText } =
    requirements;

  debugger;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-2">Minimum:</div>
        {minimum ? (
          <div className="text-sm space-y-1">
            <div className="text-muted-foreground flex gap-2">
              <span className="">OS:</span>{" "}
              <span className="text-primary line-clamp-2">
                {minimum.os || recommended?.os}
              </span>
            </div>
            <div className="text-muted-foreground flex gap-2">
              <span className="">Processor:</span>{" "}
              <span className="text-primary line-clamp-2">
                {minimum.processor || recommended?.processor}
              </span>
            </div>
            <div className="text-muted-foreground flex gap-2">
              <span className="">Memory:</span>{" "}
              <span className="text-primary line-clamp-2">
                {minimum.memory || recommended?.memory}
              </span>
            </div>
            <div className="text-muted-foreground flex gap-2">
              <span className="">Graphics:</span>{" "}
              <span className="text-primary line-clamp-2">
                {minimum.gpu || recommended?.gpu}
              </span>
            </div>
            <div className="text-muted-foreground flex gap-2">
              <span className="">Storage:</span>{" "}
              <span className="text-primary line-clamp-2">
                {minimum.storage || recommended?.storage}
              </span>
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground">
            {rawMinimumText || "None listed"}
          </span>
        )}
      </div>

      <div>
        <div className="mb-2">Recommended:</div>
        {recommended ? (
          <div className="text-sm gap-y-1">
            <div className="text-sm space-y-1">
              <div className="text-muted-foreground flex gap-2">
                <span className="">OS:</span>{" "}
                <span className="text-primary line-clamp-2">
                  {recommended.os || minimum?.os}
                </span>
              </div>
              <div className="text-muted-foreground flex gap-2">
                <span className="">Processor: </span>
                <span className="text-primary line-clamp-2">
                  {recommended.processor || minimum?.processor}
                </span>
              </div>
              <div className="text-muted-foreground flex gap-2">
                <span className="">Memory: </span>
                <span className="text-primary line-clamp-2">
                  {recommended.memory || minimum?.memory}
                </span>
              </div>
              <div className="text-muted-foreground flex gap-2">
                <span className="">Graphics: </span>
                <span className="text-primary line-clamp-2">
                  {recommended.gpu || minimum?.gpu}
                </span>
              </div>
              <div className="text-muted-foreground flex gap-2">
                <span className="">Storage: </span>
                <span className="text-primary line-clamp-2">
                  {recommended.storage || minimum?.storage}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground">
            {rawRecommendedText || "None listed"}
          </span>
        )}
      </div>
    </div>
  );
}
