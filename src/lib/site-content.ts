import type { StaticImageData } from "next/image";

import rerunLogo from "@/assets/sponsors/rerun.svg";
import startupVillageLogo from "@/assets/sponsors/startupvillage_logo_white.webp";
import uvaLogo from "@/assets/sponsors/uva.png";
import GitHubLogo from "@/assets/socials/github.svg";
import InstagramLogo from "@/assets/socials/instagram.svg";
import LinkedInLogo from "@/assets/socials/linkedin.svg";
import PhotoBackstage from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-158-IMG_5111.jpg";
import PhotoWorkshop from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-168-IMG_5126.jpg";
import PhotoEvening from "@/assets/photos/2025-08-RCAP-Beijing/20250812_202120.jpg";
import PhotoNaoLab from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-203-IMG_5141.jpg";
import PhotoTeam from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-5-IMG_5253.jpg";
import PhotoTeamSetup from "@/assets/photos/2026-03-German-Open/55142547581_39130691ce_o.jpg";
import PhotoMemberWithRobot from "@/assets/photos/2026-03-German-Open/72-DSC09322.jpg";
import PhotoWhirlwindJersey from "@/assets/photos/2026-03-German-Open/74-DSC09320.jpg";
import PhotoRobotsFromBehind from "@/assets/photos/2026-03-German-Open/86-DSC09308.jpg";
import PhotoLaptopOnField from "@/assets/photos/2026-03-German-Open/110-DSC09284.jpg";
import PhotoTeamWorkingAtPitch from "@/assets/photos/2026-03-German-Open/117-DSC09277.jpg";
import PhotoRobotWalking from "@/assets/photos/2026-03-German-Open/133-DSC09261.jpg";
import PhotoIceRibbon from "@/assets/photos/2025-08-RCAP-Beijing/NAN12947_3610623519-rp3913954625-opq3915027514.jpg";
import PhotoShowcase from "@/assets/photos/2025-08-RCAP-Beijing/NAN12360-opq3912652044.jpg";
import PhotoTeamWithPortugueseProfessor from "@/assets/photos/2025-08-RCAP-Beijing/NAN13334_3613110639-rp3914172363-opq3915542285.jpg";
import PhotoRobot from "@/assets/photos/2025-08-RCAP-Beijing/NAN18608-opq3906025937.jpg";
import PhotoGermanOpen from "@/assets/photos/2025-07-Robocup-Salvador/DSC_0798.jpg";
import PhotoFreeKick from "@/assets/photos/2025-08-RCAP-Beijing/ROC_4057-opq3912329047.jpg";
import PhotoBeijingMatch from "@/assets/photos/2025-08-RCAP-Beijing/NAN19628-opq3907064631.jpg";
import PhotoBeijingArena from "@/assets/photos/2025-08-RCAP-Beijing/SXW_3494-opq3906727421.jpg";
import PhotoBeijingLineup from "@/assets/photos/2025-08-RCAP-Beijing/SXW_3502-opq3906725825.jpg";
import PhotoScienceDayDemo from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-202-IMG_5050.jpg";
import PhotoScienceDayExplain from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-31-IMG_5135.jpg";
import PhotoScienceDayKids from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-73-IMG_5240.jpg";
import PhotoScienceDayPublic from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-85-IMG_5107.jpg";
import PhotoScienceDayUva from "@/assets/photos/2025-10-Dag_vd_wetenschap/UvA_Dag van de Wetenschap_LD_lr_20251004-2861.jpg";
import PhotoGermanOpenTeam from "@/assets/photos/2026-03-German-Open/55141653492_512e7cb68f_o.jpg";
import PhotoGermanOpenWalking from "@/assets/photos/2026-03-German-Open/135-DSC09259.jpg";
import PhotoGermanOpenMember from "@/assets/photos/2026-03-German-Open/63-DSC09331~2.jpg";
import PhotoStartupDemo from "@/assets/photos/2026-04-Startup-demo/Startup Villa Science park Amsterdam 18032026-08549.jpg";
import PhotoStartupVisitors from "@/assets/photos/2026-04-Startup-demo/Startup Villa Science park Amsterdam 18032026-08740.jpg";
import PhotoStartupPresenting from "@/assets/photos/2026-04-Startup-demo/Startup Villa Science park Amsterdam 18032026-08751.jpg";
import PhotoStartupRobot from "@/assets/photos/2026-04-Startup-demo/Startup Villa Science park Amsterdam 18032026-08758.jpg";
import PhotoStartupCloseUp from "@/assets/photos/2026-04-Startup-demo/Startup Villa Science park Amsterdam 18032026 ph by @ilsoovandijk-08735.jpg";
import PhotoAmaliaVisit from "@/assets/photos/2026-05-Prinses-Amalia/003uvabezoekamaliasciencepark.jpg";
import PhotoEuVisitDemo from "@/assets/photos/2026-06-EU-visit/095_UvAScienceParkVisitEuropeanCommissioner2026.jpg";
import PhotoEuVisitZaharieva from "@/assets/photos/2026-06-EU-visit/102_UvAScienceParkVisitEuropeanCommissioner2026.jpg";
import PhotoEuVisitRobotDribbling from "@/assets/photos/2026-06-EU-visit/106_UvAScienceParkVisitEuropeanCommissioner2026.jpg";
import PhotoEuVisitExplaining from "@/assets/photos/2026-06-EU-visit/111_UvAScienceParkVisitEuropeanCommissioner2026.jpg";

