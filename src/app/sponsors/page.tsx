import type { Metadata } from "next";
import LinkButton from "@/components/LinkButton";
import SponsorCard from "@/components/SponsorCard";
import PageHero from "@/components/site/PageHero";
import { sponsorTiers } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Sponsors | Team whIRLwind",
  description: "Organisations supporting Team whIRLwind.",
};

export default function SponsorsPage() {
  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Partners"
        title={
          <>
            Backing the robots,
            <br />
            the travel, and the <span>team.</span>
          </>
        }
        description="These organisations make it possible to build, test, travel, and present the work beyond the lab."
        metrics={[
          { label: "Partner tiers", value: `${sponsorTiers.length}` },
          {
            label: "Current partners",
            value: `${sponsorTiers.reduce((sum, tier) => sum + tier.sponsors.length, 0)}`,
          },
          { label: "Base", value: "Amsterdam" },
        ]}
        actions={
          <LinkButton href="/contact" label="Become a sponsor" variant="primary" />
        }
        aside={
          <div className="page-note">
            <p>Why it matters</p>
            <h2>Competitions reward reliable systems, not isolated prototypes.</h2>
            <span>
              Sponsorship helps cover hardware, travel, tooling, and the space
              to keep iterating.
            </span>
          </div>
        }
      />

      <section className="site-section site-section--tight-top">
        <div className="site-container sponsor-tier-grid">
          {sponsorTiers.map((tier) => (
            <section key={tier.name} className="tier-block tier-block--page">
              <div className="tier-block__heading">
                <p>{tier.name}</p>
                <span>{tier.description}</span>
              </div>
              <div className="tier-block__cards">
                {tier.sponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.name} sponsor={sponsor} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="site-section site-section--deep">
        <div className="site-container contact-banner">
          <div>
            <span className="section-intro__eyebrow">Support the project</span>
            <h2 className="contact-banner__title">
              Interested in backing
              <br />
              the next <span>competition season?</span>
            </h2>
            <p className="contact-banner__description">
              Tell us what kind of collaboration you have in mind and we will
              route it to the right people inside the team.
            </p>
          </div>
          <div className="contact-banner__actions">
            <LinkButton href="/contact" label="Start the conversation" variant="primary" />
          </div>
        </div>
      </section>
    </div>
  );
}
