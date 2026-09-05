import { photo, type Photo } from "@/lib/photos";

export type GalleryImage = Photo;

// Maps a news post slug (the markdown filename without `.md`) to the ordered list
// of photos shown under the post, by id from src/lib/photos.ts. Add an entry here
// when a post should show a gallery.
export const galleryImages: Record<string, GalleryImage[]> = {
  "2026-07-02-robocup-fourth-place": [
    photo("2026-07-Robocup-Incheon/12_AL_RC2026_D5_BhumanWhirlwind_09.jpg"),
    photo("2026-07-Robocup-Incheon/robocup_2.jpg"),
    photo("2026-07-Robocup-Incheon/robocup_1.jpg"),
  ],
  "2026-06-18-european-commissioner-visit": [
    photo(
      "2026-06-EU-visit/102_UvAScienceParkVisitEuropeanCommissioner2026.jpg",
    ),
    photo(
      "2026-06-EU-visit/111_UvAScienceParkVisitEuropeanCommissioner2026.jpg",
    ),
    photo(
      "2026-06-EU-visit/097_UvAScienceParkVisitEuropeanCommissioner2026.jpg",
    ),
    photo(
      "2026-06-EU-visit/099_UvAScienceParkVisitEuropeanCommissioner2026.jpg",
    ),
    photo(
      "2026-06-EU-visit/106_UvAScienceParkVisitEuropeanCommissioner2026.jpg",
    ),
    photo(
      "2026-06-EU-visit/101_UvAScienceParkVisitEuropeanCommissioner2026.jpg",
    ),
    photo(
      "2026-06-EU-visit/092_UvAScienceParkVisitEuropeanCommissioner2026.jpg",
    ),
    photo(
      "2026-06-EU-visit/109_UvAScienceParkVisitEuropeanCommissioner2026.jpg",
    ),
    photo(
      "2026-06-EU-visit/110_UvAScienceParkVisitEuropeanCommissioner2026.jpg",
    ),
  ],
  "2025-08-15-world-humanoid-robot-games-quarter-finals": [
    photo("2025-08-RCAP-Beijing/SXW_3494-opq3906727421.jpg"),
    photo("2025-08-RCAP-Beijing/NAN19628-opq3907064631.jpg"),
    photo("2025-08-RCAP-Beijing/SXW_3502-opq3906725825.jpg"),
    photo("2025-08-RCAP-Beijing/ROC_4057-opq3912329047.jpg"),
    photo("2025-08-RCAP-Beijing/NAN12360-opq3912652044.jpg"),
    photo("2025-08-RCAP-Beijing/NAN18608-opq3906025937.jpg"),
    photo(
      "2025-08-RCAP-Beijing/NAN12947_3610623519-rp3913954625-opq3915027514.jpg",
    ),
    photo("2025-08-RCAP-Beijing/20250812_202120.jpg"),
  ],
  "2025-10-04-science-park-science-day": [
    photo("2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-202-IMG_5050.jpg"),
    photo("2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-31-IMG_5135.jpg"),
    photo("2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-73-IMG_5240.jpg"),
    photo("2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-168-IMG_5126.jpg"),
    photo("2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-203-IMG_5141.jpg"),
    photo("2025-10-Dag_vd_wetenschap/Dag-van-de-wetenschap-158-IMG_5111.jpg"),
  ],
  "2026-03-14-german-open-third-place": [
    photo("2026-03-German-Open/63-DSC09331~2.jpg"),
    photo("2026-03-German-Open/117-DSC09277.jpg"),
    photo("2026-03-German-Open/135-DSC09259.jpg"),
    photo("2026-03-German-Open/55141653492_512e7cb68f_o.jpg"),
    photo("2026-03-German-Open/72-DSC09322.jpg"),
    photo("2026-03-German-Open/133-DSC09261.jpg"),
    photo("2026-03-German-Open/86-DSC09308.jpg"),
    photo("2026-03-German-Open/110-DSC09284.jpg"),
    photo("2026-03-German-Open/74-DSC09320.jpg"),
  ],
};
