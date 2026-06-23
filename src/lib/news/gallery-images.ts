import type { StaticImageData } from "next/image";

import BeijingArena from "@/assets/photos/2025-08-RCAP-Beijing/SXW_3494-opq3906727421.jpg";
import BeijingLineup from "@/assets/photos/2025-08-RCAP-Beijing/SXW_3502-opq3906725825.jpg";
import BeijingMatch from "@/assets/photos/2025-08-RCAP-Beijing/NAN19628-opq3907064631.jpg";
import BeijingFreeKick from "@/assets/photos/2025-08-RCAP-Beijing/ROC_4057-opq3912329047.jpg";
import BeijingRobot from "@/assets/photos/2025-08-RCAP-Beijing/NAN18608-opq3906025937.jpg";
import BeijingShowcase from "@/assets/photos/2025-08-RCAP-Beijing/NAN12360-opq3912652044.jpg";
import BeijingVenue from "@/assets/photos/2025-08-RCAP-Beijing/NAN12947_3610623519-rp3913954625-opq3915027514.jpg";
import BeijingEvening from "@/assets/photos/2025-08-RCAP-Beijing/20250812_202120.jpg";

import ScienceDay158 from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-158-IMG_5111.jpg";
import ScienceDay168 from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-168-IMG_5126.jpg";
import ScienceDay202 from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-202-IMG_5050.jpg";
import ScienceDay203 from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-203-IMG_5141.jpg";
import ScienceDay31 from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-31-IMG_5135.jpg";
import ScienceDay73 from "@/assets/photos/2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-73-IMG_5240.jpg";

import GermanOpenTeam from "@/assets/photos/2026-03-German-Open/55141653492_512e7cb68f_o.jpg";
import GermanOpenMember from "@/assets/photos/2026-03-German-Open/72-DSC09322.jpg";
import GermanOpenJersey from "@/assets/photos/2026-03-German-Open/74-DSC09320.jpg";
import GermanOpenRobotsBehind from "@/assets/photos/2026-03-German-Open/86-DSC09308.jpg";
import GermanOpenLaptop from "@/assets/photos/2026-03-German-Open/110-DSC09284.jpg";
import GermanOpenPitch from "@/assets/photos/2026-03-German-Open/117-DSC09277.jpg";
import GermanOpenWalking from "@/assets/photos/2026-03-German-Open/133-DSC09261.jpg";
import GermanOpenWalking2 from "@/assets/photos/2026-03-German-Open/135-DSC09259.jpg";
import GermanOpenMember2 from "@/assets/photos/2026-03-German-Open/63-DSC09331~2.jpg";

import EuVisitZaharievaDijkgraaf from "@/assets/photos/2026-06-EU-visit/102_UvAScienceParkVisitEuropeanCommissioner2026.jpg";
import EuVisitExplaining from "@/assets/photos/2026-06-EU-visit/111_UvAScienceParkVisitEuropeanCommissioner2026.jpg";
import EuVisitDemo from "@/assets/photos/2026-06-EU-visit/097_UvAScienceParkVisitEuropeanCommissioner2026.jpg";
import EuVisitRobotsPlaying from "@/assets/photos/2026-06-EU-visit/099_UvAScienceParkVisitEuropeanCommissioner2026.jpg";
import EuVisitRobotDribbling from "@/assets/photos/2026-06-EU-visit/106_UvAScienceParkVisitEuropeanCommissioner2026.jpg";
import EuVisitRobotWithBall from "@/assets/photos/2026-06-EU-visit/101_UvAScienceParkVisitEuropeanCommissioner2026.jpg";
import EuVisitDelegation from "@/assets/photos/2026-06-EU-visit/092_UvAScienceParkVisitEuropeanCommissioner2026.jpg";
import EuVisitApplause from "@/assets/photos/2026-06-EU-visit/109_UvAScienceParkVisitEuropeanCommissioner2026.jpg";
import EuVisitApplause2 from "@/assets/photos/2026-06-EU-visit/110_UvAScienceParkVisitEuropeanCommissioner2026.jpg";

