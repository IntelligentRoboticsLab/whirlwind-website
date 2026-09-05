import type { StaticImageData } from "next/image";

import { photo } from "@/lib/photos";

// Maps a news post slug (the markdown filename without `.md`) to its cover, by id
// from src/lib/photos.ts. Add an entry here when a post needs a cover.
export const coverImages: Record<string, StaticImageData> = {
  "2026-07-02-robocup-fourth-place": photo(
    "2026-07-Robocup-Incheon/team-photo2.jpg",
  ).src,
  "2026-06-18-european-commissioner-visit": photo(
    "2026-06-EU-visit/095_UvAScienceParkVisitEuropeanCommissioner2026.jpg",
  ).src,
  "2026-04-16-princess-of-orange-visit": photo(
    "2026-05-Prinses-Amalia/003uvabezoekamaliasciencepark.jpg",
  ).src,
  "2025-08-15-world-humanoid-robot-games-quarter-finals": photo(
    "2025-08-RCAP-Beijing/NAN13334_3613110639-rp3914172363-opq3915542285.jpg",
  ).src,
  "2025-10-04-science-park-science-day": photo(
    "2025-10-Dag_vd_wetenschap/UvA_Dag van de Wetenschap_LD_lr_20251004-2861.jpg",
  ).src,
  "2026-03-14-german-open-third-place": photo(
    "2026-03-German-Open/55142547581_39130691ce_o.jpg",
  ).src,
};
