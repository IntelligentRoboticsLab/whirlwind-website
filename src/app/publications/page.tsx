import type { Metadata } from "next";

import Opener from "@/components/Opener";
import BibtexButton from "@/components/BibtexButton";
import { formatDate } from "@/lib/format";
import { withName } from "@/lib/name";
import { formatPublicationType } from "@/lib/publications/helpers";
import { publicationsByYear } from "@/lib/publications/publications";
import type { ArtworkName } from "@/lib/artwork";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Papers, theses, team reports and qualification documents from whIRLwind and the Dutch Nao Team before it.",
};

const openers: Record<
  string,
  {
    artwork: ArtworkName;
    at: number;
    height?: string;
    second?: { artwork: ArtworkName; at: number; height?: string };
  }
> = {
  "2026": {
    artwork: "k1-kick-contact",
    at: 66,
    second: { artwork: "k1-keeper-arms", at: 32 },
  },
  "2025": { artwork: "k1-fallen-front", at: 52, height: "3.5rem" },
};

export default function PublicationsPage() {
  return (
    <div className="page">
      <section className="container opening" aria-label="Introduction">
        <div className="opening__text">
          <h1 className="t-title">Publications</h1>
          <p className="t-lede">
            Papers, theses, team reports and qualification documents, by year. If you would like to cite us, we make it easy with a BibTeX entry for each publication.
          </p>
        </div>
      </section>

      {publicationsByYear.map((group) => {
        // the two most recent years open with robots on the rule: the kick at contact
        // and the keeper facing it, and one that fell over (DESIGN.md, section 8)
        const opener = openers[group.year];
        return (
          <section
            key={group.year}
            className="container pub-year"
            aria-labelledby={`year-${group.year}`}
          >
            {opener ? (
              <Opener
                id={`year-${group.year}`}
                title={String(group.year)}
                {...opener}
              />
            ) : (
              <h2 id={`year-${group.year}`} className="t-heading">
                {group.year}
              </h2>
            )}
            <ul className="pubs">
              {group.publications.map((pub) => {
                const external = pub.file.startsWith("http");
                return (
                  <li key={pub.id} className="pub">
                    <h3 className="t-subheading pub__title">
                      {withName(pub.title)}
                    </h3>
                    <p className="t-body">{pub.authors.join(", ")}</p>
                    <p className="t-meta">
                      {formatPublicationType(pub.type)}, {formatDate(pub.date)}
                      {pub.tags.length ? `. ${pub.tags.join(", ")}` : ""}
                    </p>
                    <div className="pub__links t-body">
                      <a
                        href={pub.file}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                      >
                        PDF
                      </a>
                      <BibtexButton publication={pub} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
