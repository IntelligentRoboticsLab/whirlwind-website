import type { Metadata } from "next";
import Link from "next/link";
import BibtexButton from "@/components/BibtexButton";
import PdfButton from "@/components/PdfButton";
import { publicationsByYear } from "@/lib/publications/publications";

// Helper function to normalize publication types/tags for display
function formatPublicationType(type?: string): string {
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
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      )
      .join(" ");
  }

  return trimmed;
}

export const metadata: Metadata = {
  title: "Publications | Team whIRLwind",
  description: "Papers, reports, and preprints from Team whIRLwind.",
};

export default function PublicationsPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-32 sm:pt-12">
      <div className="mx-auto w-full max-w-[1120px] px-8 sm:px-10 lg:px-12 xl:px-4">
        <h1 className="mb-3 mt-0 text-[clamp(1.8rem,2.5vw,2.4rem)]">
          Publications
        </h1>
        <p className="mb-8 mt-0 text-(--ink-muted)">
          Research papers, technical reports, and theses from Team whIRLwind
          members (2021-2025).
        </p>

        {publicationsByYear.map((yearGroup) => (
          <div key={yearGroup.year} className="year-group mb-12">
            <h2 className="mb-6 font-semibold text-[2rem] text-(--ink)">
              {yearGroup.year}
            </h2>

            <div className="ml-4 space-y-8">
              {yearGroup.publications.map((pub) => {
                const rawTags = [pub.type, ...pub.tags].filter(
                  (tag): tag is string => Boolean(tag),
                );
                const formattedTags = Array.from(
                  new Set(
                    rawTags
                      .map((tag) => formatPublicationType(tag))
                      .filter((tag) => Boolean(tag)),
                  ),
                );

                return (
                  <div key={pub.id} className="space-y-3">
                    <Link
                      href={pub.file}
                      target={
                        pub.file.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        pub.file.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="pub-title-link block text-[1.25rem] font-semibold transition-colors duration-200"
                    >
                      {pub.title}
                    </Link>

                    <p className="text-(--ink-dim)">{pub.authors.join(", ")}</p>

                    {formattedTags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {formattedTags.map((tag) => (
                          <span
                            key={`${pub.id}-${tag}`}
                            className="rounded-full border border-[rgba(96,165,250,0.2)] bg-[linear-gradient(90deg,rgba(96,165,250,0.12),rgba(96,165,250,0.06))] px-2.5 py-1 text-[0.85rem] text-(--ink-dim)"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-nowrap items-center gap-3 justify-start sm:flex-wrap">
                      <PdfButton publication={pub} />
                      <BibtexButton publication={pub} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
