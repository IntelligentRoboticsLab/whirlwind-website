import { cache } from "react";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { StaticImageData } from "next/image";
import { z } from "zod";

import { coverImages } from "./cover-images";
import { galleryImages, type GalleryImage } from "./gallery-images";

const NEWS_DIR = path.join(process.cwd(), "content", "news");

const Frontmatter = z.object({
  title: z.string().min(1),
  date: z.coerce.date(),
  summary: z.string().min(1),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
  coverCredit: z.string().optional(),
});

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  author?: string;
  tags?: string[];
  coverImage?: StaticImageData;
  coverCredit?: string;
  gallery?: GalleryImage[];
  contentHtml: string;
};

async function renderMarkdown(body: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkHtml)
    .process(body);
  return String(file);
}

async function loadNewsPosts(): Promise<NewsPost[]> {
  if (!fs.existsSync(NEWS_DIR)) {
    return [];
  }

  const entries = fs
    .readdirSync(NEWS_DIR)
    .filter((name) => name.endsWith(".md") && !name.startsWith("."));

  const posts = await Promise.all(
    entries.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(NEWS_DIR, filename), "utf8");
      const { data, content } = matter(raw);

      const parsed = Frontmatter.safeParse(data);
      if (!parsed.success) {
        const issues = parsed.error.issues
          .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
          .join("\n");
        throw new Error(
          `Invalid frontmatter in content/news/${filename}:\n${issues}`,
        );
      }

      const fm = parsed.data;
      const contentHtml = await renderMarkdown(content);

      return {
        slug,
        title: fm.title,
        date: fm.date.toISOString(),
        summary: fm.summary,
        author: fm.author,
        tags: fm.tags,
        coverImage: coverImages[slug],
        coverCredit: fm.coverCredit,
        gallery: galleryImages[slug],
        contentHtml,
      } satisfies NewsPost;
    }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export const getAllNewsPosts = cache(loadNewsPosts);
