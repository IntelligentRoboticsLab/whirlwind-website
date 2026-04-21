import Image from "next/image";

import type { CollagePhoto } from "@/lib/site-content";

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
  const visiblePhotos = typeof limit === "number" ? photos.slice(0, limit) : photos;

  return (
    <div className={`photo-collage photo-collage--${variant}`}>
      {visiblePhotos.map((photo, index) => (
        <figure
          key={`${photo.alt}-${index}`}
          className={`photo-collage__item ${
            variant === "editorial"
              ? `photo-collage__item--${photo.layout}`
              : "photo-collage__item--gallery"
          }`}
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
        </figure>
      ))}
    </div>
  );
}