export type SiteEvent = {
  id: string;
  dateLabel: string;
  startDate: string;
  event: string;
  location: string;
  result: string;
  detail: string;
  highlight?: boolean;
  // Slug of a related news post (filename without `.md`); links the event to its article.
  newsSlug?: string;
};

export type Sponsor = {
  name: string;
  website: string;
  logo: StaticImageData;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  logoDisplayHeight?: string;
  logoDarkBackground?: boolean;
  contribution?: string;
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
  credit?: string;
};

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
    newsSlug: "2026-03-14-german-open-third-place",
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

export const sponsors: Sponsor[] = [
  {
    name: "University of Amsterdam",
    website: "https://uva.nl",
    logo: uvaLogo,
    logoAlt: "University of Amsterdam logo",
    logoWidth: 2664,
    logoHeight: 595,
    logoDisplayHeight: "56px",
    logoDarkBackground: true,
  },
  {
    name: "Rerun",
    website: "https://rerun.io",
    logo: rerunLogo,
    logoAlt: "Rerun logo",
    logoWidth: 186,
    logoHeight: 45,
    logoDisplayHeight: "56px",
    logoDarkBackground: true,
  },
  {
    name: "StartUp Village",
    website: "https://startupvillage.nl",
    logo: startupVillageLogo,
    logoAlt: "StartUp Village logo",
    logoWidth: 1581,
    logoHeight: 797,
    logoDisplayHeight: "64px",
    logoDarkBackground: true,
  },
];

