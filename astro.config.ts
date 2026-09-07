import { defineConfig } from "astro/config";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: "https://whirlwind.team",
  output: "static",
  // Whitespace follows the JSX rules (the default): the templates came from
  // JSX and keep its habits, such as a space written before an inline link.
  compressHTML: "jsx",
  // Links are prefetched on hover, as next/link did.
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  redirects: {
    // Old route from before the redesign: socials became the Team page.
    "/socials": "/team",
  },
  image: {
    // The srcset widths for a photograph that spans the container or the
    // viewport (next/image's device sizes, without the 4K step).
    breakpoints: [640, 750, 828, 1080, 1200, 1600, 1920, 2560],
  },
});
