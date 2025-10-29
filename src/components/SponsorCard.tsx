import Image from "next/image";
import Link from "next/link";

export type Sponsor = {
  name: string;
  website?: string;
  contribution?: string;
  notes?: string;
  logo?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoMaxWidth?: string;
  logoDisplayHeight?: string;
  captionGapClass?: string;
  logoWrapperClassName?: string;
};

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
  const captionGapClass = sponsor.captionGapClass ?? "gap-3";
  const logoWrapperRestClass =
    sponsor.logoWrapperClassName ??
    "justify-start px-4 py-4 bg-white shadow-sm border border-[rgba(255,255,255,0.12)]";
  const imageStyle = {
    width: "auto" as const,
    maxWidth: logoMaxWidth,
    height: logoDisplayHeight,
  };
  const hasDetails = Boolean(sponsor.contribution || sponsor.notes);
  const captionClass = [
    "flex flex-col items-start text-center",
    captionGapClass,
  ].join(" ");
  const logoWrapperClass = [
    "flex shrink-0 items-center rounded-xl",
    logoWrapperRestClass,
  ].join(" ");
  const cardClasses = [
    "flex flex-col items-start gap-4",
    hasDetails ? "sm:flex-row sm:items-start sm:gap-8 sm:flex-1" : "",
  ].join(" ");

  return (
    <div className={cardClasses}>
      <div className={captionClass}>
        {sponsor.logo && sponsor.logoWidth && sponsor.logoHeight && (
          <div className={logoWrapperClass}>
            <Image
              src={sponsor.logo}
              alt={sponsor.logoAlt ?? `${sponsor.name} logo`}
              width={sponsor.logoWidth ?? 200}
              height={sponsor.logoHeight ?? 80}
              sizes="(min-width: 640px) 280px, 60vw"
              className="object-contain"
              style={imageStyle}
            />
          </div>
        )}

        {formatWebsite(sponsor.website) && sponsor.website && (
          <Link
            href={sponsor.website}
            target={sponsor.website.startsWith("http") ? "_blank" : undefined}
            rel={
              sponsor.website.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            className="self-center text-[0.85rem] uppercase tracking-wide text-(--ink-muted) transition-colors duration-200 hover:text-(--orange-400)"
          >
            {formatWebsite(sponsor.website)}
          </Link>
        )}
      </div>

      {hasDetails && (
        <div className="space-y-3 sm:flex-1">
          {sponsor.contribution && (
            <p className="max-w-3xl text-[0.95rem] text-(--ink-dim)">
              {sponsor.contribution}
            </p>
          )}

          {sponsor.notes && (
            <p className="text-[0.9rem] text-(--ink-muted)">{sponsor.notes}</p>
          )}
        </div>
      )}
    </div>
  );
}
