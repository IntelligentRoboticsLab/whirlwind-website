import type { ImageMetadata } from "astro";
import { getCollection } from "astro:content";
import { remark } from "remark";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

import { markNameInHtml } from "@/lib/name";
import { coverImages } from "./cover-images";
import { galleryImages, type GalleryImage } from "./gallery-images";

// The news collection is declared in src/content.config.ts (frontmatter schema
// and the content/news directory). The body is rendered here, with GFM, hard
// line breaks and the orange IRL in every whIRLwind, as before the move to Astro.

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  author?: string;
  tags?: string[];
  coverImage?: ImageMetadata;
  coverCredit?: string;
  coverCaption?: string;
  gallery?: GalleryImage[];
  contentHtml: string;
};

async function renderMarkdown(body: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkBreaks).use(remarkHtml).process(body);
  return markNameInHtml(String(file));
}

async function loadNewsPosts(): Promise<NewsPost[]> {
  const entries = await getCollection("news");
  const posts = await Promise.all(
    entries.map(async (entry) => {
      const fm = entry.data;
      return {
        slug: entry.id,
        title: fm.title,
        date: fm.date.toISOString(),
        summary: fm.summary,
        author: fm.author,
        tags: fm.tags,
        coverImage: coverImages[entry.id],
        coverCredit: fm.coverCredit,
        coverCaption: fm.coverCaption,
        gallery: galleryImages[entry.id],
        contentHtml: await renderMarkdown(entry.body ?? ""),
      } satisfies NewsPost;
    }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

// Rendered once per build; every page that lists news shares the result.
let cached: Promise<NewsPost[]> | undefined;

export function getAllNewsPosts(): Promise<NewsPost[]> {
  cached ??= loadNewsPosts();
  return cached;
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | undefined> {
  const posts = await getAllNewsPosts();
  return posts.find((post) => post.slug === slug);
}
