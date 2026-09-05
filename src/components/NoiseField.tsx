import { getImageProps } from "next/image";

import fieldDark from "@/assets/artwork/field-dark.jpg";
import fieldLight from "@/assets/artwork/field-light.jpg";

import NoiseFieldCanvas from "./NoiseFieldCanvas";

// The field under the landing lineup: slow noise and film grain in the brand
// colours. A still frame of it (one per theme, from tools/artwork/field.py)
// is always in the markup, so the view is complete before any script runs.
// On top of it a WebGL canvas draws the moving version; without WebGL, or
// with prefers-reduced-motion, the canvas is removed and the still stays.
// DESIGN.md, section 8 and section 11.
export default function NoiseField({ className }: { className?: string }) {
  const common = { alt: "", sizes: "100vw", priority: true, quality: 85 as const };
  const {
    props: { srcSet: darkSet },
  } = getImageProps({ ...common, src: fieldDark });
  const {
    props: { srcSet: lightSet, ...rest },
  } = getImageProps({ ...common, src: fieldLight });

  return (
    <div className={className} aria-hidden="true">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet={darkSet} />
        <img {...rest} alt="" srcSet={lightSet} />
      </picture>
      <NoiseFieldCanvas />
    </div>
  );
}
