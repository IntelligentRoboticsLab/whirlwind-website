import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sponsors — Team whIRLwind",
  description: "Our generous sponsors.",
};

type Sponsor = {
  name: string;
  website?: string;
  contribution?: string;
  notes?: string;
  logo?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
};

// TODO: replace placeholder data with the team's actual sponsors when ready.
const sponsors: Sponsor[] = [
  {
    name: "Rerun",
    website: "https://rerun.io",
    logo: "/sponsors/rerun.svg",
    logoAlt: "Rerun logo",
    logoWidth: 94,
    logoHeight: 28,
  },
  {
    name: "StartUp Village",
    website: "https://startupvillage.nl",
    logo: "/sponsors/startup_village.webp",
    logoAlt: "StartUp Village logo",
    logoWidth: 1500,
    logoHeight: 756,
  },
];

function formatWebsite(url?: string): string | null {
  if (!url) return null;
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

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
          {sponsors.map((sponsor) => {
            const isRerun = sponsor.name === "Rerun";
            const imageStyle = {
              width: "auto" as const,
              maxWidth: isRerun ? "420px" : "240px",
              height: isRerun ? "96px" : "80px",
            };
            const hasDetails = Boolean(
              sponsor.contribution || sponsor.notes,
            );
            const captionClass = [
              "flex flex-col items-center text-center",
              isRerun ? "gap-2" : "gap-3",
            ].join(" ");
            const logoWrapperClass = [
              "flex shrink-0 items-center justify-center rounded-xl",
              isRerun
                ? "px-4 pt-2 pb-1"
                : "px-4 py-4 bg-white shadow-sm border border-[rgba(255,255,255,0.12)]",
            ].join(" ");

            return (
              <div
                key={sponsor.name}
                className="sponsor-entry space-y-6"
              >
                <div
                  className={[
                    "flex flex-col gap-6 sm:gap-10",
                    hasDetails ? "sm:flex-row sm:items-start" : "items-start",
                  ].join(" ")}
                >
                  <div className={captionClass}>
                    {sponsor.logo &&
                      sponsor.logoWidth &&
                      sponsor.logoHeight && (
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
                        target={
                          sponsor.website.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          sponsor.website.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-[0.85rem] uppercase tracking-wide text-(--ink-muted) transition-colors duration-200 hover:text-(--orange-400)"
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
                        <p className="text-[0.9rem] text-(--ink-muted)">
                          {sponsor.notes}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
