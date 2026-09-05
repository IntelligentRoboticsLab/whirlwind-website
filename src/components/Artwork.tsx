import type { CSSProperties } from "react";
import Image, { getImageProps } from "next/image";

import { artwork, type ArtworkName, type ArtworkPiece } from "@/lib/artwork";

type ArtworkProps = {
  name: ArtworkName;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  // the transparent cutout instead of the framed piece; it works on either ground
  cutout?: boolean;
};

// A piece from the artwork series, in the version that matches the theme.
// The ground of each file is the page colour, so it sits on the page with no
// frame. One <picture>, two sources: the browser downloads only the one it uses.
export default function Artwork({
  name,
  sizes = "(max-width: 80rem) 100vw, 72rem",
  priority = false,
  className,
  style,
  cutout = false,
}: ArtworkProps) {
  const piece: ArtworkPiece = artwork[name];
  if (cutout && piece.cut) {
    return (
      <Image
        src={piece.cut}
        alt={piece.alt}
        sizes={sizes}
        priority={priority}
        className={className}
        style={style}
        quality={85}
      />
    );
  }
  const common = { alt: piece.alt, sizes, priority, quality: 85 as const };
  const {
    props: { srcSet: darkSet },
  } = getImageProps({ ...common, src: piece.dark });
  const {
    props: { srcSet: lightSet, ...rest },
  } = getImageProps({ ...common, src: piece.light });

  return (
    <picture className={className} style={style}>
      <source media="(prefers-color-scheme: dark)" srcSet={darkSet} />
      <img {...rest} alt={piece.alt} srcSet={lightSet} />
    </picture>
  );
}
