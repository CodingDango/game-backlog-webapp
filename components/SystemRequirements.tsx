import { PCRequirements } from "@/lib/types";

export default function SystemRequirements({
  requirements,
}: {
  requirements: PCRequirements;
}) {
  const { minimum, recommended, rawMinimumText, rawRecommendedText } =
    requirements;

    debugger

  return (
    <div className="grid grid-cols-2 gap-4 mt-1">
      <div>
        <div className="mb-1">Minimum:</div>
        {minimum ? (
          <div className="text-sm space-y-1">
            <div className="text-muted-foreground flex gap-2">
              OS: <span className="text-primary line-clamp-2">{minimum.os || recommended?.os}</span>
            </div>
            <div className="text-muted-foreground flex gap-2">
              Processor:{" "}
              <span className="text-primary line-clamp-2">{minimum.processor || recommended?.processor}</span>
            </div>
            <div className="text-muted-foreground flex gap-2">
              Memory: <span className="text-primary line-clamp-2">{minimum.memory || recommended?.memory}</span>
            </div>
            <div className="text-muted-foreground flex gap-2">
              Graphics: <span className="text-primary line-clamp-2">{minimum.gpu || recommended?.gpu}</span>
            </div>
            <div className="text-muted-foreground flex gap-2">
              Storage: <span className="text-primary line-clamp-2">{minimum.storage || recommended?.storage}</span>
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground">{rawMinimumText || 'None listed'}</span>
        )}
      </div>

      <div>
        <div className="mb-1">Recommended:</div>
        {recommended ? (
          <div className="text-sm gap-y-1">
            <div className="text-sm space-y-1">
              <div className="text-muted-foreground flex gap-2">
                OS: <span className="text-primary line-clamp-2">{recommended.os || minimum?.os}</span>
              </div>
              <div className="text-muted-foreground flex gap-2">
                Processor:{" "}
                <span className="text-primary line-clamp-2">{recommended.processor || minimum?.processor}</span>
              </div>
              <div className="text-muted-foreground flex gap-2">
                Memory:{" "}
                <span className="text-primary line-clamp-2">{recommended.memory || minimum?.memory}</span>
              </div>
              <div className="text-muted-foreground flex gap-2">
                Graphics:{" "}
                <span className="text-primary line-clamp-2">{recommended.gpu || minimum?.gpu}</span>
              </div>
              <div className="text-muted-foreground flex gap-2">
                Storage:{" "}
                <span className="text-primary line-clamp-2">{recommended.storage || minimum?.storage}</span>
              </div>
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground">{rawRecommendedText || 'None listed'}</span>
        )}
      </div>
    </div>
  );
}
