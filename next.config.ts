import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 420],
    // Allow mobile to fetch smaller q=60 review variants alongside the
    // default q=75 desktop variants. Required by Next 16's quality
    // whitelist (defaults to [75] only).
    qualities: [60, 75],
    minimumCacheTTL: 31536000, // 1 year cache for static review images
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "ibb.co.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "i.ibb.co.com" },
      { protocol: "https", hostname: "imgbb.com" },
      { protocol: "https", hostname: "i.imgbb.com" },
    ],
  },
};

export default nextConfig;
