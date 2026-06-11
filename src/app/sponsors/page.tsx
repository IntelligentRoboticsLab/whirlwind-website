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
            Who keeps us
            <br />
            on the field
          </>
        }
        description="The organisations that help us build the robots and get them to competitions."
        actions={
          <LinkButton
            href="/contact"
            label="Become a sponsor"
            variant="primary"
          />
        }
        aside={
          <div className="page-note">
            <p>What it covers</p>
            <h2>Hardware, travel, tooling, and the lab space.</h2>
            <span>Running a competition team adds up quickly.</span>
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
            <span className="section-intro__eyebrow">Sponsor us</span>
            <h2 className="contact-banner__title">
              Want to <span>sponsor?</span>
            </h2>
            <p className="contact-banner__description">
              Email us. We can figure out a sponsorship that fits.
            </p>
          </div>
          <div className="contact-banner__actions">
            <LinkButton
              href="/contact"
              label="Start the conversation"
              variant="primary"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
