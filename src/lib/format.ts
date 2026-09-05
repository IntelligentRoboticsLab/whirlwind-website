// Dates are written "6 July 2026" (DESIGN.md, section 10).
export function formatDate(date: string | Date): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return String(date);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

export function formatMonthYear(date: string | Date): string {
  const parsed = new Date(date);
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(parsed);
}
