import { publicationsByYear } from "./publications";
import type { IPublication } from "./publication";

export function formatPublicationType(type?: string): string {
  if (!type) return "";

  const trimmed = type.trim();
  if (!trimmed) return "";

  const normalized = trimmed.toLowerCase();

  const typeMap: Record<string, string> = {
    article: "Journal Article",
    book: "Book",
    booklet: "Booklet",
    bsc: "Bachelor Thesis",
    conference: "Conference Paper",
    inbook: "Book Chapter",
    incollection: "Collection Article",
    inproceedings: "Conference Paper",
    manual: "Manual",
    mastersthesis: "Master's Thesis",
    msc: "Master Thesis",
    misc: "Miscellaneous",
    phdthesis: "PhD Thesis",
    proceedings: "Proceedings",
    teamreport: "Team Report",
    techreport: "Technical Report",
    unpublished: "Unpublished",
  };

  if (typeMap[normalized]) {
    return typeMap[normalized];
  }

  if (trimmed.includes("-") || trimmed.includes("_")) {
    const segments = trimmed.split(/[-_]/).filter(Boolean);

    return segments
      .map(
        (segment) =>
          segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase(),
      )
      .join(" ");
  }

  if (trimmed === trimmed.toUpperCase()) {
    return trimmed;
  }

  if (/^[a-z\s]+$/.test(trimmed)) {
    return trimmed
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return trimmed;
}

export function getPublicationCount(): number {
  return publicationsByYear.reduce(
    (count, group) => count + group.publications.length,
    0,
  );
}

export function getLatestPublications(limit: number): IPublication[] {
  return publicationsByYear
    .flatMap((group) => group.publications)
    .sort((left, right) => {
      const leftTime = new Date(left.date).getTime();
      const rightTime = new Date(right.date).getTime();

      return rightTime - leftTime;
    })
    .slice(0, limit);
}
