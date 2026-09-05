import Image from "next/image";

import walk from "@/assets/artwork/lineup/walk.png";
import windup from "@/assets/artwork/lineup/windup.png";
import contact from "@/assets/artwork/lineup/contact.png";
import follow from "@/assets/artwork/lineup/follow.png";
import keeper from "@/assets/artwork/lineup/keeper.png";

import NoiseField from "./NoiseField";

// The landing view: the K1 in profile, left to right, on the noise field.
// Five cutouts rendered at one camera distance, so they share a scale. Each
// figure's height is its pixel height relative to the tallest (751px) so the
// feet line up on one ground. DESIGN.md, section 9, "Home".
const figures = [
  { src: walk, h: 718, optional: false },
  { src: windup, h: 751, optional: true },
  { src: contact, h: 713, optional: false },
  { src: follow, h: 683, optional: true },
  { src: keeper, h: 736, optional: false },
];

// sum of width/height ratios, so the row can be sized to fit the viewport
const sum = figures.reduce((a, f) => a + f.src.width / 751, 0);
const sumSmall = figures.filter((f) => !f.optional).reduce((a, f) => a + f.src.width / 751, 0);

export default function Lineup() {
  return (
    <div className="lineup">
      <NoiseField className="lineup__field" />
      <div
        className="lineup__row"
        style={{ ["--sum" as string]: sum.toFixed(2), ["--sum-small" as string]: sumSmall.toFixed(2) }}
        role="img"
        aria-label="The K1 in five poses from left to right: walking, winding up, striking the ball, following through, and as goalkeeper taking the ball."
      >
        {figures.map((f, i) => (
          <Image
            key={i}
            src={f.src}
            alt=""
            className={`lineup__fig${f.optional ? " lineup__fig--optional" : ""}`}
            style={{ ["--h" as string]: f.h }}
            sizes="(max-width: 64rem) 40vw, 25vw"
            priority={i < 3}
          />
        ))}
      </div>
    </div>
  );
}
