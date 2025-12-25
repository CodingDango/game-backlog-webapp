import { ReactNode } from "react";

interface Props {
  items: string[];
  itemClass?: string;
}

export default function CommaSeparatedList({ items, itemClass = '' }: Props) {
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item, idx) => (
        <div key={idx}>
          <span key={idx} className={itemClass}>{item}</span>
          {idx !== items.length - 1 ? <span>, </span> : null}
        </div>
      ))}
    </div>
  );
}
