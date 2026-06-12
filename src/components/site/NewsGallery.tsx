"use client";

import { useState } from "react";
import Image from "next/image";

import type { GalleryImage } from "@/lib/news/gallery-images";
import SiteIcon from "./SiteIcon";

type NewsGalleryProps = {
  images: GalleryImage[];
};

export default function NewsGallery({ images }: NewsGalleryProps) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const total = images.length;
  const go = (next: number) => setIndex((next + total) % total);
  const current = images[index];

  return (
    <div className="news-gallery">
      <div
        className="news-gallery__stage"
        role="button"
        tabIndex={0}
        aria-label="Next photo"
        onClick={() => go(index + 1)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            go(index + 1);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(index - 1);
          }
        }}
      >
        {images.map((image, i) => (
          <Image
            key={image.alt}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1180px) 100vw, 1108px"
            quality={85}
            className={`news-gallery__image ${
              i === index ? "is-active" : ""
            }`}
            priority={i === 0}
            aria-hidden={i === index ? undefined : true}
          />
        ))}

        <button
          type="button"
          className="news-gallery__nav news-gallery__nav--prev"
          aria-label="Previous photo"
          onClick={(event) => {
            event.stopPropagation();
            go(index - 1);
          }}
        >
          <SiteIcon name="arrow-left" size={20} />
        </button>
        <button
          type="button"
          className="news-gallery__nav news-gallery__nav--next"
          aria-label="Next photo"
          onClick={(event) => {
            event.stopPropagation();
            go(index + 1);
          }}
        >
          <SiteIcon name="arrow-right" size={20} />
        </button>

        <span className="news-gallery__counter">
          {index + 1} / {total}
        </span>
      </div>

      <div className="news-gallery__footer">
        <p className="news-gallery__caption">{current.alt}</p>
        <div className="news-gallery__dots" role="tablist" aria-label="Choose photo">
          {images.map((image, i) => (
            <button
              key={`dot-${image.alt}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to photo ${i + 1}`}
              className={`news-gallery__dot ${i === index ? "is-active" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
