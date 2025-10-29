import type { Metadata } from "next";
import Link from "next/link";
import BibtexButton from "@/components/BibtexButton";
import PdfButton from "@/components/PdfButton";
import { publicationsByYear } from "@/lib/publications/publications";

export const metadata: Metadata = {
  title: "Publications — Team whIRLwind",
  description: "Selected papers and preprints by Team whIRLwind.",
};

// Helper function to format publication type
function formatPublicationType(type?: string): string {
  if (!type) return "";

  const typeMap: Record<string, string> = {
    techreport: "Technical Report",
    mastersthesis: "Master's Thesis",
    misc: "Preprint",
    inproceedings: "Conference Paper",
    article: "Journal Article",
  };

  return typeMap[type] || type;
}

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

        {publicationsByYear.map((yearGroup, _index) => (
          <div key={yearGroup.year} className="year-group mb-12">
            <h2 className="mb-6 font-semibold text-[2rem] text-(--ink)">
              {yearGroup.year}
            </h2>

            <div className="ml-4 space-y-8">
              {yearGroup.publications.map((pub) => (
                <div key={pub.id} className="space-y-3">
                  <Link
                    href={pub.file}
                    target={pub.file.startsWith("http") ? "_blank" : undefined}
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

                  {pub.tags && pub.tags.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
