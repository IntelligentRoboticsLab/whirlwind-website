"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import type { CollagePhoto } from "@/lib/site-content";
import SiteIcon from "./SiteIcon";

type PhotoCollageProps = {
  photos: CollagePhoto[];
  limit?: number;
  variant?: "editorial" | "gallery";
};

export default function PhotoCollage({
  photos,
  limit,
  variant = "editorial",
}: PhotoCollageProps) {
  const visiblePhotos =
    typeof limit === "number" ? photos.slice(0, limit) : photos;
  const total = visiblePhotos.length;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const step = useCallback(
    (delta: number) => {
      setActiveIndex((current) =>
        current === null ? current : (current + delta + total) % total,
      );
    },
    [total],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };

    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, step]);

  const active = activeIndex === null ? null : visiblePhotos[activeIndex];

  return (
    <>
      <div className={`photo-collage photo-collage--${variant}`}>
        {visiblePhotos.map((photo, index) => (
          <button
            type="button"
            key={`${photo.alt}-${index}`}
            className={`photo-collage__item ${
              variant === "editorial"
                ? `photo-collage__item--${photo.layout}`
                : "photo-collage__item--gallery"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`View larger: ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              placeholder="blur"
              sizes="(max-width: 780px) 100vw, (max-width: 1100px) 50vw, 33vw"
              className="photo-collage__image"
              priority={index < 3}
            />
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
        >
          <button
            type="button"
            className="lightbox__close"
            aria-label="Close"
            onClick={close}
          >
            <span aria-hidden="true">&times;</span>
          </button>

          {total > 1 ? (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              aria-label="Previous photo"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
            >
              <SiteIcon name="arrow-left" />
            </button>
          ) : null}

          <figure
            className="lightbox__figure"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              placeholder="blur"
              sizes="90vw"
              className="lightbox__image"
            />
            <figcaption className="lightbox__caption">{active.alt}</figcaption>
          </figure>

          {total > 1 ? (
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              aria-label="Next photo"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
            >
              <SiteIcon name="arrow-right" />
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
