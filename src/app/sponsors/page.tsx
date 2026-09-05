import type { Metadata } from "next";

import Figure from "@/components/Figure";
import Name from "@/components/Name";
import Opener from "@/components/Opener";
import { photo } from "@/lib/photos";
import { siteContact, sponsors } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "The organisations that support whIRLwind, and how to become one of them.",
};

const host = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function SponsorsPage() {
  return (
    <div className="page">
      <section className="container opening" aria-label="Introduction">
        <div className="opening__text">
          <h1 className="t-title">Sponsors</h1>
          <p className="t-lede">
            The organisations that support <Name />. They keep the robots
            running and get us to competitions.
          </p>
        </div>
      </section>

      <section className="container section" aria-labelledby="sponsors-heading">
        <Opener
          id="sponsors-heading"
          title="Supported by"
          artwork="k1-body"
          at={30}
        />
        <ul className="sponsor-list">
          {sponsors.map((sponsor) => (
            <li key={sponsor.name} className="sponsor-row">
              <a
                className="sponsor sponsor--row"
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={sponsor.name}
                style={{
                  ["--logo" as string]: `url(${sponsor.logo.src})`,
                  aspectRatio: `${sponsor.logoWidth} / ${sponsor.logoHeight}`,
                }}
              />
              <div className="sponsor-row__text">
                <a
                  className="t-subheading"
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {sponsor.name}
                </a>
                <span className="t-meta">{host(sponsor.website)}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container section" aria-labelledby="become-heading">
        <div className="stack">
          <h2 id="become-heading" className="t-heading">
            Become a sponsor
          </h2>
          <p className="t-body">
            Robots, spare parts and travel to competitions are what a student
            team spends its money on. If your organisation wants to be part of
            that, email us. We can figure out a sponsorship that fits.
          </p>
          <p className="t-body">
            <a className="button" href={`mailto:${siteContact.email}`}>
              <span>Email us</span>
            </a>
          </p>
        </div>
        {/* what a sponsor gets: the placements on the back of the jersey */}
        <Figure
          src={photo("2026-03-German-Open/74-DSC09320.jpg").src}
          alt="The back of a whIRLwind jersey with the sponsor logos printed across the shoulders."
          caption="Sponsor placements on the back of the jersey. RoboCup German Open, Cologne, March 2026."
          sizes="(max-width: 80rem) 100vw, 72rem"
        />
      </section>
    </div>
  );
}
