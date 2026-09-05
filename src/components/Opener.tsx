import type { ReactNode } from "react";

import Artwork from "./Artwork";
import type { ArtworkName } from "@/lib/artwork";

type OpenerProps = {
  id: string;
  title: ReactNode;
  artwork: ArtworkName;
  // where the robot stands along the rule, as a percentage of the band's width
  at: number;
  // how tall the cutout is; the band is this plus a margin, so a fallen robot gets a short band
  height?: string;
  // a second robot further along the same rule; hidden below 40rem, where there is room for one
  second?: { artwork: ArtworkName; at: number; height?: string };
  level?: 2 | 3;
  aside?: ReactNode; // a link at the far right, such as "All news"
};

// A section opener with a robot in it: a band the height of the render, the
// heading at the bottom left, an optional link at the bottom right, and the
// render, as a cutout with its lowest point exactly on the rule, at a different
// point in every opener, as if the robots were playing along the line. A page
// without a lead piece puts its piece here instead, as a second robot on the rule.
// DESIGN.md, section 8, "Openers".
export default function Opener({
  id,
  title,
  artwork,
  at,
  height = "8rem",
  second,
  level = 2,
  aside,
}: OpenerProps) {
  const Heading = level === 2 ? "h2" : "h3";
  const secondHeight = second?.height ?? "8rem";
  // the band is as tall as its tallest robot
  const band = second ? `max(${height}, ${secondHeight})` : height;
  return (
    <div className="opener" style={{ ["--band" as string]: band }}>
      <Heading id={id} className="t-heading opener__title">
        {title}
      </Heading>
      {aside ? <span className="opener__aside">{aside}</span> : null}
      <Artwork
        name={artwork}
        cutout
        className="opener__art"
        sizes="24rem"
        style={{ ["--x" as string]: `${at}%`, ["--h" as string]: height }}
      />
      {second ? (
        <Artwork
          name={second.artwork}
          cutout
          className="opener__art opener__art--second"
          sizes="24rem"
          style={{
            ["--x" as string]: `${second.at}%`,
            ["--h" as string]: secondHeight,
          }}
        />
      ) : null}
    </div>
  );
}
