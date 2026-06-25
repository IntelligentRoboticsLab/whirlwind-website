import type { Metadata } from "next";
import Image from "next/image";
import LinkButton from "@/components/LinkButton";
import SponsorCard from "@/components/SponsorCard";
import PageHero from "@/components/site/PageHero";
import { sponsors } from "@/lib/site-content";
import jerseyPhoto from "@/assets/photos/2026-03-German-Open/74-DSC09320.jpg";

export const metadata: Metadata = {
  title: "Sponsors | Team whIRLwind",
  description: "Organisations supporting Team whIRLwind.",
};

export default function SponsorsPage() {
  return (
    <div className="page-shell">
      <PageHero
        title="Our sponsors"
        description="The organisations that keep whIRLwind running, from hardware to travel."
        aside={
          <figure className="page-hero__photo">
            <Image
              src={jerseyPhoto}
              alt="Back of a whIRLwind jersey showing the sponsor placements."
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 28vw"
              className="media-panel__image"
            />
          </figure>
        }
      />

      <section className="site-section site-section--tight-top">
        <div className="site-container sponsor-grid">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} />
          ))}
        </div>
      </section>

      <section className="site-section site-section--deep">
        <div className="site-container contact-banner">
          <div>
            <h2 className="contact-banner__title">
              Want to become a sponsor?
            </h2>
            <p className="contact-banner__description">
              Email us. We can figure out a sponsorship that fits.
            </p>
          </div>
          <div className="contact-banner__actions">
            <LinkButton
              href="/contact"
              label="Email us"
              variant="primary"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
