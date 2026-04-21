import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import PublicationCard from "@/components/site/PublicationCard";
import LinkButton from "@/components/LinkButton";
import { publicationsByYear } from "@/lib/publications/publications";
import { getPublicationCount } from "@/lib/publications/helpers";

export const metadata: Metadata = {
  title: "Publications | Team whIRLwind",
  description: "Papers, reports, and preprints from Team whIRLwind.",
};

export default function PublicationsPage() {
  const publicationCount = getPublicationCount();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Research archive"
        title={
          <>
            Papers, reports,
            <br />
            and <span>qualification docs.</span>
          </>
        }
        description="A running archive of team reports, theses, and technical publications tied to the work around the robots and the competitions."
        metrics={[
          { label: "Years covered", value: "2021-2026" },
          { label: "Items archived", value: `${publicationCount}` },
          { label: "Latest season", value: "2026" },
        ]}
        actions={
          <LinkButton href="/contact" label="Ask about the work" variant="secondary" />
        }
        aside={
          <div className="page-note">
            <p>Coverage</p>
            <h2>Student theses, technical reports, and competition papers.</h2>
            <span>Grouped by year and linked directly to the source files.</span>
          </div>
        }
      />

      <section className="site-section site-section--deep site-section--tight-top">
        <div className="site-container publication-year-list">
          {publicationsByYear.map((yearGroup) => (
            <section key={yearGroup.year} className="publication-year-block">
              <div className="publication-year-block__header">
                <p>{yearGroup.year}</p>
                <span>{yearGroup.publications.length} entries</span>
              </div>
              <div className="publication-year-block__grid">
                {yearGroup.publications.map((publication) => (
                  <PublicationCard
                    key={publication.id}
                    publication={publication}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
