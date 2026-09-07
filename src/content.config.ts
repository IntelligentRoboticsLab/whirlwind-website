import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// News articles: content/news/<slug>.md. The entry id is the file name without
// `.md`, which is also the URL under /news. Cover and gallery photos are mapped
// by slug in src/lib/news, not in the frontmatter.
const news = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./content/news",
    // the file name without .md, verbatim: it is the slug in every /news URL
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    summary: z.string().min(1),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    coverCredit: z.string().optional(),
    // What the cover shows, where and when. Optional; shown under the lead photo.
    coverCaption: z.string().optional(),
  }),
});

export const collections = { news };
