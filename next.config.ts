import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  ...(process.env.GITHUB_PAGES === "true" && { basePath: "/dali-portfolio" }),
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
