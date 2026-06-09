import type { StaticImageData } from "next/image";

import PrincessAmaliaVisit from "@/assets/photos/2026-05-Prinses-Amalia/003uvabezoekamaliasciencepark.jpg";
import ScienceParkScienceDay from "@/assets/photos/2025-10-Dag_vd_wetenschap/UvA_Dag van de Wetenschap_LD_lr_20251004-2861.jpg";
import WorldHumanoidRobotGames from "@/assets/photos/2025-08-RCAP-Beijing/NAN13334_3613110639-rp3914172363-opq3915542285.jpg";
import GermanOpen from "@/assets/photos/2026-03-German-Open/55142547581_39130691ce_o.jpg";

// Maps a news post slug (the markdown filename without `.md`) to a cover image
// imported from `src/assets`. Add an entry here when a post needs a cover.
export const coverImages: Record<string, StaticImageData> = {
  "2026-04-16-princess-of-orange-visit": PrincessAmaliaVisit,
  "2025-10-04-science-park-science-day": ScienceParkScienceDay,
  "2025-08-15-world-humanoid-robot-games-quarter-finals": WorldHumanoidRobotGames,
  "2026-03-14-german-open-third-place": GermanOpen,
};
