import Image from "next/image";
import Link from "next/link";

import type { Sponsor } from "@/lib/site-content";
import SiteIcon from "./site/SiteIcon";

function formatWebsite(url?: string): string | null {
  if (!url) return null;
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

type SponsorCardProps = {
  sponsor: Sponsor;
};

export default function SponsorCard({ sponsor }: SponsorCardProps) {
  const logoMaxWidth = sponsor.logoMaxWidth ?? "240px";
  const logoDisplayHeight = sponsor.logoDisplayHeight ?? "80px";
  const imageStyle = {
    width: "auto" as const,
    maxWidth: logoMaxWidth,
    height: logoDisplayHeight,
  };
  const hasDetails = Boolean(sponsor.contribution);

  return (
    <article className="sponsor-card">
      <div className="sponsor-card__media">
        <div className="sponsor-card__logo">
          <Image
            src={sponsor.logo}
            alt={sponsor.logoAlt ?? `${sponsor.name} logo`}
            width={sponsor.logoWidth}
            height={sponsor.logoHeight}
            sizes="(min-width: 768px) 280px, 70vw"
            className="object-contain"
            style={imageStyle}
          />
        </div>

        <div className="sponsor-card__meta">
          <h3>{sponsor.name}</h3>
          {formatWebsite(sponsor.website) && (
            <Link
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="sponsor-card__link"
            >
              <span>{formatWebsite(sponsor.website)}</span>
              <SiteIcon name="arrow-up-right" size={16} />
            </Link>
          )}
        </div>
      </div>

      {hasDetails ? (
        <div className="sponsor-card__details">
          {sponsor.contribution ? <p>{sponsor.contribution}</p> : null}
        </div>
      ) : null}
    </article>
  );
}
