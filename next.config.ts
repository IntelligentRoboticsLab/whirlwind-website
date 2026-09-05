import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image only allows quality values listed here (Next 16 defaults to
    // [75]). We render some images at 85, so both must be declared.
    qualities: [75, 85],
  },
  async redirects() {
    return [
      // Old route from before the redesign: socials became the Team page.
      { source: "/socials", destination: "/team", permanent: true },
    ];
  },
};

export default nextConfig;
