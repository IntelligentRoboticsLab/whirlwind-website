import type { Metadata } from "next";
import SponsorCard, { type Sponsor } from "@/components/SponsorCard";
import rerunLogo from "@/assets/sponsors/rerun.svg";
import startupVillageLogo from "@/assets/sponsors/startup_village.webp";
import uvaLogo from "@/assets/sponsors/uva.png";

export const metadata: Metadata = {
  title: "Sponsors — Team whIRLwind",
  description: "Our generous sponsors.",
};

type SponsorTier = {
  name: string;
  sponsors: Sponsor[];
};

const sponsorTiers: SponsorTier[] = [
  {
    name: "Premier Partner",
    sponsors: [
      {
        name: "Rerun",
        website: "https://rerun.io",
        logo: rerunLogo,
        logoAlt: "Rerun logo",
        logoWidth: 94,
        logoHeight: 28,
        logoMaxWidth: "420px",
        logoDisplayHeight: "96px",
        captionGapClass: "gap-2",
        logoWrapperClassName: "px-4 pt-2 pb-1",
      },
    ],
  },
  {
    name: "Supporting Partners",
    sponsors: [
      {
        name: "StartUp Village",
        website: "https://startupvillage.nl",
        logo: startupVillageLogo,
        logoAlt: "StartUp Village logo",
        logoWidth: 480,
        logoHeight: 242,
      },
      {
        name: "University of Amsterdam",
        website: "https://uva.nl",
        logo: uvaLogo,
        logoAlt: "University of Amsterdam logo",
        logoWidth: 480,
        logoHeight: 242,
      },
    ],
  },
];

export default function SponsorsPage() {
  return (
    <section className="page">
      <div className="container">
        <h1>Sponsors</h1>
        <p className="lead">
          These partners keep our robots rolling and make it possible to share
          the work beyond the lab.
        </p>

        <div className="space-y-12">
          {sponsorTiers.map((tier) => {
            const tierClasses = "sponsor-entry space-y-8";
            const rowClasses = [
              "flex flex-col gap-4",
              tier.sponsors.length > 1
                ? "sm:flex-row sm:flex-wrap sm:gap-6"
                : "",
            ].join(" ");

            return (
              <div key={tier.name} className={tierClasses}>
                <div className={rowClasses}>
                  {tier.sponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.name} sponsor={sponsor} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
