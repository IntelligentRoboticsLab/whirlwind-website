// Responsive image helpers for astro:assets. Next's image component chose the
// srcset widths from one device list; here every photograph gets the same
// widths (astro.config.ts, image.breakpoints) so that the files are shared
// between the places one photograph appears, and nothing is ever upscaled.
import type { ImageMetadata } from "astro";

// The srcset widths for a photograph that spans the container or the viewport.
export const PHOTO_WIDTHS = [640, 750, 828, 1080, 1200, 1600, 1920, 2560];

// Cutouts and marks that are drawn small: an opener's robot is 24rem wide at most.
export const CUTOUT_WIDTHS = [384, 576, 768, 1152];

// The widths to generate for `image`: those of `widths` below the source width,
// then the source width itself when it is within the list's range, so a small
// cutout is served at its own size and a large photograph stops at the top of
// the list. A step within a tenth of the source width is dropped as redundant.
export function widthsFor(image: ImageMetadata, widths: number[] = PHOTO_WIDTHS): number[] {
  const max = widths[widths.length - 1];
  const fit = widths.filter((w) => w < image.width * 0.9);
  if (image.width <= max) fit.push(image.width);
  return fit;
}

// Props for <Image> or getImage(): a srcset of `widths`, with the fallback `src`
// at the largest of them rather than at the source size.
export function responsive(image: ImageMetadata, widths: number[] = PHOTO_WIDTHS) {
  const list = widthsFor(image, widths);
  return { widths: list, width: list[list.length - 1] };
}
