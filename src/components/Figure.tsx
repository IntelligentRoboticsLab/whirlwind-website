import Image, { type StaticImageData } from "next/image";

type FigureProps = {
  src: StaticImageData;
  alt: string;
  caption?: string;
  credit?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

// A photograph with its caption and credit under it. Square corners, no frame,
// nothing on top (DESIGN.md, section 7).
export default function Figure({ src, alt, caption, credit, sizes, priority, className = "" }: FigureProps) {
  return (
    <figure className={`figure ${className}`}>
      <Image src={src} alt={alt} sizes={sizes} priority={priority} placeholder="blur" quality={85} />
      {caption || credit ? (
        <figcaption>
          {caption ? <span className="t-caption">{caption}</span> : null}
          {credit ? <span className="t-meta">{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
