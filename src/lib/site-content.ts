import type { StaticImageData } from "next/image";

import rerunLogo from "@/assets/sponsors/rerun.svg";
import startupVillageLogo from "@/assets/sponsors/startup_village.webp";
import uvaLogo from "@/assets/sponsors/uva.png";
import GitHubLogo from "@/assets/socials/github.svg";
import InstagramLogo from "@/assets/socials/instagram.svg";
import LinkedInLogo from "@/assets/socials/linkedin.svg";
import PhotoBackstage from "@/assets/photos/158-IMG_5111.jpg";
import PhotoWorkshop from "@/assets/photos/168-IMG_5126.jpg";
import PhotoEvening from "@/assets/photos/20250812_202120.jpg";
import PhotoNaoLab from "@/assets/photos/203-IMG_5141.jpg";
import PhotoTeam from "@/assets/photos/5-IMG_5253.jpg";
import PhotoTeamSetup from "@/assets/photos/55142547581_39130691ce_o.jpg";
import PhotoMemberWithRobot from "@/assets/photos/72-DSC09322.jpg";
import PhotoWhirlwindJersey from "@/assets/photos/74-DSC09320.jpg";
import PhotoRobotsFromBehind from "@/assets/photos/86-DSC09308.jpg";
import PhotoLaptopOnField from "@/assets/photos/110-DSC09284.jpg";
import PhotoTeamWorkingAtPitch from "@/assets/photos/117-DSC09277.jpg";
import PhotoRobotWalking from "@/assets/photos/133-DSC09261.jpg";
import PhotoIceRibbon from "@/assets/photos/NAN12947_3610623519-rp3913954625-opq3915027514.jpg";
import PhotoShowcase from "@/assets/photos/NAN12360-opq3912652044.jpg";
import PhotoTeamWithPortugueseProfessor from "@/assets/photos/NAN13334_3613110639-rp3914172363-opq3915542285.jpg";
import PhotoRobot from "@/assets/photos/NAN18608-opq3906025937.jpg";
import PhotoGermanOpen from "@/assets/photos/DSC_0798.jpg";
import PhotoFreeKick from "@/assets/photos/ROC_4057-opq3912329047.jpg";

export type SiteMetric = {
  value: string;
  label: string;
};

export type SiteEvent = {
  id: string;
  dateLabel: string;
  startDate: string;
  event: string;
  location: string;
  result: string;
  detail: string;
  highlight?: boolean;
};

export type TeamPillar = {
  index: string;
  title: string;
  description: string;
};

export type Sponsor = {
  name: string;
  website: string;
  logo: StaticImageData;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  logoMaxWidth?: string;
  logoDisplayHeight?: string;
  contribution?: string;
};

export type SponsorTier = {
  name: string;
  description: string;
  sponsors: Sponsor[];
};

export type SocialChannel = {
  name: string;
  url: string;
  handle?: string;
  logo: StaticImageData;
  logoAlt: string;
  description: string;
};

export type CollagePhoto = {
  src: StaticImageData;
  alt: string;
  layout: "wide" | "tall" | "square" | "panorama";
};

export const siteMetrics: SiteMetric[] = [
  { value: "15", label: "Active members" },
  { value: "2025", label: "Founded in Amsterdam" },
  { value: "3rd", label: "German Open 2026 finish" },
  { value: "2", label: "Global competitions entered" },
];

export const siteEvents: SiteEvent[] = [
  {
    id: "qualification-document-2026",
    dateLabel: "Mar 2026",
    startDate: "2026-03-17",
    event: "Qualification document published",
    location: "Amsterdam",
    result: "Season active",
    detail: "Technical roadmap and team description for the season.",
  },
  {
    id: "world-humanoid-robot-games-2025",
    dateLabel: "Oct 2025",
    startDate: "2025-10-01",
    event: "World Humanoid Robot Games",
    location: "Beijing",
    result: "International debut",
    detail: "Our first international competition with the new team.",
  },
  {
    id: "german-open-2026",
    dateLabel: "Mar 2026",
    startDate: "2026-03-01",
    event: "RoboCup German Open 2026",
    location: "Germany",
    result: "3rd place",
    detail: "Two weeks with the robots and we got on the podium.",
    highlight: true,
  },
  {
    id: "team-launched-2025",
    dateLabel: "2025",
    startDate: "2025-02-01",
    event: "Team launched",
    location: "University of Amsterdam",
    result: "First roster",
    detail: "whIRLwind started inside the Intelligent Robotics Lab.",
  },
];

export const highlightedEvent =
  siteEvents.find((event) => event.highlight) ?? siteEvents[0];

