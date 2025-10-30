import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import GitHubLogo from "@/assets/socials/github.svg";
import InstagramLogo from "@/assets/socials/instagram.svg";
import LinkedInLogo from "@/assets/socials/linkedin.svg";

export const metadata: Metadata = {
  title: "Socials — Team whIRLwind",
  description: "Follow Team whIRLwind across the web.",
};

type SocialChannel = {
  name: string;
  url: string;
  handle?: string;
  logo: StaticImageData;
  logoAlt: string;
  description: string;
};

const socialChannels: SocialChannel[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/whirlwind-amsterdam/",
    handle: "whIRLwind Amsterdam",
    logo: LinkedInLogo,
    logoAlt: "LinkedIn logo",
    description: "Announcements, partnerships, and team stories.",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/teamwhirlwind",
    handle: "@teamwhirlwind",
    logo: InstagramLogo,
    logoAlt: "Instagram logo",
    description: "Travel stories and day-to-day progress from the team.",
  },
  {
    name: "GitHub",
    url: "https://github.com/IntelligentRoboticsLab",
    handle: "Intelligent Robotics Lab",
    logo: GitHubLogo,
    logoAlt: "GitHub logo",
    description: "Code releases, tools, and research repos.",
  },
];

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}

export default function SocialsPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-32 sm:pt-12">
      <div className="mx-auto w-full max-w-[1120px] px-8 sm:px-10 lg:px-12 xl:px-4">
        <h1 className="mb-3 mt-0 text-[clamp(1.8rem,2.5vw,2.4rem)]">Socials</h1>
        <div className="social-grid">
          {socialChannels.map((platform) => {
            const isExternal = isExternalUrl(platform.url);
            return (
              <Link
                key={platform.name}
                href={platform.url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="social-card"
                aria-label={`Open ${platform.name}`}
              >
                <div className="social-card__header">
                  <Image
                    src={platform.logo}
                    alt={platform.logoAlt}
                    width={42}
                    height={42}
                    className="social-card__logo"
                  />
                  <div className="social-card__heading">
                    <h3 className="social-card__name">{platform.name}</h3>
                    {platform.handle && (
                      <p className="social-card__handle">{platform.handle}</p>
                    )}
                  </div>
                </div>

                <p className="social-card__description">
                  {platform.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
