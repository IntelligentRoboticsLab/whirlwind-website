import type { ReactNode } from "react";

import Mark from "./Mark";

// A meta line: items joined by the mark as interpunct (DESIGN.md, section 3).
export default function MetaLine({
  items,
  className = "",
}: {
  items: ReactNode[];
  className?: string;
}) {
  const shown = items.filter((item) => item !== null && item !== undefined && item !== "");
  return (
    <p className={`t-meta meta-dots ${className}`}>
      {shown.map((item, i) => (
        <span key={i} className="meta-dots__item" style={{ display: "contents" }}>
          {i > 0 ? <Mark className="dot" height={10} /> : null}
          <span>{item}</span>
        </span>
      ))}
    </p>
  );
}
