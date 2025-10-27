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
    <section className="page">
      <div className="container">
        <h1>Publications</h1>
        <p className="lead">
          Research papers, technical reports, and theses from Team whIRLwind
          members (2021-2025).
        </p>

        {publicationsByYear.map((yearGroup, _index) => (
          <div
            key={yearGroup.year}
            className="year-group"
            style={{ marginBottom: "3rem" }}
          >
            <h2
              style={{
                fontSize: "2rem",
                marginBottom: "1.5rem",
                color: "var(--ink)",
                fontWeight: "600",
              }}
            >
              {yearGroup.year}
            </h2>

            <div style={{ marginLeft: "1rem" }}>
              {yearGroup.publications.map((pub) => (
                <div key={pub.id} style={{ marginBottom: "2rem" }}>
                  <Link
                    href={pub.file}
                    target={pub.file.startsWith("http") ? "_blank" : undefined}
                    rel={
                      pub.file.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "var(--ink)",
                      textDecoration: "none",
                      display: "block",
                      marginBottom: "0.5rem",
                      transition: "color 0.2s ease",
                    }}
                    className="pub-title-link"
                  >
                    {pub.title}
                  </Link>

                  <p
                    style={{
                      color: "var(--ink-dim)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {pub.authors.join(", ")}
                  </p>

                  {pub.tags && pub.tags.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            display: "inline-block",
                            fontSize: "0.85rem",
                            color: "var(--ink-dim)",
                            background:
                              "linear-gradient(90deg, rgba(96, 165, 250, 0.12), rgba(96, 165, 250, 0.06))",
                            border: "1px solid rgba(96, 165, 250, 0.2)",
                            padding: "0.25rem 0.6rem",
                            borderRadius: "9999px",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "0.5rem" }}>
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
