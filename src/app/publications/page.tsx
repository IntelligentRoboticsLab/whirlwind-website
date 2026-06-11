import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import PublicationCard from "@/components/site/PublicationCard";
import { publicationsByYear } from "@/lib/publications/publications";

export const metadata: Metadata = {
  title: "Publications | Team whIRLwind",
  description: "Papers, reports, and preprints from Team whIRLwind",
};

export default function PublicationsPage() {
  return (
    <div className="page-shell">
      <PageHero
        title={
          <>
            Papers, reports,
            <br />
            and qualification docs
          </>
        }
        description="Team reports, student theses, and technical papers from the team and the lab."
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
