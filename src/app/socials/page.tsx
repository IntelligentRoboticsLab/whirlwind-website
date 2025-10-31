import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import PhotoBackstage from "@/assets/photos/158-IMG_5111.jpg";
import PhotoWorkshop from "@/assets/photos/168-IMG_5126.jpg";
import PhotoEvening from "@/assets/photos/20250812_202120.jpg";
import PhotoNaoLab from "@/assets/photos/203-IMG_5141.jpg";
import PhotoTeam from "@/assets/photos/5-IMG_5253.jpg";
import PhotoIceRibbon from "@/assets/photos/NAN12947_3610623519-rp3913954625-opq3915027514.jpg";
import PhotoShowcase from "@/assets/photos/NAN12360-opq3912652044.jpg";
import PhotoTeamWithPortugeseProfessor from "@/assets/photos/NAN13334_3613110639-rp3914172363-opq3915542285.jpg";
import PhotoRobot from "@/assets/photos/NAN18608-opq3906025937.jpg";
import PhotoGermanOpen2025 from "@/assets/photos/DSC_0798.jpg";
import PhotoFreeKick from "@/assets/photos/ROC_4057-opq3912329047.jpg";
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

type CollagePhoto = {
  src: StaticImageData;
  alt: string;
  layout: "wide" | "tall" | "square" | "panorama";
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
    url: "https://www.instagram.com/dutchnaoteam",
    handle: "@dutchnaoteam",
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

const collagePhotos: CollagePhoto[] = [
  {
    src: PhotoRobot,
    alt: "Close-up of the robot under bright lighting.",
    layout: "wide",
  },
  {
    src: PhotoTeamWithPortugeseProfessor,
    alt: "Team photo with the professor of the Portugese team in Beijing",
    layout: "wide",
  },
  {
    src: PhotoFreeKick,
    alt: "Robots waiting to take a free kick",
    layout: "tall",
  },
  {
    src: PhotoWorkshop,
    alt: "Team members giving a demo to visitors in the Lab",
    layout: "tall",
  },
  {
    src: PhotoGermanOpen2025,
    alt: "Team looking on during a match at the German Open 2025",
    layout: "panorama",
  },
  {
    src: PhotoNaoLab,
    alt: "The team showing a NAO robot to visitors in the Lab",
    layout: "square",
  },
  {
    src: PhotoEvening,
    alt: "Preparing for a match during evening competitions.",
    layout: "square",
  },
  {
    src: PhotoShowcase,
    alt: "Team posing with the robot at the World Humanoid Robot Games showcase.",
    layout: "wide",
  },
  {
    src: PhotoTeam,
    alt: "The team looking on as the robot walks around",
    layout: "tall",
  },
  {
    src: PhotoBackstage,
    alt: "Team members repairing a broken ankle joint",
    layout: "wide",
  },
  {
    src: PhotoIceRibbon,
    alt: "The Ice Ribbon competition venu in Bejing, China",
    layout: "square",
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
        <div className="social-collage">
          {collagePhotos.map((photo, index) => (
            <div
              key={index}
              className={`social-collage__item social-collage__item--${photo.layout}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                placeholder="blur"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 600px"
                className="social-collage__image"
                priority={index < 2}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