export const teamPillars: TeamPillar[] = [
  {
    index: "01",
    title: "Competition software",
    description:
      "Vision, behaviours, RL policies, simulation, and the tests that keep it all working.",
  },
  {
    index: "02",
    title: "Hardware and repairs",
    description:
      "Assembly, calibration, maintenance, and fixing whatever breaks during a competition.",
  },
  {
    index: "03",
    title: "Match operations",
    description:
      "Travel, field-side debugging, demos, and the logistics of running a team at an event.",
  },
  {
    index: "04",
    title: "Research and outreach",
    description:
      "Reports, theses, and the research we publish alongside the competition work.",
  },
];

export const sponsorTiers: SponsorTier[] = [
  {
    name: "Premier Partner",
    description: "Backs the team's infrastructure and competitions.",
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
      },
    ],
  },
  {
    name: "Supporting Partners",
    description: "Support the lab, the team, and the space we work in.",
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

export const socialChannels: SocialChannel[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/whirlwind-amsterdam/",
    handle: "whIRLwind Amsterdam",
    logo: LinkedInLogo,
    logoAlt: "LinkedIn logo",
    description: "Announcements and partnership updates.",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/whirlwind.ams",
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

export const socialCollagePhotos: CollagePhoto[] = [
  {
    src: PhotoLaptopOnField,
    alt: "Team member kneeling on the field debugging robots with a laptop.",
    layout: "wide",
  },
  {
    src: PhotoTeamWorkingAtPitch,
    alt: "Two team members working on a robot at pitch level during a match.",
    layout: "square",
  },
  {
    src: PhotoRobotWalking,
    alt: "Team member guiding a walking robot near the goal.",
    layout: "tall",
  },
  {
    src: PhotoTeamSetup,
    alt: "The full team set up at the German Open with the RoboCup sign behind them.",
    layout: "panorama",
  },
  {
    src: PhotoMemberWithRobot,
    alt: "Team member standing with a robot on the football field.",
    layout: "wide",
  },
  {
    src: PhotoWhirlwindJersey,
    alt: "Back of a whIRLwind jersey showing the sponsor placements.",
    layout: "square",
  },
  {
    src: PhotoRobotsFromBehind,
    alt: "Two robots in red jerseys seen from behind during a match.",
    layout: "wide",
  },
  {
    src: PhotoRobot,
    alt: "Close-up of the robot under bright lighting.",
    layout: "wide",
  },
  {
    src: PhotoTeamWithPortugueseProfessor,
    alt: "Team photo with visitors at an international event.",
    layout: "wide",
  },
  {
    src: PhotoFreeKick,
    alt: "Robots waiting to take a free kick during a match.",
    layout: "tall",
  },
  {
    src: PhotoWorkshop,
    alt: "Team members giving a demo to visitors in the lab.",
    layout: "tall",
  },
  {
    src: PhotoGermanOpen,
    alt: "Team looking on during a match at an international event.",
    layout: "panorama",
  },
  {
    src: PhotoNaoLab,
    alt: "The team showing a NAO robot to visitors in the lab.",
    layout: "square",
  },
  {
    src: PhotoEvening,
    alt: "Preparing for a match during evening competitions.",
    layout: "square",
  },
  {
    src: PhotoShowcase,
    alt: "Team posing with the robot at a showcase event.",
    layout: "wide",
  },
  {
    src: PhotoTeam,
    alt: "The team following along as the robot walks around.",
    layout: "tall",
  },
  {
    src: PhotoBackstage,
    alt: "Team members repairing a broken ankle joint.",
    layout: "wide",
  },
  {
    src: PhotoIceRibbon,
    alt: "Competition venue during an event in Beijing.",
    layout: "square",
  },
];

export const homePhotos = {
  hero: {
    src: PhotoTeamSetup,
    alt: "The full team set up at the German Open with the RoboCup sign behind them.",
  },
  supportA: {
    src: PhotoRobotWalking,
    alt: "Team member guiding a walking robot near the goal.",
  },
  supportB: {
    src: PhotoWorkshop,
    alt: "Visitors gathered around the team during a workshop demo.",
  },
};

export const contactTopics = [
  {
    title: "Research and demos",
    description:
      "Want us to present somewhere, run a lab demo, or come to a student event.",
  },
  {
    title: "Sponsoring",
    description:
      "Want to sponsor the team, or collaborate on hardware or tooling.",
  },
  {
    title: "Media and press",
    description:
      "Tell us the angle and deadline and we'll find the right person.",
  },
];

export const siteContact = {
  email: "info@whirlwind.team",
  addressLines: [
    "Room L0.01",
    "Science Park 900",
    "1098 XH Amsterdam",
  ],
};
