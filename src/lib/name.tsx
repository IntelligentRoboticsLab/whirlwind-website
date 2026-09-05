import type { ReactNode } from "react";

import Name from "@/components/Name";

// Renders a string with every "whIRLwind" carrying the orange IRL
// (DESIGN.md, section 3). For text that arrives as data: titles, bylines.
export function withName(text: string): ReactNode {
  const parts = text.split("whIRLwind");
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) => (i === 0 ? [part] : [<Name key={i} />, part]));
}

// Same, for rendered HTML: only text nodes are touched, never tags or attributes.
export function markNameInHtml(html: string): string {
  return html.replace(/>([^<]*)</g, (_, text: string) =>
    ">" + text.replaceAll("whIRLwind", 'wh<span class="irl">IRL</span>wind') + "<",
  );
}
