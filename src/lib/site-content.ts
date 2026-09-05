import type { StaticImageData } from "next/image";

import aufLogo from "@/assets/sponsors/auf-white.svg";
import rerunLogo from "@/assets/sponsors/rerun-wordmark-white.svg";
import startupVillageLogo from "@/assets/sponsors/startupvillage_logo_white.webp";
import uvaLogo from "@/assets/sponsors/uva.png";
import GitHubLogo from "@/assets/socials/github-mono.svg";
import InstagramLogo from "@/assets/socials/instagram-mono.svg";
import LinkedInLogo from "@/assets/socials/linkedin-mono.svg";

// Sponsor logos are white-on-transparent files; the footer renders them as
// single-colour shapes through a CSS mask (DESIGN.md, section 9).
export type Sponsor = {
  name: string;
  website: string;
  logo: StaticImageData;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
};

// Social logos are single-colour white files; the Team page renders them as
// masked shapes in --ink beside the channel name.
export type SocialChannel = {
  name: string;
  url: string;
  handle?: string;
  logo: StaticImageData;
  logoAlt: string;
  description: string;
};

export const sponsors: Sponsor[] = [
  {
    name: "University of Amsterdam",
    website: "https://uva.nl",
    logo: uvaLogo,
    logoAlt: "University of Amsterdam logo",
    logoWidth: 2664,
    logoHeight: 595,
  },
  {
    name: "Amsterdam University Fund",
    website: "https://auf.nl",
    logo: aufLogo,
    logoAlt: "Amsterdam University Fund logo",
    logoWidth: 572,
    logoHeight: 96,
  },
  {
    name: "Rerun",
    website: "https://rerun.io",
    logo: rerunLogo,
    logoAlt: "Rerun logo",
    logoWidth: 248,
    logoHeight: 60,
  },
  {
    name: "Startup Village",
    website: "https://startupvillage.nl",
    logo: startupVillageLogo,
    logoAlt: "Startup Village logo",
    logoWidth: 1581,
    logoHeight: 797,
  },
];

export const socialChannels: SocialChannel[] = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/whirlwind-amsterdam/",
    handle: "whIRLwind Amsterdam",
    logo: LinkedInLogo,
    logoAlt: "LinkedIn logo",
    description: "Results and team announcements.",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/whirlwind.ams",
    handle: "@whirlwind.ams",
    logo: InstagramLogo,
    logoAlt: "Instagram logo",
    description: "Photos and clips from the lab, travel, and match days.",
  },
  {
    name: "GitHub",
    url: "https://github.com/IntelligentRoboticsLab",
    handle: "Intelligent Robotics Lab",
    logo: GitHubLogo,
    logoAlt: "GitHub logo",
    description: "Code and tooling from the lab we work in.",
  },
];

export const siteContact = {
  email: "info@whirlwind.team",
  addressLines: ["Room L0.01", "Science Park 900", "1098 XH Amsterdam"],
};
