// The artwork series (DESIGN.md, section 8). Each piece exists on the paper
// ground and on the dark ground; <Artwork> picks the one that matches the theme.
// Every piece also has a transparent cutout cropped to the subject, for the
// openers, where the robot must stand exactly on the rule.
import type { StaticImageData } from "next/image";

import k1BodyLight from "@/assets/artwork/k1-body-light.jpg";
import k1BodyDark from "@/assets/artwork/k1-body-dark.jpg";
import k1BodyCut from "@/assets/artwork/cut/k1-body.png";
import k1HeadLight from "@/assets/artwork/k1-head-light.jpg";
import k1HeadDark from "@/assets/artwork/k1-head-dark.jpg";
import k1HeadCut from "@/assets/artwork/cut/k1-head.png";
import mark3dLight from "@/assets/artwork/mark-3d-light.png";
import mark3dDark from "@/assets/artwork/mark-3d-dark.png";
import k1KickWindupLight from "@/assets/artwork/k1-kick-windup-light.jpg";
import k1KickWindupDark from "@/assets/artwork/k1-kick-windup-dark.jpg";
import k1KickWindupCut from "@/assets/artwork/cut/k1-kick-windup.png";
import k1KickContactLight from "@/assets/artwork/k1-kick-contact-light.jpg";
import k1KickContactDark from "@/assets/artwork/k1-kick-contact-dark.jpg";
import k1KickContactCut from "@/assets/artwork/cut/k1-kick-contact.png";
import k1KickFollowLight from "@/assets/artwork/k1-kick-follow-light.jpg";
import k1KickFollowDark from "@/assets/artwork/k1-kick-follow-dark.jpg";
import k1KickFollowCut from "@/assets/artwork/cut/k1-kick-follow.png";
import k1WalkStrideLight from "@/assets/artwork/k1-walk-stride-light.jpg";
import k1WalkStrideDark from "@/assets/artwork/k1-walk-stride-dark.jpg";
import k1WalkStrideCut from "@/assets/artwork/cut/k1-walk-stride.png";
import k1WalkSwingLight from "@/assets/artwork/k1-walk-swing-light.jpg";
import k1WalkSwingDark from "@/assets/artwork/k1-walk-swing-dark.jpg";
import k1WalkSwingCut from "@/assets/artwork/cut/k1-walk-swing.png";
import k1DribbleLight from "@/assets/artwork/k1-dribble-light.jpg";
import k1DribbleDark from "@/assets/artwork/k1-dribble-dark.jpg";
import k1DribbleCut from "@/assets/artwork/cut/k1-dribble.png";
import k1KeeperArmsLight from "@/assets/artwork/k1-keeper-arms-light.jpg";
import k1KeeperArmsDark from "@/assets/artwork/k1-keeper-arms-dark.jpg";
import k1KeeperArmsCut from "@/assets/artwork/cut/k1-keeper-arms.png";
import k1KeeperCrouchLight from "@/assets/artwork/k1-keeper-crouch-light.jpg";
import k1KeeperCrouchDark from "@/assets/artwork/k1-keeper-crouch-dark.jpg";
import k1KeeperCrouchCut from "@/assets/artwork/cut/k1-keeper-crouch.png";
import k1KeeperStepLight from "@/assets/artwork/k1-keeper-step-light.jpg";
import k1KeeperStepDark from "@/assets/artwork/k1-keeper-step-dark.jpg";
import k1KeeperStepCut from "@/assets/artwork/cut/k1-keeper-step.png";
import k1FallenFrontLight from "@/assets/artwork/k1-fallen-front-light.jpg";
import k1FallenFrontDark from "@/assets/artwork/k1-fallen-front-dark.jpg";
import k1FallenFrontCut from "@/assets/artwork/cut/k1-fallen-front.png";
import k1FallenBackLight from "@/assets/artwork/k1-fallen-back-light.jpg";
import k1FallenBackDark from "@/assets/artwork/k1-fallen-back-dark.jpg";
import k1FallenBackCut from "@/assets/artwork/cut/k1-fallen-back.png";

export type ArtworkPiece = {
  light: StaticImageData;
  dark: StaticImageData;
  cut?: StaticImageData; // transparent, cropped to the subject
  alt: string;
};

export const artwork = {
  "k1-body": {
    light: k1BodyLight,
    dark: k1BodyDark,
    cut: k1BodyCut,
    alt: "The Booster K1 standing, rendered from its model in orange and indigo.",
  },
  "k1-head": {
    light: k1HeadLight,
    dark: k1HeadDark,
    cut: k1HeadCut,
    alt: "Close-up of the K1 head and its two cameras, rendered from its model.",
  },
  "mark-3d": {
    light: mark3dLight,
    dark: mark3dDark,
    // transparent cutouts, not framed pieces: the footer crest. Indigo blades on paper, white on the dark ground.
    alt: "The whIRLwind logo as a solid object, its blades alternating orange and indigo.",
  },
  "k1-kick-windup": {
    light: k1KickWindupLight,
    dark: k1KickWindupDark,
    cut: k1KickWindupCut,
    alt: "The K1 from the side, right leg drawn back to kick the ball in front of it.",
  },
  "k1-kick-contact": {
    light: k1KickContactLight,
    dark: k1KickContactDark,
    cut: k1KickContactCut,
    alt: "The K1 from low on the pitch, its boot on the ball.",
  },
  "k1-kick-follow": {
    light: k1KickFollowLight,
    dark: k1KickFollowDark,
    cut: k1KickFollowCut,
    alt: "The K1 after a kick, the ball away and blurred in flight.",
  },
  "k1-walk-stride": {
    light: k1WalkStrideLight,
    dark: k1WalkStrideDark,
    cut: k1WalkStrideCut,
    alt: "The K1 mid stride, walking towards the camera.",
  },
  "k1-walk-swing": {
    light: k1WalkSwingLight,
    dark: k1WalkSwingDark,
    cut: k1WalkSwingCut,
    alt: "The K1 from the side, knee raised mid step.",
  },
  "k1-dribble": {
    light: k1DribbleLight,
    dark: k1DribbleDark,
    cut: k1DribbleCut,
    alt: "The K1 from above with the ball at its feet.",
  },
  "k1-keeper-arms": {
    light: k1KeeperArmsLight,
    dark: k1KeeperArmsDark,
    cut: k1KeeperArmsCut,
    alt: "The K1 as goalkeeper, arms spread, a blurred ball coming in.",
  },
  "k1-keeper-crouch": {
    light: k1KeeperCrouchLight,
    dark: k1KeeperCrouchDark,
    cut: k1KeeperCrouchCut,
    alt: "The K1 as goalkeeper in a low ready stance.",
  },
  "k1-keeper-step": {
    light: k1KeeperStepLight,
    dark: k1KeeperStepDark,
    cut: k1KeeperStepCut,
    alt: "The K1 as goalkeeper stepping across the goal line, arms out, a blurred ball arriving at its feet.",
  },
  "k1-fallen-front": {
    light: k1FallenFrontLight,
    dark: k1FallenFrontDark,
    cut: k1FallenFrontCut,
    alt: "The K1 face down on the pitch, arms out, after a fall.",
  },
  "k1-fallen-back": {
    light: k1FallenBackLight,
    dark: k1FallenBackDark,
    cut: k1FallenBackCut,
    alt: "The K1 on its back with one leg in the air, after a fall.",
  },
} satisfies Record<string, ArtworkPiece>;

export type ArtworkName = keyof typeof artwork;