export const socialChannels: SocialChannel[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/whirlwind-amsterdam/",
    handle: "whIRLwind Amsterdam",
    logo: LinkedInLogo,
    logoAlt: "LinkedIn logo",
    description: "Results and team announcements.",
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

// Ordered reverse-chronologically by event (most recent first), so the gallery
// reads newest-to-oldest top to bottom. The gallery variant lays these out in a
// uniform grid, so `layout` is unused there but kept for the editorial variant.
export const socialCollagePhotos: CollagePhoto[] = [
  // 2026-06 — European Commissioner visit, UvA Science Park
  {
    src: PhotoEuVisitDemo,
    alt: "Robot football demo for European Commissioner Zaharieva and the delegation at UvA Science Park.",
    layout: "panorama",
    credit: "Photo: Ljilja Suvajdžić",
  },
  {
    src: PhotoEuVisitZaharieva,
    alt: "European Commissioner Ekaterina Zaharieva with the delegation during the visit to UvA Science Park.",
    layout: "wide",
    credit: "Photo: Ljilja Suvajdžić",
  },
  {
    src: PhotoEuVisitRobotDribbling,
    alt: "Close-up of a robot dribbling the ball during the demo for the European Commissioner.",
    layout: "wide",
    credit: "Photo: Ljilja Suvajdžić",
  },
  {
    src: PhotoEuVisitExplaining,
    alt: "A team member explaining the robots to the European Commissioner's delegation.",
    layout: "wide",
    credit: "Photo: Ljilja Suvajdžić",
  },
  // 2026-05 — Princess Amalia visit, UvA Science Park
  {
    src: PhotoAmaliaVisit,
    alt: "Princess Amalia visiting the team at UvA Science Park.",
    layout: "panorama",
  },
  // 2026-04 — Startup Village demo, Amsterdam
  {
    src: PhotoStartupDemo,
    alt: "Demoing the robots at Startup Village in Amsterdam.",
    layout: "wide",
  },
  {
    src: PhotoStartupVisitors,
    alt: "Visitors gathered around the robots at the startup demo.",
    layout: "square",
  },
  {
    src: PhotoStartupPresenting,
    alt: "Team presenting the NAO robots at the startup demo.",
    layout: "tall",
  },
  {
    src: PhotoStartupRobot,
    alt: "Robot demo at Startup Village Science Park Amsterdam.",
    layout: "square",
  },
  {
    src: PhotoStartupCloseUp,
    alt: "Close-up of the robots during the startup demo.",
    layout: "wide",
  },
  // 2026-03 — German Open
  {
    src: PhotoTeamSetup,
    alt: "The full team set up at the German Open with the RoboCup sign behind them.",
    layout: "panorama",
  },
  {
    src: PhotoMemberWithRobot,
    alt: "Team member standing with a robot on the football field at the German Open.",
    layout: "wide",
  },
  {
    src: PhotoWhirlwindJersey,
    alt: "Back of a whIRLwind jersey showing the sponsor placements.",
    layout: "square",
  },
  {
    src: PhotoRobotsFromBehind,
    alt: "Two robots in red jerseys seen from behind during a match at the German Open.",
    layout: "wide",
  },
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
    src: PhotoGermanOpenTeam,
    alt: "The team with their robots at the German Open.",
    layout: "wide",
  },
  {
    src: PhotoGermanOpenWalking,
    alt: "Robot walking on the field at the German Open.",
    layout: "tall",
  },
  {
    src: PhotoGermanOpenMember,
    alt: "Team member with a robot at the German Open.",
    layout: "square",
  },
  // 2025-10 — Dag van de Wetenschap, UvA
  {
    src: PhotoBackstage,
    alt: "Team members repairing a broken ankle joint.",
    layout: "wide",
  },
  {
    src: PhotoWorkshop,
    alt: "Team members giving a demo to visitors in the lab.",
    layout: "tall",
  },
  {
    src: PhotoNaoLab,
    alt: "The team showing a NAO robot to visitors in the lab.",
    layout: "square",
  },
  {
    src: PhotoTeam,
    alt: "The team following along as the robot walks around.",
    layout: "tall",
  },
  {
    src: PhotoScienceDayDemo,
    alt: "Visitors watching a NAO robot demo on the day of science.",
    layout: "square",
  },
  {
    src: PhotoScienceDayExplain,
    alt: "Team member explaining the robot to visitors on the day of science.",
    layout: "tall",
  },
  {
    src: PhotoScienceDayKids,
    alt: "Children interacting with a NAO robot on the day of science.",
    layout: "wide",
  },
  {
    src: PhotoScienceDayPublic,
    alt: "Demonstrating the robot to the public on the day of science.",
    layout: "square",
  },
  {
    src: PhotoScienceDayUva,
    alt: "The team running a NAO robot demo at the UvA day of science.",
    layout: "panorama",
  },
  // 2025-08 — RoboCup Asia-Pacific, Beijing
  {
    src: PhotoEvening,
    alt: "Preparing for a match during evening competitions in Beijing.",
    layout: "square",
  },
  {
    src: PhotoIceRibbon,
    alt: "Competition venue during an event in Beijing.",
    layout: "square",
  },
  {
    src: PhotoShowcase,
    alt: "Team posing with the robot at a showcase event in Beijing.",
    layout: "wide",
  },
  {
    src: PhotoTeamWithPortugueseProfessor,
    alt: "Team photo with visitors at the RoboCup Asia-Pacific in Beijing.",
    layout: "wide",
  },
  {
    src: PhotoRobot,
    alt: "Two robots during a match in Beijing.",
    layout: "wide",
  },
  {
    src: PhotoFreeKick,
    alt: "Robots waiting to take a free kick during a match in Beijing.",
    layout: "tall",
  },
  {
    src: PhotoBeijingMatch,
    alt: "Team at work during a match in Beijing.",
    layout: "tall",
  },
  {
    src: PhotoBeijingArena,
    alt: "Team competing at the RoboCup Asia-Pacific in Beijing.",
    layout: "wide",
  },
  {
    src: PhotoBeijingLineup,
    alt: "Team watching from the sidelines during a match in Beijing.",
    layout: "square",
  },
  // 2025-07 — RoboCup, Salvador
  {
    src: PhotoGermanOpen,
    alt: "Team looking on during a match at RoboCup in Salvador.",
    layout: "panorama",
  },
];

export const homePhotos = {
  hero: {
    src: PhotoTeamSetup,
    alt: "The full team set up at the German Open with the RoboCup sign behind them.",
  },
  team: [
    {
      src: PhotoGermanOpenWalking,
      alt: "Robot walking on the field at the German Open.",
    },
    {
      src: PhotoTeamWorkingAtPitch,
      alt: "Two team members working on a robot at pitch level during a match.",
    },
    {
      src: PhotoGermanOpenMember,
      alt: "Team member with a robot at the German Open.",
    },
  ],
  supportA: {
    src: PhotoRobotWalking,
    alt: "Team member guiding a walking robot near the goal.",
  },
  supportB: {
    src: PhotoWorkshop,
    alt: "Visitors gathered around the team during a workshop demo.",
  },
};

export const siteContact = {
  email: "info@whirlwind.team",
  addressLines: [
    "Room L0.01",
    "Science Park 900",
    "1098 XH Amsterdam",
  ],
};
