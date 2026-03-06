import { ReactNode } from "react";

interface Props {
  items: string[];
  itemClass?: string;
  parentCallbackOverride?: (
    item: string,
    idx: number,
    children: ReactNode,
  ) => ReactNode;
}

export default function CommaSeparatedList({
  items,
  itemClass,
  parentCallbackOverride,
}: Props) {
  return (
    <div className="flex flex-wrap gap-x-1">
      {items.map((item, idx) => {
        const content = (
          <>
            <span className={itemClass}>{item}</span>
            {idx !== items.length - 1 ? <span>, </span> : null}
          </>
        );

        return (
          <div key={idx}>
            {parentCallbackOverride ? (
              parentCallbackOverride(item, idx, content)
            ) : (
              <div>{content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
