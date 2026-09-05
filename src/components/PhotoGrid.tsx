"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

export type GridPhoto = {
  src: StaticImageData;
  alt: string;
  credit?: string;
};

// A uniform 3:2 grid, three across on desktop. Plain images by default; the
// caption and credit are in the dialog every photograph opens, at full size,
// with a bib button that downloads the original file. The dialog closes with
// Escape, the Close link or a click outside it. DESIGN.md, section 7.
export default function PhotoGrid({
  photos,
  captions = false,
}: {
  photos: GridPhoto[];
  captions?: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active !== null && !dialog.open) dialog.showModal();
    if (active === null && dialog.open) dialog.close();
  }, [active]);

  const photo = active !== null ? photos[active] : null;

  return (
    <>
      <div className={captions ? "gallery gallery--captions" : "gallery"}>
        {photos.map((p, i) => (
          <figure key={`${p.alt}-${i}`} className="figure">
            <button
              type="button"
              className="gallery__open"
              onClick={() => setActive(i)}
              aria-label={`View at full size: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                sizes="(max-width: 40rem) 100vw, (max-width: 64rem) 50vw, 33vw"
                placeholder="blur"
              />
            </button>
            {captions ? (
              <figcaption>
                <span className="t-caption">{p.alt}</span>
                {p.credit ? <span className="t-meta">{p.credit}</span> : null}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Photograph at full size"
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
      >
        {photo ? (
          <div className="lightbox__inner">
            <Image
              src={photo.src}
              alt={photo.alt}
              sizes="100vw"
              quality={85}
              className="lightbox__img"
            />
            <div className="lightbox__bar">
              <div className="lightbox__text">
                <span className="t-caption">{photo.alt}</span>
                <span className="t-meta">
                  {photo.credit ?? "Photo: whIRLwind Amsterdam"} ·{" "}
                  {photo.src.width} × {photo.src.height} px
                </span>
              </div>
              <div className="lightbox__actions t-body">
                {/* the static import's URL is the original file, served as uploaded */}
                <a className="button" href={photo.src.src} download>
                  <span>Download full resolution</span>
                </a>
                <button
                  type="button"
                  className="text-button link"
                  onClick={() => setActive(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
