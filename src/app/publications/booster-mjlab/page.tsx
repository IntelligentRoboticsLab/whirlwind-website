import type { Metadata } from "next";
import Image from "next/image";

import VideoCarousel, { type Clip } from "@/components/VideoCarousel";
import hfLogo from "@/assets/publications/hf-logo.svg";
import posterDiagonalTurn from "@/assets/publications/booster-mjlab/diagonal_turn.jpg";
import posterForwardBackward from "@/assets/publications/booster-mjlab/forward_backward.jpg";
import posterHighlight from "@/assets/publications/booster-mjlab/highlight-poster.jpg";
import posterLoop from "@/assets/publications/booster-mjlab/loop.jpg";
import posterStrafe from "@/assets/publications/booster-mjlab/strafe.jpg";
import simGulp from "@/assets/publications/booster-mjlab/sim/gulp.jpg";
import simOutAndBack from "@/assets/publications/booster-mjlab/sim/out_and_back.jpg";
import simSprintFollow from "@/assets/publications/booster-mjlab/sim/sprint_follow.jpg";
import simStrafeAcross from "@/assets/publications/booster-mjlab/sim/strafe_across.jpg";
import simThomasFlare from "@/assets/publications/booster-mjlab/sim/thomas_flare.jpg";
import simWalkAcross from "@/assets/publications/booster-mjlab/sim/walk_across.jpg";

// The booster_mjlab project page, ported from its standalone site: the same
// sections, text and clips, in the site's type, colours and links. The videos
// are served from public/publications/booster-mjlab/videos.

export const metadata: Metadata = {
  title: "booster_mjlab",
  description:
    "Train Booster K1 locomotion with mjlab, adversarial motion priors, symmetry data augmentation, and Muon. Watch real-robot demonstrations and explore the code.",
  openGraph: {
    type: "website",
    title: "booster_mjlab",
    description:
      "Real-robot locomotion with a policy trained for 30k steps. Code, motion references, and demonstrations.",
    images: [{ url: posterHighlight.src, width: posterHighlight.width, height: posterHighlight.height }],
  },
};

const github = "https://github.com/IntelligentRoboticsLab/booster-mjlab";
const dataset = "https://huggingface.co/datasets/whirlwind-ams/lafan_locomotion_k1";
const mjlab = "https://github.com/mujocolab/mjlab";
const lafan = "https://github.com/ubisoft/ubisoft-laforge-animation-dataset";

const videos = "/publications/booster-mjlab/videos";

const simulationClips: Clip[] = [
  { title: "Walk across", poster: simWalkAcross, src: `${videos}/sim/walk_across.mp4` },
  { title: "Sprint", poster: simSprintFollow, src: `${videos}/sim/sprint_follow.mp4` },
  { title: "Side flip", poster: simGulp, src: `${videos}/sim/gulp.mp4` },
  { title: "Strafe across", poster: simStrafeAcross, src: `${videos}/sim/strafe_across.mp4` },
  { title: "Thomas flare", poster: simThomasFlare, src: `${videos}/sim/thomas_flare.mp4` },
  { title: "Out and back", poster: simOutAndBack, src: `${videos}/sim/out_and_back.mp4` },
];

const robotClips: Clip[] = [
  { title: "Diagonal turn", poster: posterDiagonalTurn, src: `${videos}/diagonal_turn.mp4` },
  { title: "Forward and backward", poster: posterForwardBackward, src: `${videos}/forward_backward.mp4` },
  { title: "Continuous sequence", poster: posterLoop, src: `${videos}/loop.mp4` },
  { title: "Lateral movement", poster: posterStrafe, src: `${videos}/strafe.mp4` },
];

function DatasetLink() {
  return (
    <a className="logo-link" href={dataset} target="_blank" rel="noopener noreferrer">
      <Image src={hfLogo} alt="Hugging Face" width={18} height={18} className="logo-link__img" />
      Sample motion dataset
    </a>
  );
}

export default function BoosterMjlabPage() {
  return (
    <div className="page">
      <section className="container opening" aria-label="Introduction">
        <div className="opening__text">
          <h1 className="t-title">booster_mjlab</h1>
          <p className="t-lede">
            An{" "}
            <a href={mjlab} target="_blank" rel="noopener noreferrer">
              mjlab
            </a>{" "}
            integration for the Booster K1: robot model, training tasks and an AMP motion-prior pipeline,
            from simulation to the real robot.
          </p>
          <div className="actions t-body">
            <a className="button" href={github} target="_blank" rel="noopener noreferrer">
              <span>GitHub</span>
            </a>
            <DatasetLink />
          </div>
        </div>
      </section>

      <section className="container" id="simulation" aria-labelledby="simulation-heading">
        <VideoCarousel
          label="Simulation clips"
          clips={simulationClips}
          head={
            <div className="section-head">
              <h2 id="simulation-heading" className="t-heading">
                In simulation
              </h2>
              <p className="t-caption">
                Locomotion from the AMP velocity task, acrobatics from motion tracking
              </p>
            </div>
          }
        />
      </section>

      <section className="container" id="demos" aria-labelledby="demos-heading">
        <VideoCarousel
          label="Real-robot demonstrations"
          clips={robotClips}
          head={
            <div className="section-head">
              <h2 id="demos-heading" className="t-heading">
                On the real robot
              </h2>
              <p className="t-caption">
                AMP velocity-tracking policy on the Booster K1 after 30k training steps
              </p>
            </div>
          }
        />
      </section>

      <section className="container stack--loose stack" id="motions" aria-labelledby="motions-heading">
        <div className="prose t-body">
          <h2 id="motions-heading" className="t-heading">
            Motion references
          </h2>
          <p>
            Locomotion clips from{" "}
            <a href={lafan} target="_blank" rel="noopener noreferrer">
              LAFAN1
            </a>
            , retargeted onto the parallel-ankle K1. They drive the AMP motion prior, and the built-in motion
            viewer lets you browse, play back and edit clips before training.
          </p>
        </div>
        <figure className="figure">
          <video
            className="motion-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            width={900}
            height={506}
            aria-label="Retargeted reference motions on the Booster K1 model"
          >
            <source src={`${videos}/motion_grid.mp4`} type="video/mp4" />
          </video>
        </figure>
      </section>

    </div>
  );
}