export type GalleryImage = {
  src: StaticImageData;
  alt: string;
  credit?: string;
};

// Maps a news post slug (the markdown filename without `.md`) to an ordered list
// of images shown in a slideshow below the post body. Add an entry here when a
// post should display a photo gallery.
export const galleryImages: Record<string, GalleryImage[]> = {
  "2026-06-18-european-commissioner-visit": [
    { src: EuVisitZaharievaDijkgraaf, alt: "A close-up of the delegation during the robot football match.", credit: "Photo: Ljilja Suvajdžić" },
    { src: EuVisitExplaining, alt: "A team member explaining the robots to the delegation at the side of the pitch.", credit: "Photo: Ljilja Suvajdžić" },
    { src: EuVisitDemo, alt: "The delegation watching a robot football demo in RoboLab.", credit: "Photo: Ljilja Suvajdžić" },
    { src: EuVisitRobotsPlaying, alt: "Robots positioning for kick-off.", credit: "Photo: Ljilja Suvajdžić" },
    { src: EuVisitRobotDribbling, alt: "Close-up of a robot kicking the ball during the demo.", credit: "Photo: Ljilja Suvajdžić" },
    { src: EuVisitRobotWithBall, alt: "A robot bringing the ball forward.", credit: "Photo: Ljilja Suvajdžić" },
    { src: EuVisitDelegation, alt: "The delegation lined up alongside the pitch with a robot in front.", credit: "Photo: Ljilja Suvajdžić" },
    { src: EuVisitApplause, alt: "The delegation applauding the robots after the match.", credit: "Photo: Ljilja Suvajdžić" },
    { src: EuVisitApplause2, alt: "The delegation applauding during the robot football demo.", credit: "Photo: Ljilja Suvajdžić" },
  ],
  "2025-08-15-world-humanoid-robot-games-quarter-finals": [
    { src: BeijingArena, alt: "Team competing at the World Humanoid Robot Games in Beijing." },
    { src: BeijingMatch, alt: "Team at work during a match in Beijing." },
    { src: BeijingLineup, alt: "Team watching from the side-line during a match in Beijing." },
    { src: BeijingFreeKick, alt: "Robots waiting to take a free kick during a match." },
    { src: BeijingShowcase, alt: "Team posing with the robot at the World Humanoid Robot Games." },
    { src: BeijingRobot, alt: "Close-up of two robots during a match." },
    { src: BeijingVenue, alt: "The Beijing National Speed Skating Oval competition venue." },
    { src: BeijingEvening, alt: "Preparing for a match during evening competitions in Beijing." },
  ],
  "2025-10-04-science-park-science-day": [
    { src: ScienceDay202, alt: "Team member explaining the robots to visitors at Science Park Science Day." },
    { src: ScienceDay31, alt: "Visitors watching a NAO robot demo at Science Park Science Day." },
    { src: ScienceDay73, alt: "Children interacting with a NAO robot at Science Park Science Day." },
    { src: ScienceDay168, alt: "Team members giving a robot football demo to visitors." },
    { src: ScienceDay203, alt: "The team showing a NAO robot to visitors." },
    { src: ScienceDay158, alt: "Team members working on a robot during the demo day." },
  ],
  "2026-03-14-german-open-third-place": [
    { src: GermanOpenMember2, alt: "Team picture with our trophy at the German Open." },
    { src: GermanOpenPitch, alt: "Two team members working on a robot before a match." },
    { src: GermanOpenWalking2, alt: "Robot walking on the field at the German Open." },
    { src: GermanOpenTeam, alt: "Team member deploying code on a robot at the RoboCup German Open." },
    { src: GermanOpenMember, alt: "Team member standing with a robot on the field at the German Open." },
    { src: GermanOpenWalking, alt: "Team members testing on a robot at the German Open." },
    { src: GermanOpenRobotsBehind, alt: "Two robots in red jerseys seen from behind during a match." },
    { src: GermanOpenLaptop, alt: "Team member kneeling on the field debugging robots with a laptop." },
    { src: GermanOpenJersey, alt: "Back of a whIRLwind jersey." },
  ],
};
