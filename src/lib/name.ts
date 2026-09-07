// The team name, always with the IRL in orange (DESIGN.md, section 3). The
// <Name /> component renders it in templates; these two mark it in strings.

const NAME_HTML = 'wh<span class="irl">IRL</span>wind';

function escapeHtml(text: string): string {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

// HTML for a plain string with every "whIRLwind" carrying the orange IRL. For
// text that arrives as data: titles, bylines. Render it with set:html.
export function withName(text: string): string {
  return escapeHtml(text).replaceAll("whIRLwind", NAME_HTML);
}

// Same, for rendered HTML: only text nodes are touched, never tags or attributes.
export function markNameInHtml(html: string): string {
  return html.replace(/>([^<]*)</g, (_, text: string) => ">" + text.replaceAll("whIRLwind", NAME_HTML) + "<");
}
